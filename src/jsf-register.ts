import { JsfAbstractHandlerBuilder, JsfUnknownPropBuilder } from './builder/abstract';
import { JsfDefinition }                                    from './jsf-definition';
import { JsfProp, JsfPropObject, JsfPropTypes }             from './schema/props';
import { LayoutBuilderInfoInterface }                       from './editor/layout';

export interface HandlerCompatibilityInterface {
  formDefinition: JsfDefinition;

  compatibleWith: {
    type: JsfPropTypes,
    formDefinitionTransform?: (formJsfDef: JsfDefinition, prop: JsfProp) => JsfDefinition
  }[];
}

export class JsfRegister {

  static layoutsBuilderInfo: { [layoutKey: string]: LayoutBuilderInfoInterface } = {};

  static storage: { [propBuilderKey: string]: (new (builder: JsfUnknownPropBuilder) => JsfAbstractHandlerBuilder<any>) } = {};
  static compatibility: { [handlerKey: string]: HandlerCompatibilityInterface }                                          = {};

  static setLayoutInfo(info: LayoutBuilderInfoInterface) {
    JsfRegister.layoutsBuilderInfo[info.type] = info;
  }

  static getLayoutInfo(type: string) {
    return JsfRegister.layoutsBuilderInfo[type];
  }

  static getHandlerFormDefinition(type: string, prop: JsfProp) {
    if (!JsfRegister.compatibility[type]) {
      throw new Error(`Handler ${ type } not found!`);
    }
    const compatibleType = (JsfRegister.compatibility[type].compatibleWith || []).find(x => x.type === prop.type);
    if (!compatibleType) {
      throw new Error(`Handler ${ type } does not have compatible type ${ prop.type }!`);
    }

    return compatibleType.formDefinitionTransform
           ? compatibleType.formDefinitionTransform(JSON.parse(JSON.stringify(JsfRegister.compatibility[type].formDefinition)), prop)
           : JsfRegister.compatibility[type].formDefinition;
  }

  static getHandlerCompatibility(type: string) {
    if (!JsfRegister.compatibility[type]) {
      throw new Error(`Handler ${ type } not found!`);
    }

    return JsfRegister.compatibility[type];
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
      }
      compatibility.formDefinition.$theme                                       = 'rounded/blue';
      JsfRegister.compatibility[type]                                           = compatibility;
    }
  }
}
