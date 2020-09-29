import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractPropLayout,
  jsfAbstractPropLayoutJsfDefinitionLayoutItems,
  jsfAbstractPropLayoutJsfDefinitionSchemaProperties, JsfLayoutArrayFilter,
  JsfLayoutExpansionPanelContent,
  JsfLayoutExpansionPanelHeader
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';
import { EditorInterfaceSchemaFactory } from '../../../editor/helpers/editor-factory';

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

  filter?: JsfLayoutArrayFilter;

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

      preferences: {
        type: 'object',
        properties: {
          startCollapsed: {
            type: 'boolean',
            title: 'Start collapsed'
          }
        }
      },

      multi: {
        type : 'boolean',
        title: 'Allow independent expansion state'
      },

      filter: {
        type: 'object',
        properties: {
          ...EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Expansion Panel', [
          ...EditorInterfaceLayoutFactory.outputKey('multi'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('filter.$eval', 'Filter eval'),
          ...EditorInterfaceLayoutFactory.outputKey('filter.dependencies', 'Filter dependencies'),

          ...EditorInterfaceLayoutFactory.createDivider(),

          ...EditorInterfaceLayoutFactory.outputKey('preferences.startCollapsed', 'Start collapsed'),
        ]),

        ...jsfAbstractPropLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('expansion-panel', layoutInfo, layoutExpansionPanelJsfDefinition);
