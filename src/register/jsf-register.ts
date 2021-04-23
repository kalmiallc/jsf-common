import { JsfAbstractHandlerBuilder, JsfUnknownPropBuilder }      from '../builder/abstract';
import { JsfDefinition }                                         from '../jsf-definition';
import { JsfProp, JsfPropObject }                                from '../schema/props';
import { LayoutInfoInterface }                                   from '../editor/layout';
import { EvalContextOptions, JsfBuilder, JsfHandleClickOptions } from '../builder';
import { HandlerCompatibilityInterface }                         from './interfaces/handler-compatibility.interface';
import { PropInfoInterface }                                     from './interfaces';
import { defaultToolboxLayoutWhitelist }                         from './layout-whitelist';
import { JsfLayoutOnClickInterface }                             from '../layout';

export class JsfRegister {

  private static appEvalContextLambda: (builder: JsfBuilder, options?: EvalContextOptions) => any;

  private static appClickActions: { [actionName: string]: (onClickData: JsfLayoutOnClickInterface, options: JsfHandleClickOptions) => Promise<boolean> | boolean } = {};

  private static layoutStore: { [layoutKey: string]: JsfDefinition }             = {};
  private static layoutBuilderInfo: { [layoutKey: string]: LayoutInfoInterface } = {};

  private static propStore: { [propKey: string]: JsfDefinition }           = {};
  private static propBuilderInfo: { [propKey: string]: PropInfoInterface } = {};

  private static handlerBuilderStore: { [propBuilderKey: string]: (new (builder: JsfUnknownPropBuilder) => JsfAbstractHandlerBuilder<any>) } = {};
  private static handlerCompatibility: { [handlerKey: string]: HandlerCompatibilityInterface }                                               = {};

  private static _builderFeatureSet: 'basic' | 'full' = 'basic';
  private static _toolboxLayoutWhitelist              = defaultToolboxLayoutWhitelist;

  static setToolboxLayoutWhitelist(whitelist: string[] | null) {
    JsfRegister._toolboxLayoutWhitelist = whitelist;
  }

  static getToolboxLayoutWhitelist() {
    return JsfRegister._toolboxLayoutWhitelist;
  }

  static setBuilderFeatureSet(featureSet: 'basic' | 'full') {
    JsfRegister._builderFeatureSet = featureSet;
  }

  static getBuilderFeatureSet() {
    return JsfRegister._builderFeatureSet;
  }

  static getAppEvalContextLambda(): (builder: JsfBuilder, options?: EvalContextOptions) => any {
    return JsfRegister.appEvalContextLambda;
  }

  static setAppEvalContextLambda(x: (builder: JsfBuilder, options?: EvalContextOptions) => any) {
    JsfRegister.appEvalContextLambda = x;
  }

  static registerCustomClickAction(actionKey: string, handlerFn: (onClickData: JsfLayoutOnClickInterface, options: JsfHandleClickOptions) => Promise<boolean> | boolean) {
    this.appClickActions[actionKey] = handlerFn;
  }

  static getCustomClickActions() {
    return this.appClickActions;
  }

  /**************************************
   * Props
   **************************************/
  /**
   * Register a prop.
   * @param type
   * @param propInfo
   * @param definition
   */
  static prop(type: string, propInfo: PropInfoInterface, definition: any) {
    if (JsfRegister.propStore[type]) {
      throw new Error(`Duplicate prop "${ type }"`);
    }
    if (definition) {
      JsfRegister.propStore[type] = definition;
    }
    if (propInfo) {
      JsfRegister.propBuilderInfo[type] = propInfo;
    }
  }

  static getPropInfo(type: string) {
    return JsfRegister.propBuilderInfo[type];
  }

  static listProps() {
    return Object.keys(JsfRegister.propBuilderInfo);
  }

  static getPropFormDefinition(type: string) {
    const definition = JsfRegister.injectPropType(JsfRegister.propStore[type], type);

    if (definition) {
      definition.$modes = (definition.$modes || []).concat([this.getBuilderFeatureSet()]);

      definition.$engine = {
        layoutRenderingMode: 'sync'
      };
    }
    
    return definition;
  }

  static getNewPropDefinition(type: string) {
    const x = JsfRegister.getLayoutInfoOrThrow(type);
    if (x.defaultDefinition) {
      return JSON.parse(JSON.stringify(x.defaultDefinition));
    }
    return {
      type : type === 'prop' ? undefined : type,
      items: x.items?.enabled ? [] : undefined
    };
  }


  /**************************************
   * Layouts
   **************************************/
  /**
   * Register a layout.
   * @param type
   * @param layoutInfo
   * @param definition
   */
  static layout(type: string, layoutInfo: LayoutInfoInterface, definition: any) {
    if (JsfRegister.layoutStore[type]) {
      throw new Error(`Duplicate layout "${ type }"`);
    }
    if (definition) {
      JsfRegister.layoutStore[type] = definition;
    }
    if (layoutInfo) {
      JsfRegister.layoutBuilderInfo[type] = layoutInfo;
    }
  }

  static getLayoutInfo(type: string) {
    return JsfRegister.layoutBuilderInfo[type];
  }

