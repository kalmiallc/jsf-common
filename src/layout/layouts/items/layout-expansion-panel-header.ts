import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  JsfUnknownLayout
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type    : 'expansion-panel-header',
  title   : 'Expansion panel header',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutExpansionPanelHeader extends JsfAbstractItemsLayout<'expansion-panel-header'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutExpansionPanelHeader) {
    super();
    Object.assign(this, data);
  }
}

export const layoutExpansionPanelHeaderJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
      ]),
    ]
  }
};

JsfRegister.layout('expansion-panel-header', layoutInfo, layoutExpansionPanelHeaderJsfDefinition);
