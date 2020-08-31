import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,
  JsfLayoutButtonPreferences
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type    : 'array-item-add',
  title   : 'Array item add',
  category: 'Buttons & Indicators',
  icon    : 'layout-icons/array-item-add.svg'
};

export class JsfLayoutArrayItemAdd extends JsfAbstractSpecialLayout<'array-item-add'> {

  title: string;

  icon?: string;

  path: string;

  value?: {
            $eval: string,
          } | any;

  preferences?: JsfLayoutButtonPreferences;

  constructor(data: JsfLayoutArrayItemAdd) {
    super();
    Object.assign(this, data);
  }
}

export const layoutArrayItemAddfDefinition = {
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
      path       : {
        type : 'string',
        title: 'Path'
      },
      value      : {
        type      : 'object',
        title     : 'Value',
        properties: {
          $eval: {
            type   : 'string',
            title  : 'Eval',
            handler: {
              type   : 'common/code-editor',
              options: {
                language: 'javascript'
              }
            }
          }
        }
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
        ...EditorInterfaceLayoutFactory.createPanel('Array Item Add', [
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
                key: 'path'
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Value',
                    level: 5
                  },
                  {
                    key: 'value.$eval'
                  }
                ]
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

JsfRegister.layout('array-item-add', layoutInfo, layoutArrayItemAddfDefinition);
