import { JsfAbstractHandlerBuilder, JsfUnknownPropBuilder } from './builder/abstract';
import { JsfDefinition }                                    from './jsf-definition';
import { JsfProp, JsfPropObject, JsfPropTypes }             from './schema/props';
import { LayoutBuilderInfoInterface }     from './editor/layout';
import { EvalContextOptions, JsfBuilder } from './builder';

export interface HandlerCompatibilityInterface {
  /**
   * Icon for builder UI (toolbox).
   * @example layout-icons/span.svg
   */
  icon?: string;

  /**
   * Category (for example: "Common")
   */
  category?: string;

  /**
   * Nice title for builder UI. If not set type will be used.
   */
  title?: string;

  formDefinition: JsfDefinition;

  compatibleWith: {
    type: JsfPropTypes,
    formDefinitionTransform?: (formJsfDef: JsfDefinition, prop: JsfProp) => JsfDefinition
  }[];
}

export class JsfRegister {

  static appEvalContextLambda: (builder: JsfBuilder, options?: EvalContextOptions) => any;

  static layoutsBuilderInfo: { [layoutKey: string]: LayoutBuilderInfoInterface } = {};

  static storage: { [propBuilderKey: string]: (new (builder: JsfUnknownPropBuilder) => JsfAbstractHandlerBuilder<any>) } = {};
  static compatibility: { [handlerKey: string]: HandlerCompatibilityInterface }                                          = {};

  static getAppEvalContextLambda(): (builder: JsfBuilder, options?: EvalContextOptions) => any {
    return JsfRegister.appEvalContextLambda;
  }

  static setAppEvalContextLambda(x: (builder: JsfBuilder, options?: EvalContextOptions) => any) {
    JsfRegister.appEvalContextLambda = x;
  }

  static setLayoutInfo(info: LayoutBuilderInfoInterface) {
    JsfRegister.layoutsBuilderInfo[info.type] = info;
  }

  static getLayoutInfo(type: string) {
    return JsfRegister.layoutsBuilderInfo[type];
  }

  static getLayoutInfoOrThrow(type: string) {
    if (!JsfRegister.layoutsBuilderInfo[type]) {
      throw new Error(`Layout info for ${ type } not found.`);
    }
    return JsfRegister.layoutsBuilderInfo[type];
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

  static getHandlerFormDefinition(type: string, prop: JsfProp, options: { crashIfNotFound?: boolean } = {}) {
    if (!JsfRegister.compatibility[type]) {
      if (!options.crashIfNotFound) {
        return;
      }
      throw new Error(`Handler ${ type } not found!`);
    }
    const compatibleType = (JsfRegister.compatibility[type].compatibleWith || []).find(x => x.type === prop.type);
    if (!compatibleType) {
      if (!options.crashIfNotFound) {
        return;
      }
      throw new Error(`Handler ${ type } does not have compatible type ${ prop.type }!`);
    }

    return compatibleType.formDefinitionTransform
           ? compatibleType.formDefinitionTransform(JSON.parse(JSON.stringify(JsfRegister.compatibility[type].formDefinition)), prop)
           : JsfRegister.compatibility[type].formDefinition;
  }

  static getHandlerCompatibility(type: string) {
    return JsfRegister.compatibility[type];
  }

  static getHandlerCompatibilityOrThrow(type: string) {
    if (!JsfRegister.compatibility[type]) {
      throw new Error(`Handler ${ type } not found!`);
    }

    return JsfRegister.getHandlerCompatibility(type);
  }

  static listHandlers() {
    return Object.keys(JsfRegister.compatibility);
  }

  static handler(
    type: string,
    handlerBuilderClass: new (builder: JsfUnknownPropBuilder) => JsfAbstractHandlerBuilder<any>,
    compatibility?: HandlerCompatibilityInterface | any
  ) {
    JsfRegister.storage[type] = handlerBuilderClass;

    if (compatibility && compatibility.formDefinition) {
      (compatibility.formDefinition.schema as JsfPropObject).properties['type'] = {
        type : 'string',
        const: type,
        title: 'Type'
      };
      JsfRegister.compatibility[type]                                           = compatibility;
    }
  }
}
