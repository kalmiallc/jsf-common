import { JsfAbstractHandlerBuilder, JsfUnknownPropBuilder } from '../builder/abstract';
import { JsfDefinition }                                    from '../jsf-definition';
import { JsfProp, JsfPropObject, JsfPropTypes }             from '../schema/props';
import { LayoutInfoInterface }                              from '../editor/layout';
import { EvalContextOptions, JsfBuilder }                   from '../builder';
import { HandlerCompatibilityInterface }                    from './interfaces/handler-compatibility.interface';

export class JsfRegister {

  private static appEvalContextLambda: (builder: JsfBuilder, options?: EvalContextOptions) => any;

  private static layoutStore: { [layoutKey: string]: JsfDefinition }             = {};
  private static layoutBuilderInfo: { [layoutKey: string]: LayoutInfoInterface } = {};

  private static handlerBuilderStore: { [propBuilderKey: string]: (new (builder: JsfUnknownPropBuilder) => JsfAbstractHandlerBuilder<any>) } = {};
  private static handlerCompatibility: { [handlerKey: string]: HandlerCompatibilityInterface }                                          = {};

  static getAppEvalContextLambda(): (builder: JsfBuilder, options?: EvalContextOptions) => any {
    return JsfRegister.appEvalContextLambda;
  }

  static setAppEvalContextLambda(x: (builder: JsfBuilder, options?: EvalContextOptions) => any) {
    JsfRegister.appEvalContextLambda = x;
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
    JsfRegister.layoutStore[type] = definition;
    JsfRegister.layoutBuilderInfo[type] = layoutInfo;
  }


  static setLayoutInfo(info: LayoutInfoInterface) {
    JsfRegister.layoutBuilderInfo[info.type] = info;
  }

  static getLayoutInfo(type: string) {
    return JsfRegister.layoutBuilderInfo[type];
  }

  static getLayoutInfoOrThrow(type: string) {
    if (!JsfRegister.layoutBuilderInfo[type]) {
      throw new Error(`Layout info for ${ type } not found.`);
    }
    return JsfRegister.layoutBuilderInfo[type];
  }

  static getLayoutFormDefinition(type: string) {
    return JsfRegister.layoutStore[type];
  }

  static getNewLayoutDefinition(type: string) {
    const x = JsfRegister.getLayoutInfoOrThrow(type);
    if (x.defaultDefinition) {
      return x.defaultDefinition;
    }
    return {
      type: type === 'prop' ? undefined : type,
      items: x.items?.enabled ? [] : undefined
    };
  }

  static listLayouts() {
    return Object.keys(JsfRegister.layoutStore);
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

    return compatibleType.formDefinitionTransform
           ? compatibleType.formDefinitionTransform(JSON.parse(JSON.stringify(JsfRegister.handlerCompatibility[type].formDefinition)), prop)
           : JsfRegister.handlerCompatibility[type].formDefinition;
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
      JsfRegister.handlerCompatibility[type]                                           = compatibility;
    }
  }
}
