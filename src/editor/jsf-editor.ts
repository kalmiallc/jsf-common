import { JsfDefinition }                              from '../jsf-definition';
import { JsfUnknownLayout }                           from '../layout';
import { JsfAbstractPropEditor }                      from './abstract';
import { createJsfLayoutEditor, createJsfPropEditor } from './util/jsf-editor-factory';
import { JsfProp }                                    from '../schema/props';
import { JsfLayoutEditor }                            from './layout';
import { flattenDeep, omit, uniqBy }                  from 'lodash';
import { ExtractedMessage, TranslatedMessage }        from './localization';
import * as objectHash                                from 'object-hash';

let editorId = 0;

export class JsfEditor {

  private uniqueIdCounter = 0;

  private propsMap: { [id: string]: JsfAbstractPropEditor<any> } = {};
  private layoutsMap: { [id: string]: JsfLayoutEditor }          = {};

  schemaEditor: JsfAbstractPropEditor<any>;
  layoutEditor: JsfLayoutEditor;

  definitionConfig: JsfDefinition & { schema: never, layout: never };

  translations: { [languageCode: string]: TranslatedMessage[] };

  _jsfDefinition: JsfDefinition;

  readonly id = editorId++;

  get jsfDefinition(): JsfDefinition {
    return {
      ...this.definitionConfig,
      schema: this.schemaEditor.getDefinition(),
      layout: this.layoutEditor.getDefinition()
    };
  }

  set jsfDefinition(value: JsfDefinition) {
    this._jsfDefinition = value;
    this.initSchema(this._jsfDefinition.schema);
    this.intiLayout(this._jsfDefinition.layout);
    this.definitionConfig = omit(this._jsfDefinition, ['schema', 'layout']) as any;
  }

  private _initialStateHash: string;

  constructor(options: {
    jsfDefinition: JsfDefinition,
    translations?: { [languageCode: string]: TranslatedMessage[] }
  }) {
    this.jsfDefinition = options.jsfDefinition;
    this.translations  = options.translations || {};

    this.updateInitialStateHash();
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
    delete this.layoutsMap[layout.id];
  }

  registerProp(prop: JsfAbstractPropEditor<any>) {
    if (this.propsMap[prop.id]) {
      throw new Error(`Prop ${ prop.xPath } with id ${ prop.id } already registered in id map.`);
    }
    this.propsMap[prop.id] = prop;
  }

  unRegisterProp(prop: JsfAbstractPropEditor<any>) {
    delete this.propsMap[prop.id];
  }

  getInitialStateHash(): string {
    return this._initialStateHash;
  }

  getCurrentStateHash(): string {
    return objectHash(JSON.parse(JSON.stringify(this.jsfDefinition || {}))) + objectHash(JSON.parse(JSON.stringify(this.translations || {})));
  }

  updateInitialStateHash(): void {
    this._initialStateHash = this.getCurrentStateHash();
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

  /**
   * Get all translatable text from the form. The messages will not have any duplicates removed.
   */
  extractTranslatableMessages(): ExtractedMessage[] {
    let translatableMessages: ExtractedMessage[] = [];

    // Extract title & description.
    translatableMessages.push(new ExtractedMessage(this.definitionConfig.$title));
    translatableMessages.push(new ExtractedMessage(this.definitionConfig.$description));

    // Extract schema messages.
    translatableMessages.push(...this.schemaEditor.extractTranslatableMessages());

    // Extract layout messages.
    translatableMessages.push(...this.layoutEditor.extractTranslatableMessages());

    // Flatten array and remove empty messages.
    translatableMessages = flattenDeep(translatableMessages).filter(x => x.hasSourceContent());

    // Remove duplicates.
    translatableMessages = uniqBy(translatableMessages, (x) => {
      return x.id ? `${ x.id }/${ x.sourceText }` : x.sourceText;
    });

    return translatableMessages;
  }

}
