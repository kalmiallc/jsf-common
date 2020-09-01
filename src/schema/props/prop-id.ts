import {
  JsfAbstractProp, jsfAbstractPropJsfDefinitionLayoutItems,
  jsfAbstractPropJsfDefinitionSchemaProperties,
  jsfAbstractPropJsfDefinitionValidationLayoutItems
}                                       from '../abstract/abstract-prop';
import { JsfHandlerId }                 from '../../handlers';
import { PropInfoInterface }            from '../../register/interfaces';
import { EditorInterfaceLayoutFactory } from '../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../register';

const propInfo: PropInfoInterface = {
  type : 'id',
  title: 'ID',
  color: '#54478c'
};

export class JsfPropId extends JsfAbstractProp<string, 'id', JsfHandlerId> {
  constructor(data: JsfPropId) {
    super();
    Object.assign(this, data);
  }
}

export const propIdJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropJsfDefinitionSchemaProperties
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Validation', [

          ...jsfAbstractPropJsfDefinitionValidationLayoutItems
        ]),

        ...jsfAbstractPropJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.prop('id', propInfo, propIdJsfDefinition);
