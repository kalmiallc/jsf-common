import { jsfAbstractPropLayoutJsfDefinitionLayoutItems, jsfAbstractPropLayoutJsfDefinitionSchemaProperties } from '../../../abstract';
import { EditorInterfaceLayoutFactory }                                                                      from '../../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                                                                                       from '../../../../register';

export const layoutPropRefJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropLayoutJsfDefinitionSchemaProperties

    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([

        ...jsfAbstractPropLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('@prop/ref', null, layoutPropRefJsfDefinition);
