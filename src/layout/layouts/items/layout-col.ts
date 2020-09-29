import { LayoutInfoInterface }                          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfUnknownLayout
}                                                       from '../../../layout';
import { JsfRegister }                                  from '../../../register';
import { EditorInterfaceLayoutFactory, wrapKeyDynamic } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { EditorInterfaceSchemaFactory }                 from '../../../editor/helpers/editor-factory';

const layoutInfo: LayoutInfoInterface = {
  type        : 'col',
  title       : 'Column',
  category    : 'Layout',
  icon        : 'layout-icons/col.svg',
  items       : {
    enabled: true
  },
  parent      : {
    allowedTypes: ['row']
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutCol extends JsfAbstractItemsLayout<'col'> {
  items: JsfUnknownLayout[];
  /**
   * Column widths.
   */
  xs?: number | 'auto' | 'content' | 'none';
  sm?: number | 'auto' | 'content' | 'none';
  md?: number | 'auto' | 'content' | 'none';
  lg?: number | 'auto' | 'content' | 'none';
  xl?: number | 'auto' | 'content' | 'none';

  /**
   * Column offsets.
   */
  offset?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };

  /**
   * Visual order in row.
   */
  order?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  } | 'first' | 'last';

  /**
   * Vertical alignment for self.
   */
  verticalAlign?: 'start' | 'center' | 'end';


  constructor(data: JsfLayoutCol) {
    super();
    Object.assign(this, data);
  }
}

