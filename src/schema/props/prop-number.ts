/**
 * for numbers, including floating numbers
 */
import {
  JsfAbstractPropPrimitive,
  jsfAbstractPropPrimitiveJsfDefinitionLayoutItems,
  jsfAbstractPropPrimitiveJsfDefinitionSchemaProperties,
  jsfAbstractPropPrimitiveJsfDefinitionValidationLayoutItems
}                                              from '../abstract/abstract-prop-primitive';
import { JsfHandlerInteger, JsfHandlerNumber } from '../../handlers';
import { EditorInterfaceLayoutFactory }        from '../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister, PropInfoInterface }      from '../../register';

const propInfoNumber: PropInfoInterface = {
  type : 'number',
  title: 'Number',
  color: '#048ba8'
};

const propInfoInteger: PropInfoInterface = {
  type : 'integer',
  title: 'Integer',
  color: '#0db39e'
};

abstract class JsfAbstractNumberBase<TypeString, Handler> extends JsfAbstractPropPrimitive<number, TypeString, Handler> {

  /**
   * The value of "multipleOf" MUST be a number, strictly greater than 0.
   *
   * A numeric instance is valid only if division by this keyword's value results in an integer.
   */
  multipleOf?: number;

  /**
   * The value of "minimum" MUST be a number, representing an inclusive lower limit for a numeric instance.
   *
   * If the instance is a number, then this keyword validates only if the instance is greater than or exactly equal to
   * "minimum".
   */
  minimum?: number;

  /**
   * The value of "maximum" MUST be a number, representing an inclusive upper limit for a numeric instance.
   *
   * If the instance is a number, then this keyword validates only if the instance is less than or exactly equal to
   * "maximum".
   */
  maximum?: number;

}

export const jsfAbstractNumberBaseJsfDefinitionSchemaProperties      = {
  ...jsfAbstractPropPrimitiveJsfDefinitionSchemaProperties,

  multipleOf: {
    type: 'number'
  },
  minimum   : {
    type: 'number'
  },
  maximum   : {
    type: 'number'
  }
};
export const jsfAbstractNumberBaseJsfDefinitionValidationLayoutItems = [
  ...EditorInterfaceLayoutFactory.outputKey('multipleOf', 'Multiple of'),
  {
    type : 'row',
    items: [
      {
        type : 'col',
        xs   : 6,
        items: [
          ...EditorInterfaceLayoutFactory.outputKey('minimum', 'Min. value')
        ]
      },
      {
        type : 'col',
        xs   : 6,
        items: [
          ...EditorInterfaceLayoutFactory.outputKey('maximum', 'Max. value')
        ]
      }
    ]
  },

  ...jsfAbstractPropPrimitiveJsfDefinitionValidationLayoutItems
];
export const jsfAbstractNumberBaseJsfDefinitionLayoutItems           = [
  ...jsfAbstractPropPrimitiveJsfDefinitionLayoutItems
];


export class JsfPropNumber extends JsfAbstractNumberBase<'number', JsfHandlerNumber> {

  /**
   * The value of "exclusiveMinimum" MUST be number, representing an exclusive lower limit for a numeric instance.
   *
   * If the instance is a number, then the instance is valid only if it has a value strictly greater than (not equal
   * to) "exclusiveMinimum".
   */
  exclusiveMinimum?: number;

  /**
   * The value of "exclusiveMaximum" MUST be number, representing an exclusive upper limit for a numeric instance.
   *
   * If the instance is a number, then the instance is valid only if it has a value strictly less than (not equal to)
   * "exclusiveMaximum".
   */
  exclusiveMaximum?: number;

  // /**
  //  * The minimum number of integer digits before the decimal point. Default is 1.
  //  */
  // @DefProp({
  //   title      : 'Minimum number of integer digits',
  //   description: 'The minimum number of integer digits before the decimal point. Default is 1.',
  //   type       : 'number'
  // })
  // minIntegerDigits?: number;

  /**
   * The minimum number of digits after the decimal point. Default is 0.
   */
  minDecimalDigits?: number;

  /**
   * The maximum number of digits after the decimal point. Default is unlimited.
   * Note: JS uses float so you do not have unlimited fractions.
   */
  maxDecimalDigits?: number;

  constructor(data: JsfPropNumber) {
    super();
    Object.assign(this, data);
  }
}

export const propNumberJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractNumberBaseJsfDefinitionSchemaProperties,

      exclusiveMinimum: {
        type: 'number'
      },
      exclusiveMaximum: {
        type: 'number'
      },
      minDecimalDigits: {
        type : 'number'
      },
      maxDecimalDigits: {
        type : 'number'
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
                  ...EditorInterfaceLayoutFactory.outputKey('exclusiveMinimum', 'Exclusive min. value')
                ]
              },
              {
                type : 'col',
                xs   : 6,
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('exclusiveMaximum', 'Exclusive max. value')
                ]
              }
            ]
          },
          {
            type : 'row',
            items: [
              {
                type : 'col',
                xs   : 6,
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('minDecimalDigits', 'Min. decimal digits')
                ]
              },
              {
                type : 'col',
                xs   : 6,
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('maxDecimalDigits', 'Max. decimal digits')
                ]
              }
            ]
          },

          ...jsfAbstractNumberBaseJsfDefinitionValidationLayoutItems
        ]),

        ...jsfAbstractNumberBaseJsfDefinitionLayoutItems
      ])
    ]
  }
};
JsfRegister.prop('number', propInfoNumber, propNumberJsfDefinition);


/**
 * For integers
 */
export class JsfPropInteger extends JsfAbstractNumberBase<'integer', JsfHandlerInteger> {

  /**
   * The value of "even" MUST be a boolean, representing the number must be even.
   *
   * If the instance is a number, then the instance is valid only if it has an even value.
   */
  even?: boolean;

  /**
   * The value of "odd" MUST be a boolean, representing the number must be odd.
   *
   * If the instance is a number, then the instance is valid only if it has an odd value.
   */
  odd?: boolean;

  constructor(data: JsfPropInteger) {
    super();
    Object.assign(this, data);
  }
}


export const propIntegerJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractNumberBaseJsfDefinitionSchemaProperties,

      even: {
        title: 'Must be even',
        type : 'boolean'
      },
      odd : {
        title: 'Must be odd',
        type : 'boolean'
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Validation', [
          ...EditorInterfaceLayoutFactory.outputKey('even'),
          ...EditorInterfaceLayoutFactory.outputKey('odd'),

          ...jsfAbstractNumberBaseJsfDefinitionValidationLayoutItems
        ]),

        ...jsfAbstractNumberBaseJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.prop('integer', propInfoInteger, propIntegerJsfDefinition);
