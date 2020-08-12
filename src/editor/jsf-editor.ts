import { JsfDefinition }                              from '../jsf-definition';
import { JsfUnknownLayout }                           from '../layout';
import { JsfAbstractPropEditor }                      from './abstract';
import { createJsfLayoutEditor, createJsfPropEditor } from './util/jsf-editor-factory';
import { JsfProp }                                    from '../schema/props';
import { JsfLayoutEditor }                            from './layout';

let editorId = 0;

export class JsfEditor {

  private uniqueIdCounter = 0;

  private propsMap: { [id: string]: JsfAbstractPropEditor<any> } = {};
  private layoutsMap: { [id: string]: JsfLayoutEditor }          = {};


  private _jsfDefinition: JsfDefinition;

  readonly id = editorId++;

  get jsfDefinition(): JsfDefinition {
    return {
      schema: this.schemaEditor.getDefinition(),
      layout: this._jsfDefinition.layout
    };
  }

  set jsfDefinition(value: JsfDefinition) {
    this._jsfDefinition = value;
    this.initSchema(this._jsfDefinition.schema);
    this.intiLayout(this._jsfDefinition.layout);
  }

  schemaEditor: JsfAbstractPropEditor<any>;
  layoutEditor: JsfLayoutEditor;

  constructor(options: {
    jsfDefinition: JsfDefinition
  }) {
    this.jsfDefinition = options.jsfDefinition;
  }

  getNewUniqueId() {
    return this.uniqueIdCounter++;
  }

  getAllPropPaths() {
    return Object.keys(this.propsMap)
      .map(x => this.propsMap[x].path);
  }

  getProp(path: string) {
    return this.schemaEditor.getProp(path);
  }

  getPropById(id: string) {
    return this.propsMap[id];
  }

  getPropByIdOrThrow(id: string) {
    if (!this.propsMap[id]) {
      throw new Error(`Prop with id ${ id } doesn't exist.`);
    }
    return this.propsMap[id];
  }

  getLayoutById(id: string) {
    return this.layoutsMap[id];
  }

  getLayoutByIdOrThrow(id: string) {
    if (!this.layoutsMap[id]) {
      throw new Error(`Layout with id ${ id } doesn't exist.`);
    }
    return this.layoutsMap[id];
  }

  registerLayout(layout: JsfLayoutEditor) {
    if (this.layoutsMap[layout.id]) {
      throw new Error(`Prop ${ layout.path } with id ${ layout.id } already registered in id map.`);
    }
    this.layoutsMap[layout.id] = layout;
  }

  unRegisterLayout(layout: JsfLayoutEditor) {
    this.layoutsMap[layout.id] = void 0;
  }

  registerProp(prop: JsfAbstractPropEditor<any>) {
    if (this.propsMap[prop.id]) {
      throw new Error(`Prop ${ prop.xPath } with id ${ prop.id } already registered in id map.`);
    }
    this.propsMap[prop.id] = prop;
  }

  unRegisterProp(prop: JsfAbstractPropEditor<any>) {
    this.propsMap[prop.id] = void 0;
  }

  private initSchema(schema: JsfProp) {
    this.propsMap     = {};
    this.schemaEditor = createJsfPropEditor(schema || {
      type      : 'object',
      properties: {}
    }, {
      jsfEditor   : this,
      propertyName: ''
    });
  }

  private intiLayout(layout: JsfUnknownLayout) {
    this.layoutsMap   = {};
    this.layoutEditor = createJsfLayoutEditor(layout || {
      type : 'div',
      items: []
    }, {
      jsfEditor: this
    });
  }
}
