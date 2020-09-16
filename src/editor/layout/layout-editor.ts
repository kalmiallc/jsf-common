import { JsfEditor }                                                   from '../jsf-editor';
import { JsfDocument }                                                 from '../../jsf-document';
import { JsfUnknownLayout }                                            from '../../layout';
import { createJsfLayoutEditor }                                       from '../util';
import { Subject }                                                     from 'rxjs';
import { flattenDeep, get, isArray, isEmpty, isNil, isObject, omitBy } from 'lodash';
import { JsfRegister, LayoutInfoInterface }                            from '../../register';
import { ExtractedMessage }                                            from '../localization/extracted-message';

export class JsfLayoutEditor {

  public jsfEditor: JsfEditor;
  protected _definition: JsfUnknownLayout;
  private _parent: JsfLayoutEditor;

  /**
   * Will emit whenever a layout update is required.
   */
  public updateLayout$: Subject<void> = new Subject<void>();

  /**
   * Will emit whenever the mutable definition is updated from outside the properties view (such as when using actions in the action bar).
   * Note that you are responsible for triggering this event yourself, it will not be done automatically.
   */
  public definitionChange$: Subject<void> = new Subject<void>();

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

  get info(): LayoutInfoInterface {
    return JsfRegister.getLayoutInfo(this.realType) || {
      type: this.type
    };
  }

  get parent(): JsfLayoutEditor {
    return this._parent;
  }

  set parent(value: JsfLayoutEditor) {
    this._parent = value;
  }

  /// TYPE, ID, PATH
  /**
   * Will return undefined for LayoutProp
   */
  get type(): string | undefined {
    return this._type;
  }

  /**
   * Will return 'prop' for LayoutProp
   */
  get realType(): string {
    return this._type || 'prop';
  }

  private readonly _type: string;

  get id(): string {
    return this._id;
  }

  private readonly _id: string;

  get pathAsArray() {
    return this.parent ? this.parent.pathAsArray.concat([this.index]) : [];
  }

  get path() {
    return this.pathAsArray.join('/');
  }

  get index(): number {
    return this.parent
      ? this.parent._items.indexOf(this)
      : 0;
  }

  /// ITEMS

  private _items: JsfLayoutEditor[] = [];

  /**
   * If items change add, remove or order change, returned array will have new reference (FP).
   */
  get items(): JsfLayoutEditor[] {
    return this._items;
  }

  set items(value: JsfLayoutEditor[]) {
    this._items = value || [];
  }

  get supportsItems(): boolean {
    return !!this.info.items;
  }

  /// PROP

  private _key?: string;

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    if (!this.supportsProp) {
      return;
    }

