import { JsfProp, JsfPropJsonValue, JsfPropValue } from './index';
import {
  JsfAbstractProp,
  jsfAbstractPropJsfDefinitionLayoutItems,
  jsfAbstractPropJsfDefinitionSchemaProperties,
  jsfAbstractPropJsfDefinitionValidationLayoutItems,
  jsfAbstractPropTranslatableProperties
}                                                  from '../abstract/abstract-prop';
import { JsfHandlerArray }                         from '../../handlers';
import { PropInfoInterface }                       from '../../register/interfaces';
import { EditorInterfaceLayoutFactory }            from '../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                             from '../../register';

export interface JsfPropArrayValue extends Array<JsfPropValue> {} // TODO this is not working
export interface JsfPropArrayJsonValue extends Array<JsfPropJsonValue> {}

const propInfoArray: PropInfoInterface = {
  type        : 'array',
  title       : 'Array',
  color       : '#f5871f',
  localization: {
    translatableProperties: [...jsfAbstractPropTranslatableProperties]
  }
};

const propInfoFixedArray: PropInfoInterface = {
  type        : 'fixed-array',
  title       : 'Fixed Array',
  color       : '#f5871f',
  localization: {
    translatableProperties: [...jsfAbstractPropTranslatableProperties]
  }
};



export class JsfPropArray extends JsfAbstractProp<JsfPropArrayValue[] | null, 'array', JsfHandlerArray> {

  /**
   * Default items value for array.
   */
  default?: any; // FIXME any

  /**
   * The value of "items" MUST be either a valid JSON Schema or an array of valid JSON Schemas.
   *
   * This keyword determines how child instances validate for arrays, and does not directly validate the immediate
   * instance itself.
   *
   * If "items" is a schema, validation succeeds if all elements in the array successfully validate against that
   * schema.
   *
   * If "items" is an array of schemas, validation succeeds if each element of the instance validates against
   * the schema at the same position, if any.
   *
   *
   *  Omitting this keyword has the same behavior as an empty schema.
   */
  items: JsfProp | JsfProp[];

  /**
   * The value of this keyword MUST be a boolean.
   *
   *
   *  If this keyword has boolean value false, the instance validates successfully. If it has boolean value true,
   * the instance validates successfully if all of its elements are unique.
   *
   * Omitting this keyword has the same behavior as a value of false.
   */
  uniqueItems?: boolean;

  /**
   * The value of this keyword MUST be a non-negative integer.
   *
   * An array instance is valid against "minItems" if its size is greater than, or equal to, the value of this keyword.
   *
   * Omitting this keyword has the same behavior as a value of 0.
   */
  minItems?: number;

  /**
   * The value of this keyword MUST be a non-negative integer.
   *
   * An array instance is valid against "maxItems" if its size is less than, or equal to, the value of this keyword.
   */
  maxItems?: number;

  /**
   * The value of this keyword MUST be a valid JSON Schema.
   *
   * An array instance is valid against "contains" if at least one of its elements is valid against the given schema.
   */

  contains?: any;


  /**
   * If true array can be null.
   * @default false
   */
  nullable?: boolean;

  /**
   * This keyword's value MUST be a valid JSON Schema.
   *
   * This validation outcome of this keyword's subschema has no direct effect on the overall validation result. Rather,
   * it controls which of the "then" or "else" keywords are evaluated.
   *
   * Instances that successfully validate against this keyword's subschema MUST also be valid against the subschema
   * value of the "then" keyword, if present.
   *
   * Instances that fail to validate against this keyword's subschema MUST also be valid against the subschema value of
   * the "else" keyword, if present.
   *
   * If annotations [annotations] are being collected, they are collected from this keyword's subschema in the usual
   * way, including when the keyword is present without either "then" or "else".
   */
  if?: any[];

  /**
   * This keyword's value MUST be a valid JSON Schema.
   *
   * When "if" is present, and the instance successfully validates against its subschema, then valiation succeeds
   * against this keyword if the instance also successfully validates against this keyword's subschema.
   *
   * This keyword has no effect when "if" is absent, or when the instance fails to validate against its subschema.
   * Implementations MUST NOT evaluate the instance against this keyword, for either validation or annotation
   * collection purposes, in such cases.
   */
  then?: any[];

  /**
   * This keyword's value MUST be a valid JSON Schema.
   *
   * When "if" is present, and the instance fails to validate against its subschema, then valiation succeeds against
   * this keyword if the instance successfully validates against this keyword's subschema.
   *
   * This keyword has no effect when "if" is absent, or when the instance successfully validates against its subschema.
   * Implementations MUST NOT evaluate the instance against this keyword, for either validation or annotation
   * collection purposes, in such cases.
   */
  else?: any[];

  constructor(data: JsfPropArray) {
    super();
    Object.assign(this, data);
  }
}

export const propArrayJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropJsfDefinitionSchemaProperties,

      uniqueItems: {
        title: 'Unique items',
        type : 'boolean'
      },
      minItems   : {
        type: 'integer'
      },
      maxItems   : {
        type: 'integer'
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Validation', [
          {
            type : 'row',
            items: [
              {
                type : 'col',
                xs   : 6,
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('minItems', 'Min. items')
                ]
              },
              {
                type : 'col',
                xs   : 6,
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('maxItems', 'Max. items')
                ]
              }
            ]
          },
          ...EditorInterfaceLayoutFactory.outputKey('uniqueItems'),

          ...jsfAbstractPropJsfDefinitionValidationLayoutItems
        ]),

        ...jsfAbstractPropJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.prop('array', propInfoArray, propArrayJsfDefinition);
JsfRegister.prop('fixed-array', propInfoFixedArray, propArrayJsfDefinition);
