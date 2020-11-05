import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfLayoutExpansionPanelStandalonePanel
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';


export class JsfLayoutPropExpansionPanelStandalonePreferences {
  startCollapsed: boolean;
}

const layoutInfo: LayoutInfoInterface = {
  type        : 'expansion-panel-standalone',
  title       : 'Expansion panel standalone',
  category    : 'Layout',
  icon        : 'unknown.svg',
  items       : {
    enabled     : true,
    default     : ['expansion-panel-standalone-panel'],
    allowedTypes: ['expansion-panel-standalone-panel']
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutExpansionPanelStandalone extends JsfAbstractItemsLayout<'expansion-panel-standalone'> {
  type: 'expansion-panel-standalone';

  items: (JsfLayoutExpansionPanelStandalonePanel)[];

  /**
   * Whether the user can expand multiple panels at the same time.
   */
  multi?: boolean;

  preferences?: JsfLayoutPropExpansionPanelStandalonePreferences;

  constructor(data: JsfLayoutExpansionPanelStandalone) {
    super();
    Object.assign(this, data);
  }
}

export const layoutExpansionPanelStandaloneJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      multi: {
        type : 'boolean',
        title: 'Allow independent expansion state'
      },

      preferences: {
        type: 'object',
        properties: {
          startCollapsed: {
            type: 'boolean',
            title: 'Start collapsed'
          }
        }
      },
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Expansion Panel Standalone', [
          ...EditorInterfaceLayoutFactory.outputKey('multi'),

          ...EditorInterfaceLayoutFactory.createDivider(),

          ...EditorInterfaceLayoutFactory.outputKey('preferences.startCollapsed', 'Start collapsed'),
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('expansion-panel-standalone', layoutInfo, layoutExpansionPanelStandaloneJsfDefinition);

