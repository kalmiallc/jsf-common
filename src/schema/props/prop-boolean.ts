import {
  JsfAbstractPropPrimitive, jsfAbstractPropPrimitiveJsfDefinitionLayoutItems,
  jsfAbstractPropPrimitiveJsfDefinitionSchemaProperties,
  jsfAbstractPropPrimitiveJsfDefinitionValidationLayoutItems
}                                         from '../abstract/abstract-prop-primitive';
import { JsfHandlerBoolean }              from '../../handlers';
import { EditorInterfaceLayoutFactory }   from '../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister, PropInfoInterface } from '../../register';

const propInfo: PropInfoInterface = {
  type: 'boolean',
  title: 'Boolean',
  color: '#efea5a'
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
      ...jsfAbstractPropPrimitiveJsfDefinitionSchemaProperties,
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Validation', [

          ...jsfAbstractPropPrimitiveJsfDefinitionValidationLayoutItems,
        ]),

        ...jsfAbstractPropPrimitiveJsfDefinitionLayoutItems,
      ])
    ]
  }
};

JsfRegister.prop('boolean', propInfo, propBooleanJsfDefinition);
