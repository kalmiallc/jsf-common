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
  type        : 'tab',
  title       : 'Tab',
  category    : 'Layout',
  icon        : 'layout-icons/tab.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title']
  }
};

export class JsfLayoutTab extends JsfAbstractItemsLayout<'tab'> {
  items: JsfUnknownLayout[];

  title?: string;

  selected?: boolean;

  preferences?: JsfLayoutTabPreferences;

  constructor(data: JsfLayoutTab) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutTabPreferences {
  /**
   * Name of a material icon to use as the prefix.
   * See https://material.io/tools/icons/
   */
  prefixIcon?: string;
  /**
   * Text to use as the prefix.
   */
  prefixLabel?: string;
}

export const layoutTabJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      title   : {
        type : 'string',
        title: 'Title'
      },
      selected: {
        type : 'boolean',
        title: 'Selected'
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Tab', [
          {
            type : 'div',
            items: [
              {
                key: 'title'
              },
              {
                key: 'selected'
              }
            ]
          }
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('tab', layoutInfo, layoutTabJsfDefinition);

