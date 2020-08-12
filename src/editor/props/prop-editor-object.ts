import { JsfAbstractPropEditor }  from '../abstract/abstract-prop-editor';
import { JsfProp, JsfPropObject } from '../../schema/props/index';
import { JsfUnknownPropEditor }   from './index';
import { createJsfPropEditor }    from '../util/jsf-editor-factory';
import { pathNextProp }           from '../util';

export class JsfPropEditorObject
  extends JsfAbstractPropEditor<JsfPropObject> {

  editorType = 'object';

  properties: JsfUnknownPropEditor[] = [];

  constructor(opt) {
    super(opt);

    this.initProperties();
  }

  getProp(path: string) {
    const chunks = pathNextProp(path);
    if (chunks.length === 0) {
      return this;
    }
    const nextChild = this.properties.find(x => x.propertyName === chunks[0]);
    if (!nextChild) {
      throw new Error(`Prop object "${ this.path}" can't find child "${ path }"`);
    }
    if (chunks.length === 1) {
      return nextChild;
    }
    if (chunks.length === 2) {
      return nextChild.getProp(chunks[1]);
    }
    throw new Error(`Prop object "${ this.path}" can't find child "${ path }"`);
  }

  initProperties() {
    Object.keys(this._definition.properties || {})
      .forEach(propertyName => this.createChild(this._definition.properties[propertyName], propertyName));
  }

  getDefinition(opt: { skipItems?: boolean } = {}) {
    return {
      ...super.getDefinition(),
      properties: opt.skipItems
                  ? undefined
                  : this.properties.reduce((a, c) => {
        a[c.propertyName] = c.getDefinition();
        return a;
      }, {} as any)
    };
  }

  private getNewPropertyName() {
    let key = 'Unnamed property';
    let i   = 1;
    while (this.properties.find(x => x.propertyName === key)) {
      key = `Unnamed property (${ i++ })`;
    }
    return key;
  }

  ///////////////////////////
  /// CHILDREN UTIL
  ///////////////////////////

  getChildren() {
    return this.properties;
  }

  canHaveChildren() {
    return true;
  }

  canAddChild(childDefinition: JsfProp) {
    return true;
  }

  createChild(childDefinition: JsfProp, key?: string) {
    if (key === undefined) {
      key = this.getNewPropertyName();
    }

    if (this.properties.find(x => x.propertyName === key)) {
      throw new Error(`Child "${ key }" with same name already exists on parent "${ this.id }:${ this.path }"`)
    }

    this.properties.push(createJsfPropEditor(childDefinition, {
      propertyName: key.toString(),
      jsfEditor   : this.jsfEditor,
      parent      : this
    }));
  }

  addChild(instance: JsfAbstractPropEditor<any>, key?: string) {
    if (this.properties.indexOf(instance) > -1) {
      throw new Error(`JSF Builder child "${ instance.id }:${ instance.path }" with same instance already exists on parent "${ this.id }:${ this.path }"`);
    }

    if (key) {
      instance.propertyName = key.toString();
    }

    if (this.properties.find(x => x.propertyName === instance.propertyName)) {
      throw new Error(`JSF Builder child "${ instance.id }:${ instance.path }" with same property name already exists on parent "${ this.id }:${ this.path }"`);
    }

    instance.parent = this;
    this.properties.push(instance);
  }

  /**
   * Remove a child and possibly use that child later.
   * @param instance
   */
  removeChild(instance: JsfAbstractPropEditor<any>) {
    instance.parent = undefined;
    const i = this.properties.indexOf(instance);
    if (i > -1) {
      this.properties.splice(i, 1);
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
