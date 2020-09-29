import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfLayoutTab
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'tabset',
  title       : 'Tabset',
  category    : 'Layout',
  icon        : 'unknown.svg',
  items       : {
    enabled     : true,
    default     : ['tab', 'tab', 'tab'],
    allowedTypes: ['tab']
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutTabSet extends JsfAbstractItemsLayout<'tabset'> {
  items: JsfLayoutTab[];

  preferences?: JsfLayoutTabSetPreferences;

  constructor(data: JsfLayoutTabSet) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutTabSetPreferences {
  /**
   * Whether tab contents have a dynamic height.
   * Default is True.
   */
  dynamicHeight?: boolean;
  /**
   * Align tab labels in the tabset container.
   * Default is 'start'.
   */
  labelAlignment?: 'start' | 'center' | 'end';
  /**
   * Set whether the tabset header appears above or below the tab contents.
   * Default is 'above'.
   */
  headerPosition?: 'above' | 'below';
  /**
   * Color of the selection highlight.
   * Default is 'primary'.
   */
  color?: 'primary' | 'accent';
  /**
   * Color of the header background.
   * Default is 'none'.
   */
  backgroundColor?: 'none' | 'primary' | 'accent';
  /**
   * Whether ripples are disabled.
   * Default is False.
   */
  disableRipple?: boolean;
  /**
   * Type of header to render.
   * Default is 'default'.
   */
  headerType?: 'default' | 'round';
}

export const layoutTabsetJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      preferences: {
        type: 'object',
        properties: {
          dynamicHeight: {
            type: 'boolean',
            title: 'Dynamic height'
          },
          labelAlignment: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                {
                  value: 'start',
                  label: 'Start'
                },
                {
                  value: 'center',
                  label: 'Center'
                },
                {
                  value: 'end',
                  label: 'End'
                },
              ]
            }
          },
          headerPosition: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                {
                  value: 'above',
                  label: 'Above'
                },
                {
                  value: 'below',
                  label: 'Below'
                },
              ]
            }
          },
          color: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                {
                  value: 'primary',
                  label: 'Primary'
                },
                {
                  value: 'accent',
                  label: 'Accent'
                },
              ]
            }
          },
          backgroundColor: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                {
                  value: 'none',
                  label: 'None'
                },
                {
                  value: 'primary',
                  label: 'Primary'
                },
                {
                  value: 'accent',
                  label: 'Accent'
                },
              ]
            }
          },
          disableRipple: {
            type: 'boolean',
            title: 'Disable ripple'
          },
          headerType: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                {
                  value: 'default',
                  label: 'Default'
                },
                {
                  value: 'round',
                  label: 'Round'
                },
              ]
            }
          },
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Tabset', [
          ...EditorInterfaceLayoutFactory.outputKey('preferences.dynamicHeight'),
          ...EditorInterfaceLayoutFactory.outputKey('preferences.labelAlignment', 'Label alignment'),
          ...EditorInterfaceLayoutFactory.outputKey('preferences.headerPosition', 'Header position'),
          ...EditorInterfaceLayoutFactory.outputKey('preferences.color', 'Color'),
          ...EditorInterfaceLayoutFactory.outputKey('preferences.backgroundColor', 'Background color'),
          ...EditorInterfaceLayoutFactory.outputKey('preferences.disableRipple'),
          ...EditorInterfaceLayoutFactory.outputKey('preferences.headerType', 'Header type'),
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('tabset', layoutInfo, layoutTabsetJsfDefinition);
