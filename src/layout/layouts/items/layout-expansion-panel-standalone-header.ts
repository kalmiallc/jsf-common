import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfUnknownLayout
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'expansion-panel-standalone-header',
  title       : 'Expansion panel standalone header',
  category    : 'Layout',
  icon        : 'unknown.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutExpansionPanelStandaloneHeader extends JsfAbstractItemsLayout<'expansion-panel-standalone-header'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutExpansionPanelStandaloneHeader) {
    super();
    Object.assign(this, data);
  }
}

export const layoutExpansionPanelStandaloneHeaderJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties

    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('expansion-panel-standalone-header', layoutInfo, layoutExpansionPanelStandaloneHeaderJsfDefinition);
