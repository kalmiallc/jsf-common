import { JsfEditor }                  from '../jsf-editor';
import { JsfTranslatableMessage }     from '../../translations';
import { JsfDocument }                from '../../jsf-document';
import { jsfForJsf }                  from '../../jsf-for-jsf';
import {
  isItemsLayout,
  isPropArrayLayout,
  isPropExpansionPanelLayout, isPropLayout,
  isPropTableLayout,
  isSpecialLayout,
  JsfUnknownLayout
}                                     from '../../layout';
import { LayoutBuilderInfoInterface } from './layout-builder-info.interface';
import { createJsfLayoutEditor }      from '../util';
import { JsfRegister }                from '../../jsf-register';
import {
  JsfArrayPropLayoutBuilder, JsfExpansionPanelPropLayoutBuilder,
  JsfItemsLayoutBuilder, JsfPropLayoutBuilder,
  JsfSpecialLayoutBuilder,
  JsfTablePropLayoutBuilder
}                                     from '../../builder/layout';
import { Subject }                    from 'rxjs';

export class JsfLayoutEditor {

  public jsfEditor: JsfEditor;
  protected _definition: JsfUnknownLayout;
  private _parent: JsfLayoutEditor;

  public update$: Subject<void> = new Subject<void>();

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

  get info(): LayoutBuilderInfoInterface {
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
    return {
      ...this._definition,
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
    return jsfForJsf.getJsfComponent(
      'JsfLayout' + this._definition.type.charAt(0).toUpperCase() + this._definition.type.slice(1),
      this.getDefinition()
    ).jsfDoc;
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

  getTranslatableText(): JsfTranslatableMessage[] {
    return [];
  }

  ///////////////////////////
  /// ITEMS UTIL
  ///////////////////////////

  initItems() {
    if (!this.supportsItems) {
      return;
    }
    this._definition.items
      .forEach((x, i) => this.createItem(x, i));
  }

  canAddItem(itemDefinition: JsfUnknownLayout) {
    if (!this.supportsItems) {
      return false;
    }
    return false;
  }

  moveTo(newParent: JsfLayoutEditor, index?: number) {
    if (!this.parent) {
      throw new Error('Root prop can\'t be moved.');
    }
    this.parent.moveItemTo(this, newParent, index);
  }

  moveItemTo(instance: JsfLayoutEditor, newParent: JsfLayoutEditor, index?: number) {
    if (!this.parent) {
      throw new Error('Root prop can\'t be moved.');
    }
    if (!newParent.canAddItem(instance.getDefinition())) {
      throw new Error('Parent does not accept this child.');
    }
    this.parent.removeItem(instance);
    newParent.addItem(instance, index);
  }

  createItem(itemDefinition: JsfUnknownLayout, index?: number) {
    if (!this.supportsItems) {
      throw new Error('Items not supported by layout.');
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
    this.update$.next();
  }

  addItem(instance: JsfLayoutEditor, index?: number) {
    if (this.items.indexOf(instance) > -1) {
      throw new Error('JSF Builder child with same instance already exists.');
    }

    if (isNaN(index)) {
      index = undefined;
    }
    if (index === undefined) {
      index = this.items.length;
    }

    instance.parent = this;
    this.items.splice(+index, 0, instance);
    this.update$.next();
  }

  /**
   * Remove a child and possibly use that child later.
   * @param instance
   */
  removeItem(instance: JsfLayoutEditor) {
    instance.parent = undefined;
    const i         = this.items.indexOf(instance);
    if (i > -1) {
      this.items.splice(i, 1);
    }
    this.items = this.items.slice();
    this.update$.next();
  }

  /**
   * Destroy a child completely if you know you won't need this child any longer.
   * @param instance
   */
  destroyChild(instance: JsfLayoutEditor) {
    this.removeItem(instance);
    instance.destroy();
  }
}
