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
  type    : 'expansion-panel-standalone-panel',
  title   : 'Expansion panel standalone panel',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true,
    default: ['expansion-panel-standalone-header', 'expansion-panel-standalone-content'],
    fixed  : ['expansion-panel-standalone-header', 'expansion-panel-standalone-content']
  }
};

export class JsfLayoutExpansionPanelStandalonePanel extends JsfAbstractItemsLayout<'expansion-panel-standalone-panel'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutExpansionPanelStandalonePanel) {
    super();
    Object.assign(this, data);
  }
}

export const layoutExpansionPanelStandalonePanelJsfDefinition = {
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

JsfRegister.layout('expansion-panel-standalone-panel', layoutInfo, layoutExpansionPanelStandalonePanelJsfDefinition);