  static listLayouts() {
    return Object.keys(JsfRegister.layoutBuilderInfo);
  }

  static getLayoutInfoOrThrow(type: string) {
    if (!JsfRegister.layoutBuilderInfo[type]) {
      throw new Error(`Layout info for ${ type } not found.`);
    }
    return JsfRegister.layoutBuilderInfo[type];
  }

  static setLayoutInfo(info: LayoutInfoInterface) {
    JsfRegister.layoutBuilderInfo[info.type] = info;
  }

  static getLayoutFormDefinition(type: string) {
    const definition = JsfRegister.layoutStore[type];

    if (definition) {
      definition.$modes = (definition.$modes || []).concat([this.getBuilderFeatureSet()]);

      definition.$engine = {
        layoutRenderingMode: 'sync'
      };
    }

    return definition;
  }

  static getNewLayoutDefinition(type: string) {
    const x = JsfRegister.getLayoutInfoOrThrow(type);
    if (x.defaultDefinition) {
      return JSON.parse(JSON.stringify(x.defaultDefinition));
    }
    return {
      type : type === 'prop' ? undefined : type,
      items: x.items?.enabled ? [] : undefined
    };
  }


  /**************************************
   * Handlers
   **************************************/

  static getHandlerFormDefinition(type: string, prop: JsfProp, options: { crashIfNotFound?: boolean } = {}) {
    if (!JsfRegister.handlerCompatibility[type]) {
      if (!options.crashIfNotFound) {
        return;
      }
      throw new Error(`Handler ${ type } not found!`);
    }
    const compatibleType = (JsfRegister.handlerCompatibility[type].compatibleWith || []).find(x => x.type === prop.type);
    if (!compatibleType) {
      if (!options.crashIfNotFound) {
        return;
      }
      throw new Error(`Handler ${ type } does not have compatible type ${ prop.type }!`);
    }

    let definition = compatibleType.formDefinitionTransform
      ? compatibleType.formDefinitionTransform(JSON.parse(JSON.stringify(JsfRegister.handlerCompatibility[type].formDefinition)), prop)
      : JsfRegister.handlerCompatibility[type].formDefinition;

    definition = JsfRegister.injectPropType(definition, prop.type);

    if (definition) {
      definition.$modes = (definition.$modes || []).concat([this.getBuilderFeatureSet()]);

      definition.$engine = {
        layoutRenderingMode: 'sync'
      };
    }

    return definition;
  }

  static getHandlerLayoutDefinition(type: string, prop: JsfProp, options: { crashIfNotFound?: boolean } = {}) {
    if (!JsfRegister.handlerCompatibility[type]) {
      if (!options.crashIfNotFound) {
        return;
      }
      throw new Error(`Handler ${ type } not found!`);
    }
    const compatibleType = (JsfRegister.handlerCompatibility[type].compatibleWith || []).find(x => x.type === prop.type);
    if (!compatibleType) {
      if (!options.crashIfNotFound) {
        return;
      }
      throw new Error(`Handler ${ type } does not have compatible type ${ prop.type }!`);
    }

    const definition = JsfRegister.handlerCompatibility[type].layoutDefinition;

    if (definition) {
      definition.$modes = (definition.$modes || []).concat([this.getBuilderFeatureSet()]);

      definition.$engine = {
        layoutRenderingMode: 'sync'
      };
    }

    return definition;
  }

  static getHandlerCompatibility(type: string) {
    return JsfRegister.handlerCompatibility[type];
  }

  static getHandlerBuilder(type: string) {
    return JsfRegister.handlerBuilderStore[type];
  }

  static getHandlerCompatibilityOrThrow(type: string) {
    if (!JsfRegister.handlerCompatibility[type]) {
      throw new Error(`Handler ${ type } not found!`);
    }

    return JsfRegister.getHandlerCompatibility(type);
  }

  static listHandlers() {
    return Object.keys(JsfRegister.handlerCompatibility);
  }

  static handler(
    type: string,
    handlerBuilderClass: new (builder: JsfUnknownPropBuilder) => JsfAbstractHandlerBuilder<any>,
    compatibility?: HandlerCompatibilityInterface | any
  ) {
    JsfRegister.handlerBuilderStore[type] = handlerBuilderClass;

    if (compatibility && compatibility.formDefinition) {
      (compatibility.formDefinition.schema as JsfPropObject).properties['type'] = {
        type : 'string',
        const: type,
        title: 'Type'
      };
      JsfRegister.handlerCompatibility[type]                                    = compatibility;
    }
  }


  private static injectPropType(definition: any, type: string) {
    let replaceValue = `"${ type }"`;
    switch (type) {
      case 'boolean':
        replaceValue = `"${ type }",
          "handler": {
            "type": "common/button-toggle",
            "values": [
              { "value": null, "label": "None" },
              { "value": true, "label": "True" },
              { "value": false, "label": "False" }
            ]
          }
        `;
        break;
      case 'array': {
        replaceValue = `"object", "handler": { "type": "any" }`;
      }
    }


    return definition && JSON.parse(
      JSON.stringify(definition)
        .replace(/"@@PROP_TYPE"/g, replaceValue)
    );
  }
}
