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
  type        : 'expansion-panel-standalone-content',
  title       : 'Expansion panel standalone content',
  category    : 'Layout',
  icon        : 'unknown.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutExpansionPanelStandaloneContent extends JsfAbstractItemsLayout<'expansion-panel-standalone-content'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutExpansionPanelStandaloneContent) {
    super();
    Object.assign(this, data);
  }
}

export const layoutExpansionPanelStandaloneContentJsfDefinition = {
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

JsfRegister.layout('expansion-panel-standalone-content', layoutInfo, layoutExpansionPanelStandaloneContentJsfDefinition);