export const layoutColJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      xs: {
        type: 'string',
        handler: {
          type: 'common/dropdown',
          values: [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' },
            { label: '11', value: '11' },
            { label: '12', value: '12' },
            { label: 'Auto', value: 'auto' },
            { label: 'Content', value: 'content' },
          ]
        }
      },
      sm: {
        type: 'string',
        handler: {
          type: 'common/dropdown',
          values: [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' },
            { label: '11', value: '11' },
            { label: '12', value: '12' },
            { label: 'Auto', value: 'auto' },
            { label: 'Content', value: 'content' },
          ]
        }
      },
      md: {
        type: 'string',
        handler: {
          type: 'common/dropdown',
          values: [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' },
            { label: '11', value: '11' },
            { label: '12', value: '12' },
            { label: 'Auto', value: 'auto' },
            { label: 'Content', value: 'content' },
          ]
        }
      },
      lg: {
        type: 'string',
        handler: {
          type: 'common/dropdown',
          values: [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' },
            { label: '11', value: '11' },
            { label: '12', value: '12' },
            { label: 'Auto', value: 'auto' },
            { label: 'Content', value: 'content' },
          ]
        }
      },
      xl: {
        type: 'string',
        handler: {
          type: 'common/dropdown',
          values: [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' },
            { label: '11', value: '11' },
            { label: '12', value: '12' },
            { label: 'Auto', value: 'auto' },
            { label: 'Content', value: 'content' },
          ]
        }
      },

      offset: {
        type: 'object',
        properties: {
          xs: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' },
              ]
            }
          },
          sm: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' },
              ]
            }
          },
          md: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' },
              ]
            }
          },
          lg: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' },
              ]
            }
          },
          xl: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' },
              ]
            }
          },
        }
      },

      ... EditorInterfaceSchemaFactory.createDynamicSwitchableProperty('', 'order', [
        {
          typeKey: 'custom',
          typeName: 'Custom',
          propDefinition: {
            type: 'object',
            properties: {
              xs: {
                type: 'string',
                handler: {
                  type: 'common/dropdown',
                  values: [
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                    { label: '6', value: '6' },
                    { label: '7', value: '7' },
                    { label: '8', value: '8' },
                    { label: '9', value: '9' },
                    { label: '10', value: '10' },
                    { label: '11', value: '11' },
                    { label: '12', value: '12' },
                  ]
                }
              },
              sm: {
                type: 'string',
                handler: {
                  type: 'common/dropdown',
                  values: [
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                    { label: '6', value: '6' },
                    { label: '7', value: '7' },
                    { label: '8', value: '8' },
                    { label: '9', value: '9' },
                    { label: '10', value: '10' },
                    { label: '11', value: '11' },
                    { label: '12', value: '12' },
                  ]
                }
              },
              md: {
                type: 'string',
                handler: {
                  type: 'common/dropdown',
                  values: [
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                    { label: '6', value: '6' },
                    { label: '7', value: '7' },
                    { label: '8', value: '8' },
                    { label: '9', value: '9' },
                    { label: '10', value: '10' },
                    { label: '11', value: '11' },
                    { label: '12', value: '12' },
                  ]
                }
              },
              lg: {
                type: 'string',
                handler: {
                  type: 'common/dropdown',
                  values: [
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                    { label: '6', value: '6' },
                    { label: '7', value: '7' },
                    { label: '8', value: '8' },
                    { label: '9', value: '9' },
                    { label: '10', value: '10' },
                    { label: '11', value: '11' },
                    { label: '12', value: '12' },
                  ]
                }
              },
              xl: {
                type: 'string',
                handler: {
                  type: 'common/dropdown',
                  values: [
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                    { label: '6', value: '6' },
                    { label: '7', value: '7' },
                    { label: '8', value: '8' },
                    { label: '9', value: '9' },
                    { label: '10', value: '10' },
                    { label: '11', value: '11' },
                    { label: '12', value: '12' },
                  ]
                }
              },
            }
          }
        },
        {
          typeKey: 'first',
          typeName: 'First',
          propDefinition: {
            type: 'string',
            const: 'first'
          }
        },
        {
          typeKey: 'last',
          typeName: 'Last',
          propDefinition: {
            type: 'string',
            const: 'last'
          }
        },
      ]),

      verticalAlign: {
        type: 'string',
        handler: {
          type: 'common/dropdown',
          values: [
            { value: 'start', label: 'Start' },
            { value: 'center', label: 'Center' },
            { value: 'end', label: 'End' },
          ]
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Column', [
          {
            type: 'row',
            items: [
              {
                type: 'col',
                xs: 'auto',
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('xs', 'XS')
                ]
              },
              {
                type: 'col',
                xs: 'auto',
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('sm', 'SM')
                ]
              },
              {
                type: 'col',
                xs: 'auto',
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('md', 'MD')
                ]
              },
              {
                type: 'col',
                xs: 'auto',
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('lg', 'LG')
                ]
              },
              {
                type: 'col',
                xs: 'auto',
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('xl', 'XL')
                ]
              },
            ]
          },

          ...EditorInterfaceLayoutFactory.createLabel('Offset'),
          {
            type: 'row',
            items: [
              {
                type: 'col',
                xs: 'auto',
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('offset.xs', 'XS')
                ]
              },
              {
                type: 'col',
                xs: 'auto',
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('offset.sm', 'SM')
                ]
              },
              {
                type: 'col',
                xs: 'auto',
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('offset.md', 'MD')
                ]
              },
              {
                type: 'col',
                xs: 'auto',
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('offset.lg', 'LG')
                ]
              },
              {
                type: 'col',
                xs: 'auto',
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('offset.xl', 'XL')
                ]
              },
            ]
          },

          ...EditorInterfaceLayoutFactory.outputDynamicSwitchablePropKey('', 'order', 'Order', [
            {
              typeKey: 'custom',
              layoutDefinition: {
                type: 'div',
                items: [
                  {
                    type: 'row',
                    items: [
                      {
                        type: 'col',
                        xs: 'auto',
                        items: [
                          ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('custom.xs'), 'XS')
                        ]
                      },
                      {
                        type: 'col',
                        xs: 'auto',
                        items: [
                          ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('custom.sm'), 'SM')
                        ]
                      },
                      {
                        type: 'col',
                        xs: 'auto',
                        items: [
                          ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('custom.md'), 'MD')
                        ]
                      },
                      {
                        type: 'col',
                        xs: 'auto',
                        items: [
                          ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('custom.lg'), 'LG')
                        ]
                      },
                      {
                        type: 'col',
                        xs: 'auto',
                        items: [
                          ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('custom.xl'), 'XL')
                        ]
                      },
                    ]
                  },
                ]
              }
            },
            {
              typeKey: 'first',
              layoutDefinition: {
                type: 'div',
                items: []
              }
            },
            {
              typeKey: 'last',
              layoutDefinition: {
                type: 'div',
                items: []
              }
            }
          ]),

          ...EditorInterfaceLayoutFactory.outputKey('verticalAlign', 'Vertical align'),
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('col', layoutInfo, layoutColJsfDefinition);
