import { JsfAbstractPropEditor } from '../abstract/abstract-prop-editor';
import { JsfProp, JsfPropArray } from '../../schema/props/index';
import { JsfUnknownPropEditor }  from './index';
import { createJsfPropEditor }   from '../util/jsf-editor-factory';
import { pathNextProp }          from '../util';

export class JsfPropEditorArray extends JsfAbstractPropEditor<JsfPropArray & { items: JsfProp[] }> {

  editorType = 'array';

  item: JsfUnknownPropEditor;

  get path() {
    return this.pathAsArray.join('.');
  }

  constructor(opt) {
    super(opt);

    this.initItem();
  }

  getProp(path: string) {
    if (!path) {
      return this;
    }
    const dEndIndex = path.indexOf(']');
    if (dEndIndex === -1 || !this.item) {
      throw new Error(`Prop array "${ this.path}" can't find child "${ path }"`);
    }
    return this.item.getProp(path.substring(dEndIndex) + (
      path[dEndIndex + 1] === '.' ? 2 : 1
    ));
  }

  getDefinition(opt: { skipItems?: boolean } = {}) {
    return {
      ...super.getDefinition(),
      items: opt.skipItems
             ? undefined
             : (this.item ? this.item.getDefinition() : {
        type      : 'object',
        properties: {}
      })
    };
  }

  initItem() {
    this.createChild(this._definition.items as JsfProp);
  }

  ///////////////////////////
  /// CHILDREN UTIL
  ///////////////////////////

  getChildren() {
    return this.item ? [this.item] : [];
  }

  canHaveChildren() {
    return true;
  }

  canAddChild(childDefinition: JsfProp) {
    return true;
  }

  createChild(childDefinition: JsfProp) {
    this.item = createJsfPropEditor(childDefinition, {
      propertyName: '[]',
      jsfEditor   : this.jsfEditor,
      parent      : this
    });
  }

  addChild(instance: JsfAbstractPropEditor<any>) {
    if (this.item) {
      this.destroyChild()
    }
    instance.parent = this;
    instance.propertyName = '[]';
    this.item = instance;
  }

  /**
   * Remove a child and possibly use that child later.
   * @param instance
   */
  removeChild(instance: JsfAbstractPropEditor<any>) {
    this.item = null;
    instance.parent = undefined;
  }

  /**
   * Destroy a child completely if you know you won't need this child any longer.
   * @param instance
   */
  destroyChild() {
    this.item.destroy();
    this.item = null;
  }

}


export class JsfPropEditorFixedArray extends JsfAbstractPropEditor<JsfPropArray & { items: JsfProp[] }> {

  editorType = 'fixed-array';

  items: JsfUnknownPropEditor[] = [];

  constructor(opt) {
    super(opt);

    this.initItems();
  }

  getProp(path: string) {
    if (!path) {
      return this;
    }
    const dEndIndex = path.indexOf(']');
    if (dEndIndex === -1) {
      throw new Error(`Prop array "${ this.path}" can't find child "${ path }"`);
    }
    const cIndex = + path.substring(1, dEndIndex);
    if (!this.items[cIndex]) {
      throw new Error(`Prop array "${ this.path}" can't find child "${ path }"`);
    }
    return this.items[cIndex].getProp(path.substring(dEndIndex + (
      path[dEndIndex + 1] === '.' ? 2 : 1
    )));
  }

  getDefinition(opt: { skipItems?: boolean } = {}) {
    return {
      ...super.getDefinition(),
      items: opt.skipItems
             ? undefined
             : this.items.map(x => x.getDefinition())
    };
  }

  initItems() {
    this._definition.items
      .forEach((x, i) => this.createChild(x, i));
  }

  ///////////////////////////
  /// CHILDREN UTIL
  ///////////////////////////

  getChildren() {
    return this.items;
  }

  canHaveChildren() {
    return true;
  }

  canAddChild(childDefinition: JsfProp) {
    return true;
  }

  createChild(childDefinition: JsfProp, index?: number) {
    if (isNaN(index)) {
      index = undefined;
    }
    if (index === undefined) {
      index = this.items.length;
    }
    const item = createJsfPropEditor(childDefinition, {
      propertyName: + index,
      jsfEditor   : this.jsfEditor,
      parent      : this
    });

    this.items.splice(+ index, 0, item);
  }

  addChild(instance: JsfAbstractPropEditor<any>, index?: number) {
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
    instance.propertyName = + index;
    this.items.splice(+ index, 0, instance);
  }

  /**
   * Remove a child and possibly use that child later.
   * @param instance
   */
  removeChild(instance: JsfAbstractPropEditor<any>) {
    instance.parent = undefined;
    const i = this.items.indexOf(instance);
    if (i > -1) {
      this.items.splice(i, 1);
    }
  }

  /**
   * Destroy a child completely if you know you won't need this child any longer.
   * @param instance
   */
  destroyChild(instance: JsfAbstractPropEditor<any>) {
    this.removeChild(instance);
    instance.destroy();
  }
}
