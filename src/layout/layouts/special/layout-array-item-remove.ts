import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,
  JsfLayoutButtonPreferences
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'array-item-remove',
  title       : 'Array item remove',
  category    : 'Buttons & Indicators',
  icon        : 'layout-icons/array-item-remove.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title']
  }
};

export class JsfLayoutArrayItemRemove extends JsfAbstractSpecialLayout<'array-item-remove'> {

  title: string;

  icon?: string;

  preferences?: JsfLayoutButtonPreferences;

  constructor(data: JsfLayoutArrayItemRemove) {
    super();
    Object.assign(this, data);
  }
}

export const layoutArrayItemRemoveJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      title      : {
        type : 'string',
        title: 'Title'
      },
      icon       : {
        type : 'string',
        title: 'Icon'
      },
      preferences: {
        type      : 'object',
        title     : 'Preferences',
        properties: {
          color        : {
            type   : 'string',
            title  : 'color',
            handler: {
              type  : 'common/dropdown',
              values: [
                {
                  value: 'none',
                  label: 'No color'
                },
                {
                  value: 'primary',
                  label: 'Primary'
                },
                {
                  value: 'accent',
                  label: 'Accent'
                }
              ]
            }
          },
          variant      : {
            type   : 'string',
            title  : 'color',
            handler: {
              type  : 'common/dropdown',
              values: [
                {
                  value: 'basic',
                  label: 'Basic'
                },
                {
                  value: 'raised',
                  label: 'Raised'
                },
                {
                  value: 'flat',
                  label: 'Flat'
                },
                {
                  value: 'stroke',
                  label: 'Stroked'
                },
                {
                  value: 'icon',
                  label: 'Icon'
                },
                {
                  value: 'fab',
                  label: 'Fab'
                },
                {
                  value: 'mini-fab',
                  label: 'Mini fab'
                }
              ]
            }
          },
          size         : {
            type   : 'string',
            title  : 'Size',
            handler: {
              type  : 'common/dropdown',
              values: [
                {
                  value: 'large',
                  label: 'Large'
                },
                {
                  value: 'normal',
                  label: 'Normal'
                },
                {
                  value: 'small',
                  label: 'Small'
                }
              ]
            }
          },
          disableRipple: {
            type : 'boolean',
            title: 'Disable ripple'
          }
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Array Item Remove', [
          {
            type : 'div',
            items: [
              {
                key: 'title'
              },
              {
                key: 'icon'
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Preferences',
                    level: 5
                  },
                  {
                    key: 'preferences.color'
                  },
                  {
                    key: 'preferences.variant'
                  },
                  {
                    key: 'preferences.size'
                  },
                  {
                    key: 'preferences.disableRipple'
                  }
                ]
              }
            ]
          }
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('array-item-remove', layoutInfo, layoutArrayItemRemoveJsfDefinition);
