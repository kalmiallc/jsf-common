import { JsfUnknownProp }                                              from '../../schema/abstract';
import { JsfEditor }                                                                          from '../jsf-editor';
import { JsfProp }                                                                            from '../../schema/props';
import { JsfTranslatableMessage }                                                             from '../../translations';
import { JsfDocument }                                                                        from '../../jsf-document';
import { flattenDeep, get, isArray, isEmpty, isNil, isObject, omitBy }                        from 'lodash';
import { HandlerCompatibilityInterface, JsfRegister, LayoutInfoInterface, PropInfoInterface } from '../../register';
import { ExtractedMessage }                                                                   from '../localization/extracted-message';
import { omitEmptyProperties }                                                                from '../util/omit-empty-properties';

export abstract class JsfAbstractPropEditor<PropDefinition extends JsfUnknownProp> {

  abstract editorType: string;

  get isArray() {
    return this.editorType === 'array';
  }

  get isFixedArray() {
    return this.editorType === 'fixed-array';
  }

  get id(): string {
    return this._id;
  }

  private _id: string;

  propertyName: string | number;

  get info(): PropInfoInterface {
    return JsfRegister.getPropInfo(this.editorType) || {
      type: this.editorType
    };
  }

  get parent(): JsfAbstractPropEditor<any> {
    return this._parent;
  }

  set parent(value: JsfAbstractPropEditor<any>) {
    this._parent = value;
  }

  get hasHandler(): boolean {
    return !!(this._definition.handler && this._definition.handler.type);
  }

  get hasHandlerInfo(): boolean {
    return !!this.getHandlerCompatibility();
  }

  get handlerTitle(): string {
    if (this.hasHandler) {
      return JsfRegister.getHandlerCompatibility(this.handlerType)?.title;
    }
  }

  get handlerType(): string {
    return this._definition.handler?.type;
  }

  protected jsfEditor: JsfEditor;
  protected _definition: PropDefinition;
  private _parent: JsfAbstractPropEditor<any>;

  /**
   * Returns raw definition object, so it's properties can be mutated directly.
   * Note: changing type, items, id, key has no effect. Only options of layout should be changed.
   */
  get mutableDefinition(): any {
    return this._definition;
  }

  get definitionWithoutItems(): any {
    return this.getDefinition({ skipItems: true });
  }

  get definition() {
    return this.getDefinition();
  }

  get children(): JsfAbstractPropEditor<any>[] {
    return this.getChildren();
  }

  get pathAsArray() {
    return this.parent ? this.parent.pathAsArray.concat([this.propertyName]) : [];
  }

  get xPath() {
    return this.pathAsArray.join('/');
  }

  get path() {
    if (this.parent) {
      if (this.parent.isArray) {
        return this.parent.path + '[]';
      } else if (this.parent.isFixedArray) {
        return this.parent.path + '[' + this.propertyName + ']';
      } else {
        return this.parent.path + (this.parent.parent ? '.' : '') + this.propertyName;
      }
    } else {
      return '';
    }
  }

  constructor(options: {
    propertyName: string | number;
    jsfEditor: JsfEditor;
    definition: PropDefinition;
    parent?: JsfAbstractPropEditor<any>;
  }) {
    this.propertyName = options.propertyName;
    this.jsfEditor    = options.jsfEditor;
    this._definition  = options.definition;
    this._parent      = options.parent;
    this._id          = this._definition.id
      ? this._definition.id
      : '#/tmp/' + this.jsfEditor.getNewUniqueId();

    this.register(false);
  }

  getProp(path: string) {
    if (!path) {
      return this;
    }
    throw new Error(`Prop "${ this.path }" can't find child "${ path }"`);
  }

  getDefinition(opt: { skipItems?: boolean } = {}) { // TODO PropDefinition error TS2577: Return type annotation circularly references itself.
    // Clean up definition.
    const definition: any = omitEmptyProperties(this._definition);

    return {
      ...definition,
      id: this.id.startsWith('#/tmp/') ? undefined : this.id
    };
  }

  getPropertiesForm(): JsfDocument {
    return JsfRegister.getPropFormDefinition(this._definition.type);
  }

  setHandler(type: string) {
    this._definition.handler = {
      type
    };
  }

  getHandlerForm(): JsfDocument {
    if (this.hasHandler) {
      return JsfRegister.getHandlerFormDefinition(this.handlerType, this.definition as any);
    }
  }

