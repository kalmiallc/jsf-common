import { JsfUnknownProp }         from '../../schema/abstract';
import { JsfEditor }                                                            from '../jsf-editor';
import { JsfProp }                                                              from '../../schema/props';
import { JsfTranslatableMessage } from '../../translations';
import { JsfDocument }            from '../../jsf-document';
import { jsfForJsf }              from '../../jsf-for-jsf';

export abstract class JsfAbstractPropEditor<PropDefinition extends JsfUnknownProp> {

  abstract editorType: string;

  get id(): string {
    return this._id;
  }

  private _id: string;

  propertyName: string | number;

  get parent(): JsfAbstractPropEditor<any> {
    return this._parent;
  }

  set parent(value: JsfAbstractPropEditor<any>) {
    this._parent = value;
  }

  get hasHandler(): boolean {
    return !!(this._definition.handler && this._definition.handler.type);
  }

  protected jsfEditor: JsfEditor;
  protected _definition: PropDefinition;
  private _parent: JsfAbstractPropEditor<any>;

  get children(): JsfAbstractPropEditor<any>[] {
    return this.getChildren();
  }

  get pathAsArray() {
    return this.parent ? this.parent.pathAsArray.concat([this.propertyName]) : [];
  }

  get path() {
    return this.pathAsArray.join('/');
  }

  constructor(options: {
    propertyName: string | number;
    jsfEditor: JsfEditor;
    definition: PropDefinition;
    parent?: JsfAbstractPropEditor<any>;
  }) {
    this.propertyName = options.propertyName;
    this.jsfEditor   = options.jsfEditor;
    this._definition = options.definition;
    this._parent     = options.parent;
    this._id         = this._definition.id
                       ? this._definition.id
                       : '#/tmp/' + this.jsfEditor.getNewUniqueId();

    this.register(false);
  }

  getDefinition() { // TODO PropDefinition error TS2577: Return type annotation circularly references itself.
    return {
      ...this._definition,
      id: this.id.startsWith('#/tmp/') ? undefined : this.id
    };
  }

  getPropertiesForm(): JsfDocument {
    return jsfForJsf.getJsfComponent(
      'JsfProp' + this._definition.type.charAt(0).toUpperCase() + this._definition.type.slice(1),
      this.getDefinition()
    ).jsfDoc;
  }

  getHandlerForm(): JsfDocument {
    return undefined;
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

  createChild(childDefinition: JsfProp, key?: number | string) {
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
}
