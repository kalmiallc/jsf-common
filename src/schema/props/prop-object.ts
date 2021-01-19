import { JsfProp, JsfPropJsonValue, JsfPropValue } from './index';
import {
  JsfAbstractProp,
  jsfAbstractPropJsfDefinitionLayoutItems,
  jsfAbstractPropJsfDefinitionSchemaProperties,
  jsfAbstractPropJsfDefinitionValidationLayoutItems,
  jsfAbstractPropTranslatableProperties
}                                                  from '../abstract/abstract-prop';
import { JsfHandlerObject }                        from '../../handlers';
import { EditorInterfaceLayoutFactory }            from '../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister, PropInfoInterface }          from '../../register';


export interface JsfPropObjectValue {
  [propertyName: string]: JsfPropValue;
}

export interface JsfPropObjectJsonValue {
  [propertyName: string]: JsfPropJsonValue;
}

const propInfo: PropInfoInterface = {
  type        : 'object',
  title       : 'Object',
  color       : '#eab700',
  localization: {
    translatableProperties: [...jsfAbstractPropTranslatableProperties]
  }
};


export class JsfPropObject extends JsfAbstractProp<JsfPropObjectValue, 'object', JsfHandlerObject> {


  /**
   * The value of "properties" MUST be an object. Each value of this object MUST be a valid JSON Schema.
   *
   * This keyword determines how child instances validate for objects, and does not directly validate the immediate
   * instance itself.
   *
   * Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value,
   * the child instance for that name successfully validates against the corresponding schema.
   *
   * Omitting this keyword has the same behavior as an empty object.
   */
  properties?: { [propertyName: string]: JsfProp };

  /**
   * The value of this keyword MUST be an array. Elements of this array, if any, MUST be strings, and MUST be unique.
   *
   * An object instance is valid against this keyword if every item in the array is the name of a property in the
   * instance.
   *
   * Omitting this keyword has the same behavior as an empty array.
   */
  required?: string[];

  /**
   * If true, setting null on object will persist no matter what auto null calculation will return until set or patch value is called with some data.
   */
  forceNull?: boolean;

  constructor(data: JsfPropObject) {
    super();
    Object.assign(this, data);
  }
}

export const propObjectJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropJsfDefinitionSchemaProperties,

      required: {
        type   : 'array',
        handler: {
          type: 'common/chip-list'
        },
        items  : {
          type: 'string'
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Validation', [
          ...EditorInterfaceLayoutFactory.outputKey('required', 'Required properties'),

          ...jsfAbstractPropJsfDefinitionValidationLayoutItems
        ]),

        ...jsfAbstractPropJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.prop('object', propInfo, propObjectJsfDefinition);
