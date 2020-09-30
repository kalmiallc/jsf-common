import {
  JsfAbstractPropPrimitive,
  jsfAbstractPropPrimitiveJsfDefinitionLayoutItems,
  jsfAbstractPropPrimitiveJsfDefinitionSchemaProperties,
  jsfAbstractPropPrimitiveJsfDefinitionValidationLayoutItems
}                                                from '../abstract/abstract-prop-primitive';
import { JsfHandlerDate }                        from '../../handlers';
import { PropInfoInterface }                     from '../../register/interfaces';
import { EditorInterfaceLayoutFactory }          from '../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                           from '../../register';
import { jsfAbstractPropTranslatableProperties } from '../abstract';

const propInfo: PropInfoInterface = {
  type        : 'date',
  title       : 'Date',
  color       : '#1a8c32',
  localization: {
    translatableProperties: [...jsfAbstractPropTranslatableProperties]
  }
};


export class JsfPropDate extends JsfAbstractPropPrimitive<Date, 'date', JsfHandlerDate> {

  /**
   * The value of "minimum" MUST be a Date, representing an inclusive lower limit for a date instance.
   *
   * If the instance is a date, then this keyword validates only if the instance is greater than or exactly equal to
   * "minimum".
   */
  minimum?: Date;

  /**
   * The value of "maximum" MUST be a date, representing an inclusive upper limit for a date instance.
   *
   * If the instance is a date, then this keyword validates only if the instance is less than or exactly equal to
   * "maximum".
   */
  maximum?: Date;

  constructor(data: JsfPropDate) {
    super();
    Object.assign(this, data);
  }

}

export const propDateJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropPrimitiveJsfDefinitionSchemaProperties,

      minimum: {
        type: 'date'
      },
      maximum: {
        type: 'date'
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
                  ...EditorInterfaceLayoutFactory.outputKey('minimum', 'Min. allowed date')
                ]
              },
              {
                type : 'col',
                xs   : 6,
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('maximum', 'Max. allowed date')
                ]
              }
            ]
          },

          ...jsfAbstractPropPrimitiveJsfDefinitionValidationLayoutItems
        ]),

        ...jsfAbstractPropPrimitiveJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.prop('date', propInfo, propDateJsfDefinition);