    this._key = value;
  }

  get supportsProp(): boolean {
    return !!this.info.formControl;
  }

  constructor(options: {
    jsfEditor: JsfEditor;
    definition: JsfUnknownLayout;
    parent?: JsfLayoutEditor;
  }) {
    this.jsfEditor   = options.jsfEditor;
    this._definition = options.definition;
    this._parent     = options.parent;
    this._id         = this._definition.id
      ? this._definition.id
      : '#/tmp/' + this.jsfEditor.getNewUniqueId();

    this._type = this._definition.type;
    if (this.supportsProp) {
      this._key = this._definition.key;
    }

    if (!this.info) {
      throw new Error(`Unknown layout ${ JSON.stringify(options.definition) }`);
    }

    this.register(false);
    this.initItems();
  }

  getDefinition(opt: { skipItems?: boolean } = {}): JsfUnknownLayout {
    // Clean up definition.
    let definition: any;

    function omitEmptyProperties(prop: any) {
      return omitBy(prop, (value: any, key: string) => {
        if (isObject(value)) {
          value = omitEmptyProperties(value);
        }
        return isNil(value) || ((isObject(value) || isArray(value)) && isEmpty(value));
      });
    }

    definition = omitEmptyProperties(this._definition);

    return {
      ...definition,
      type : this.type === 'prop'
        ? undefined
        : this.type,
      key  : this.key,
      items: !opt.skipItems && this.supportsItems
        ? this.items.map(x => x.getDefinition())
        : undefined,
      id   : this.id.startsWith('#/tmp/')
        ? undefined
        : this.id
    } as any;
  }

  getPropertiesForm(): JsfDocument {
    return JsfRegister.getLayoutFormDefinition(this._definition.type);
  }

  private register(recursive = true) {
    this.jsfEditor.registerLayout(this as any);
    if (recursive) {
      this.items.forEach(x => this.register());
    }
  }

  private unRegister(recursive = true) {
    this.jsfEditor.unRegisterLayout(this as any);
    if (recursive) {
      this.items.forEach(x => x.unRegister());
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
      throw new Error('Root layout can\'t be removed.');
    }
    this.parent.removeItem(this);
  }


  ///////////////////////////
  /// ITEMS UTIL
  ///////////////////////////

  initItems() {
    if (!this.supportsItems) {
      return;
    }
    (this._definition.items || [])
      .forEach((x, i) => this.createItem(x, i));
  }

  canAddItem(itemDefinition: JsfUnknownLayout, index?: number) {
    if (!this.supportsItems) {
      return false;
    }

    const targetInfo = JsfRegister.getLayoutInfo(itemDefinition.type || 'prop');

    if (!targetInfo) {
      throw new Error(`Unknown layout "${ itemDefinition.type || 'prop' }"`);
    }

    // Check fixed
    if (this.info.items?.fixed) {
      const idx = this.info.items.fixed.indexOf(targetInfo.type);
      if (idx > -1) {
        // Validate insertion index if provided
        if (!isNil(index) && idx !== index) {
          return false;
        }
      } else {
        return false;
      }
    }

    // Check allowed types
    if (this.info.items?.allowedTypes) {
      if (this.info.items.allowedTypes.indexOf(targetInfo.type) === -1) {
        return false;
      }
    }

    // Check if target can be inserted
    if (targetInfo.parent?.allowedTypes) {
      if (targetInfo.parent.allowedTypes.indexOf(this.info.type) === -1) {
        return false;
      }
    }

    return true;
  }


  moveTo(newParent: JsfLayoutEditor, index?: number) {
    if (!this.parent) {
      this.parent.updateLayout$.next();
      throw new Error('Root layout can\'t be moved.');
    }
    this.parent.moveItemTo(this, newParent, index);
  }

  moveItemTo(instance: JsfLayoutEditor, newParent: JsfLayoutEditor, index?: number) {
    if (!newParent.canAddItem(instance.getDefinition(), index)) {
      this.updateLayout$.next();
      newParent.updateLayout$.next();
      throw new Error(`Parent "${ newParent.id }:${ newParent.path }" does not accept child "${ instance.id }:${ instance.path }".`);
    }
    this.removeItem(instance);
    newParent.addItem(instance, index);
  }

  createItem(itemDefinition: JsfUnknownLayout, index?: number) {
    if (!this.canAddItem(itemDefinition, index)) {
      this.updateLayout$.next();
      throw new Error(`Parent "${ this.id }:${ this.path }" does not accept child of type "${ itemDefinition.type }" on index ${ index }`);
    }

    if (isNaN(index)) {
      index = undefined;
    }
    if (index === undefined) {
      index = this.items.length;
    }
    const item = createJsfLayoutEditor(itemDefinition, {
      jsfEditor: this.jsfEditor,
      parent   : this
    });
    this.items.splice(+index, 0, item);
    this._items = this._items.slice(); // intentional reference change (FP)

    this.updateLayout$.next();
  }

  addItem(instance: JsfLayoutEditor, index?: number) {
    if (!this.canAddItem(instance.getDefinition(), index)) {
      this.updateLayout$.next();
      throw new Error(`Parent "${ this.id }:${ this.path }" does not accept child of type "${ instance.realType }" on index ${ index }`);
    }

    if (this.items.indexOf(instance) > -1) {
      this.updateLayout$.next();
      throw new Error(`JSF Builder child "${ instance.id }:${ instance.path }" with same instance already exists on parent "${ this.id }:${ this.path }"`);
    }

    if (isNaN(index)) {
      index = undefined;
    }
    if (index === undefined) {
      index = this.items.length;
    }

    instance.parent = this;
    this.items.splice(+index, 0, instance);
    this._items = this._items.slice();  // intentional reference change (FP)

    this.updateLayout$.next();
  }

  /**
   * Remove a child and possibly use that child later.
   * @param instance
   */
  removeItem(instance: JsfLayoutEditor) {
    instance.parent = undefined;
    const i         = this.items.indexOf(instance);
    if (i > -1) {
      this._items.splice(i, 1);
    }

    this._items = this._items.slice();  // intentional reference change (FP)

    this.updateLayout$.next();
  }

  /**
   * Destroy a child completely if you know you won't need this child any longer.
   * @param instance
   */
  destroyChild(instance: JsfLayoutEditor) {
    this.removeItem(instance);
    instance.destroy();
  }

  /**
   * Emit a definition change event. Call this if you mutated the definition and want the changes to be reflected in other parts of the
   * application.
   */
  emitDefinitionChange() {
    this.definitionChange$.next();
  }


  extractTranslatableMessages(): ExtractedMessage[] {
    const localizationInfo = this.info.localization;
    if (!localizationInfo || !localizationInfo.translatableProperties) {
      console.error(`Layout "${ this.type }" has no translatable property descriptors.`);
      return [];
    }

    const definition = this.definitionWithoutItems;

    const messages: ExtractedMessage[] = [];
    for (const property of localizationInfo.translatableProperties) {
      if (typeof property === 'function') {
        const strings = property(definition) || [];
        messages.push(...strings.map(x => new ExtractedMessage(x)));
      } else {
        messages.push(new ExtractedMessage(get(definition, property)));
      }
    }

    if (this.supportsItems) {
      messages.push(...flattenDeep(this.items.map(x => x.extractTranslatableMessages())));
    }

    return messages.filter(x => x.hasSourceContent());
  }
}
