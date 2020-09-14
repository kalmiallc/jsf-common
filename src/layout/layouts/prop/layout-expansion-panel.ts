import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractPropLayout,
  jsfAbstractPropLayoutJsfDefinitionLayoutItems,
  jsfAbstractPropLayoutJsfDefinitionSchemaProperties,
  JsfLayoutExpansionPanelContent,
  JsfLayoutExpansionPanelHeader
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

export class JsfLayoutPropExpansionPanelPreferences {
  startCollapsed: boolean;
}

const layoutInfo: LayoutInfoInterface = {
  type        : 'expansion-panel',
  title       : 'Expansion Panel',
  category    : 'Layout',
  icon        : 'layout-icons/expansion-panel.svg',
  formControl : {
    enabled: true
  },
  items       : {
    enabled: true,
    fixed  : ['expansion-panel-header', 'expansion-panel-content']
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutPropExpansionPanel extends JsfAbstractPropLayout {
  type: 'expansion-panel';


  items: (JsfLayoutExpansionPanelContent | JsfLayoutExpansionPanelHeader)[];

  /**
   * Whether the user can expand multiple panels at the same time.
   */
  multi?: boolean;

  preferences?: JsfLayoutPropExpansionPanelPreferences;

  constructor(data: JsfLayoutPropExpansionPanel) {
    super();
    Object.assign(this, data);
  }
}

export const layoutExpansionPanelJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropLayoutJsfDefinitionSchemaProperties,

      multi: {
        type : 'boolean',
        title: 'Allow independent expansion state'
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Expansion Panel', [
          ...EditorInterfaceLayoutFactory.outputKey('multi')
        ]),

        ...jsfAbstractPropLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('expansion-panel', layoutInfo, layoutExpansionPanelJsfDefinition);