  getHandlerLayoutForm(): JsfDocument {
    if (this.hasHandler) {
      return JsfRegister.getHandlerLayoutDefinition(this.handlerType, this.definition as any);
    }
  }

  getHandlerCompatibility(): HandlerCompatibilityInterface {
    if (this.hasHandler) {
      return JsfRegister.getHandlerCompatibility(this.handlerType);
    }
  }

  removeHandler() {
    delete this._definition.handler;
  }

  private register(recursive = true) {
    this.jsfEditor.registerProp(this);
    if (recursive) {
      this.getChildrenOrEmptyArray().forEach(x => this.register());
    }
  }

  private unRegister(recursive = true) {
    this.jsfEditor.unRegisterProp(this);
    if (recursive) {
      this.getChildrenOrEmptyArray().forEach(x => x.unRegister());
    }
  }

  /**
   * Destroy a node completely if you know you won't need this node any longer.
   */
  destroy() {
    this.remove();
    this.unRegister();
  }

  /**
   * Remove a node and possibly use that node later.
   */
  remove() {
    if (!this.parent) {
      throw new Error('Root prop can\'t be removed.');
    }
    this.parent.removeChild(this);
  }

  getTranslatableText(): JsfTranslatableMessage[] {
    return [];
  }


  ///////////////////////////
  /// CHILDREN UTIL
  ///////////////////////////

  canHaveChildren() {
    return false;
  }

  canAddChild(childDefinition: JsfProp) {
    return false;
  }

  getChildren(): JsfAbstractPropEditor<any>[] {
    return null;
  }

  getChildrenOrEmptyArray(): JsfAbstractPropEditor<any>[] {
    return this.getChildren() || [];
  }

  moveTo(instance: JsfAbstractPropEditor<any>, newParent: JsfAbstractPropEditor<any>, key?: number | string) {
    if (!this.parent) {
      throw new Error('Root prop can\'t be moved.');
    }
    if (!newParent.canAddChild(instance.getDefinition())) {
      throw new Error('Parent does not accept this child.');
    }
    this.parent.removeChild(instance);
    newParent.addChild(instance, key);
  }

  createChild(childDefinition: JsfProp, key?: number | string): JsfAbstractPropEditor<any> {
    throw new Error('Prop does not support children.');
  }

  addChild(instance: JsfAbstractPropEditor<any>, key?: number | string) {
    throw new Error('Prop does not support children.');
  }

  /**
   * Remove a child and possibly use that child later.
   * @param instance
   */
  removeChild(instance: JsfAbstractPropEditor<any>) {
    throw new Error('Prop does not support children.');
  }

  /**
   * Destroy a child completely if you know you won't need this child any longer.
   * @param instance
   */
  destroyChild(instance: JsfAbstractPropEditor<any>) {
    throw new Error('Prop does not support children.');
  }

  extractTranslatableMessages(): ExtractedMessage[] {
    const messages: ExtractedMessage[] = [];
    const definition                   = this.definitionWithoutItems;

    // Get messages from prop.
    const localizationInfo = this.info.localization;
    if (!localizationInfo || !localizationInfo.translatableProperties) {
      console.error(`Prop "${ this.editorType }" has no translatable property descriptors.`);
    } else {
      for (const property of localizationInfo.translatableProperties) {
        if (typeof property === 'function') {
          const strings = property(definition) || [];
          messages.push(...strings.map(x => new ExtractedMessage(x)));
        } else {
          messages.push(new ExtractedMessage(get(definition, property)));
        }
      }
    }

    // Get messages from handler.
    if (this.hasHandler) {
      const handlerCompatibility = this.getHandlerCompatibility();
      if (!handlerCompatibility || !handlerCompatibility.localization?.translatableProperties) {
        console.error(`Prop handler "${ this.handlerType }" has no translatable property descriptors.`);
      } else {
        for (const property of handlerCompatibility.localization.translatableProperties) {
          if (typeof property === 'function') {
            const strings = property(definition) || [];
            messages.push(...strings.map(x => new ExtractedMessage(x)));
          } else {
            messages.push(new ExtractedMessage(get(definition, property)));
          }
        }
      }
    }

    // Get messages from children.
    const children = this.getChildren();
    if (children) {
      messages.push(... flattenDeep(children.map(x => x.extractTranslatableMessages())));
    }

    return messages.filter(x => x.hasSourceContent());
  }
}
