import { JsfAbstractPropEditor }  from '../abstract/abstract-prop-editor';
import { JsfProp, JsfPropObject } from '../../schema/props/index';
import { JsfUnknownPropEditor }   from './index';
import { createJsfPropEditor }    from '../util/jsf-editor-factory';

export class JsfPropEditorObject
  extends JsfAbstractPropEditor<JsfPropObject> {

  editorType = 'object';

  properties: JsfUnknownPropEditor[] = [];

  constructor(opt) {
    super(opt);

    this.initProperties();
  }

  initProperties() {
    Object.keys(this._definition.properties || {})
      .forEach(propertyName => this.createChild(this._definition.properties[propertyName], propertyName));
  }

  getDefinition() {
    return {
      ...super.getDefinition(),
      properties: this.properties.reduce((a, c) => {
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
      throw new Error('Child with same name already exists.')
    }

    this.properties.push(createJsfPropEditor(childDefinition, {
      propertyName: key.toString(),
      jsfEditor   : this.jsfEditor,
      parent      : this
    }));
  }

  addChild(instance: JsfAbstractPropEditor<any>, key?: string) {
    if (this.properties.indexOf(instance) > -1) {
      throw new Error('JSF Builder child with same instance already exists.');
    }

    if (key) {
      instance.propertyName = key.toString();
    }

    if (this.properties.find(x => x.propertyName === instance.propertyName)) {
      throw new Error('JSF Builder child with same property name already exists.');
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
