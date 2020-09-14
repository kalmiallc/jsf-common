import {
  JsfAbstractPropPrimitive,
  jsfAbstractPropPrimitiveJsfDefinitionLayoutItems,
  jsfAbstractPropPrimitiveJsfDefinitionSchemaProperties,
  jsfAbstractPropPrimitiveJsfDefinitionValidationLayoutItems
}                                                from '../abstract/abstract-prop-primitive';
import { JsfHandlerBoolean }                     from '../../handlers';
import { EditorInterfaceLayoutFactory }          from '../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister, PropInfoInterface }        from '../../register';
import { jsfAbstractPropTranslatableProperties } from '../abstract';

const propInfo: PropInfoInterface = {
  type        : 'boolean',
  title       : 'Boolean',
  color       : '#efea5a',
  localization: {
    translatableProperties: [...jsfAbstractPropTranslatableProperties]
  }
};

export class JsfPropBoolean extends JsfAbstractPropPrimitive<boolean, 'boolean', JsfHandlerBoolean> {

  constructor(data: JsfPropBoolean) {
    super();
    Object.assign(this, data);
  }

}

export const propBooleanJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropPrimitiveJsfDefinitionSchemaProperties
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Validation', [

          ...jsfAbstractPropPrimitiveJsfDefinitionValidationLayoutItems
        ]),

        ...jsfAbstractPropPrimitiveJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.prop('boolean', propInfo, propBooleanJsfDefinition);
