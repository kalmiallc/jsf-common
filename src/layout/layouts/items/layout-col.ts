import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfUnknownLayout
}                                       from '../../../layout';
import { JsfRegister }                  from '../../../register';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';

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

      _order       : {
        type         : 'object',
        properties   : {
          orderType : {
            type   : 'string',
            handler: {
              type  : 'common/button-toggle',
              values: [
                { label: 'first', value: 'first' },
                { label: 'last', value: 'last' },
                { label: 'custom', value: 'custom' }
              ]
            }
          },
          typeCustom: {
            type      : 'object',
            properties: {
              xs: {
                type   : 'integer',
                title  : 'xs',
                minimum: 0,
                maximum: 12
              },
              sm: {
                type   : 'integer',
                title  : 'sm',
                minimum: 0,
                maximum: 12
              },
              md: {
                type   : 'integer',
                title  : 'md',
                minimum: 0,
                maximum: 12
              },
              lg: {
                type   : 'integer',
                title  : 'lg',
                minimum: 0,
                maximum: 12
              },
              xl: {
                type   : 'integer',
                title  : 'xl',
                minimum: 0,
                maximum: 12
              }
            }
          }
        },
        onValueChange: {
          updateDependencyValue: [
            {
              mode : 'set',
              key  : 'order',
              value: {
                $eval: `
            if ($val._order.orderType == 'first'){
              return 'first';
            }

            if ($val._order.orderType == 'last'){
              return 'last';
            }

            if ($val._order.orderType == 'custom'){
              return $val._order.typeCustom;
            }
            

            `
              }
            }
          ]
        }
      },
      xs           : {
        type       : 'string',
        title      : 'xs',
        description: 'Width on extra small devices',
        handler    : {
          type  : 'common/dropdown',
          values: [
            {
              label: 'auto',
              value: 'auto'
            },
            {
              label: 'content',
              value: 'content'
            },
            {
              label: '1',
              value: '1'
            },
            {
              label: '2',
              value: '2'
            },
            {
              label: '3',
              value: '3'
            },
            {
              label: '4',
              value: '4'
            },
            {
              label: '5',
              value: '5'
            },
            {
              label: '6',
              value: '6'
            },
            {
              label: '7',
              value: '7'
            },
            {
              label: '8',
              value: '8'
            },
            {
              label: '9',
              value: '9'
            },
            {
              label: '10',
              value: '10'
            },
            {
              label: '11',
              value: '11'
            },
            {
              label: '12',
              value: '12'
            }
          ]
        }
      },
      sm           : {
        type       : 'string',
        title      : 'sm',
        description: 'Width on small devices',
        handler    : {
          type  : 'common/dropdown',
          values: [
            {
              label: 'auto',
              value: 'auto'
            },
            {
              label: 'content',
              value: 'content'
            },
            {
              label: '1',
              value: '1'
            },
            {
              label: '2',
              value: '2'
            },
            {
              label: '3',
              value: '3'
            },
            {
              label: '4',
              value: '4'
            },
            {
              label: '5',
              value: '5'
            },
            {
              label: '6',
              value: '6'
            },
            {
              label: '7',
              value: '7'
            },
            {
              label: '8',
              value: '8'
            },
            {
              label: '9',
              value: '9'
            },
            {
              label: '10',
              value: '10'
            },
            {
              label: '11',
              value: '11'
            },
            {
              label: '12',
              value: '12'
            }
          ]
        }
      },
      md           : {
        type       : 'string',
        title      : 'md',
        description: 'Width on medium devices',
        handler    : {
          type  : 'common/dropdown',
          values: [
            {
              label: 'auto',
              value: 'auto'
            },
            {
              label: 'content',
              value: 'content'
            },
            {
              label: '1',
              value: '1'
            },
            {
              label: '2',
              value: '2'
            },
            {
              label: '3',
              value: '3'
            },
            {
              label: '4',
              value: '4'
            },
            {
              label: '5',
              value: '5'
            },
            {
              label: '6',
              value: '6'
            },
            {
              label: '7',
              value: '7'
            },
            {
              label: '8',
              value: '8'
            },
            {
              label: '9',
              value: '9'
            },
            {
              label: '10',
              value: '10'
            },
            {
              label: '11',
              value: '11'
            },
            {
              label: '12',
              value: '12'
            }
          ]
        }
      },
      lg           : {
        type       : 'string',
        title      : 'lg',
        description: 'Width on large devices',
        handler    : {
          type  : 'common/dropdown',
          values: [
            {
              label: 'auto',
              value: 'auto'
            },
            {
              label: 'content',
              value: 'content'
            },
            {
              label: '1',
              value: '1'
            },
            {
              label: '2',
              value: '2'
            },
            {
              label: '3',
              value: '3'
            },
            {
              label: '4',
              value: '4'
            },
            {
              label: '5',
              value: '5'
            },
            {
              label: '6',
              value: '6'
            },
            {
              label: '7',
              value: '7'
            },
            {
              label: '8',
              value: '8'
            },
            {
              label: '9',
              value: '9'
            },
            {
              label: '10',
              value: '10'
            },
            {
              label: '11',
              value: '11'
            },
            {
              label: '12',
              value: '12'
            }
          ]
        }
      },
      xl           : {
        type       : 'string',
        title      : 'xl',
        description: 'Width on extra large devices',
        handler    : {
          type  : 'common/dropdown',
          values: [
            {
              label: 'auto',
              value: 'auto'
            },
            {
              label: 'content',
              value: 'content'
            },
            {
              label: '1',
              value: '1'
            },
            {
              label: '2',
              value: '2'
            },
            {
              label: '3',
              value: '3'
            },
            {
              label: '4',
              value: '4'
            },
            {
              label: '5',
              value: '5'
            },
            {
              label: '6',
              value: '6'
            },
            {
              label: '7',
              value: '7'
            },
            {
              label: '8',
              value: '8'
            },
            {
              label: '9',
              value: '9'
            },
            {
              label: '10',
              value: '10'
            },
            {
              label: '11',
              value: '11'
            },
            {
              label: '12',
              value: '12'
            }
          ]
        }
      },
      offset       : {
        type      : 'object',
        title     : 'Offset',
        properties: {
          xs: {
            type       : 'integer',
            title      : 'xs',
            description: 'Offset columns to the right, on extra small devices.',
            handler    : {
              type  : 'common/dropdown',
              values: [
                {
                  label: '1',
                  value: '1'
                },
                {
                  label: '2',
                  value: '2'
                },
                {
                  label: '3',
                  value: '3'
                },
                {
                  label: '4',
                  value: '4'
                },
                {
                  label: '5',
                  value: '5'
                },
                {
                  label: '6',
                  value: '6'
                },
                {
                  label: '7',
                  value: '7'
                },
                {
                  label: '8',
                  value: '8'
                },
                {
                  label: '9',
                  value: '9'
                },
                {
                  label: '10',
                  value: '10'
                },
                {
                  label: '11',
                  value: '11'
                }
              ]
            }
          },
          sm: {
            type       : 'integer',
            title      : 'sm',
            description: 'Offset columns to the right, on small devices.',
            handler    : {
              type  : 'common/dropdown',
              values: [
                {
                  label: '1',
                  value: '1'
                },
                {
                  label: '2',
                  value: '2'
                },
                {
                  label: '3',
                  value: '3'
                },
                {
                  label: '4',
                  value: '4'
                },
                {
                  label: '5',
                  value: '5'
                },
                {
                  label: '6',
                  value: '6'
                },
                {
                  label: '7',
                  value: '7'
                },
                {
                  label: '8',
                  value: '8'
                },
                {
                  label: '9',
                  value: '9'
                },
                {
                  label: '10',
                  value: '10'
                },
                {
                  label: '11',
                  value: '11'
                }
              ]
            }
          },
          md: {
            type       : 'integer',
            title      : 'md',
            description: 'Offset columns to the right, on medium devices.',
            handler    : {
              type  : 'common/dropdown',
              values: [
                {
                  label: '1',
                  value: '1'
                },
                {
                  label: '2',
                  value: '2'
                },
                {
                  label: '3',
                  value: '3'
                },
                {
                  label: '4',
                  value: '4'
                },
                {
                  label: '5',
                  value: '5'
                },
                {
                  label: '6',
                  value: '6'
                },
                {
                  label: '7',
                  value: '7'
                },
                {
                  label: '8',
                  value: '8'
                },
                {
                  label: '9',
                  value: '9'
                },
                {
                  label: '10',
                  value: '10'
                },
                {
                  label: '11',
                  value: '11'
                }
              ]
            }
          },
          lg: {
            type       : 'integer',
            title      : 'lg',
            description: 'Offset columns to the right, on large devices.',
            handler    : {
              type  : 'common/dropdown',
              values: [
                {
                  label: '1',
                  value: '1'
                },
                {
                  label: '2',
                  value: '2'
                },
                {
                  label: '3',
                  value: '3'
                },
                {
                  label: '4',
                  value: '4'
                },
                {
                  label: '5',
                  value: '5'
                },
                {
                  label: '6',
                  value: '6'
                },
                {
                  label: '7',
                  value: '7'
                },
                {
                  label: '8',
                  value: '8'
                },
                {
                  label: '9',
                  value: '9'
                },
                {
                  label: '10',
                  value: '10'
                },
                {
                  label: '11',
                  value: '11'
                }
              ]
            }
          },
          xl: {
            type       : 'integer',
            title      : 'xl',
            description: 'Offset columns to the right, on extra large devices.',
            handler    : {
              type  : 'common/dropdown',
              values: [
                {
                  label: '1',
                  value: '1'
                },
                {
                  label: '2',
                  value: '2'
                },
                {
                  label: '3',
                  value: '3'
                },
                {
                  label: '4',
                  value: '4'
                },
                {
                  label: '5',
                  value: '5'
                },
                {
                  label: '6',
                  value: '6'
                },
                {
                  label: '7',
                  value: '7'
                },
                {
                  label: '8',
                  value: '8'
                },
                {
                  label: '9',
                  value: '9'
                },
                {
                  label: '10',
                  value: '10'
                },
                {
                  label: '11',
                  value: '11'
                }
              ]
            }
          }
        }
      },
      order        : {
        type      : 'object',
        handler   : {
          type: 'any'
        },
        properties: {}
      },
      verticalAlign: {
        type       : 'string',
        title      : 'Vertical align',
        description: 'Align on start, center or end',
        handler    : {
          type  : 'common/dropdown',
          values: [
            {
              label: 'Start',
              value: 'start'
            },
            {
              label: 'Center',
              value: 'center'
            },
            {
              label: 'End',
              value: 'end'
            }
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
            type : 'div',
            items: [
              {
                type : 'heading',
                title: 'Column width',
                level: 5
              },
              {
                key: 'xs'
              },
              {
                key: 'sm'
              },
              {
                key: 'md'
              },
              {
                key: 'lg'
              },
              {
                key: 'xl'
              },
              {
                type     : 'div',
                htmlClass: '',
                items    : [
                  {
                    type     : 'heading',
                    title    : 'Offset',
                    htmlClass: 'mt-3',
                    level    : 5
                  },
                  {
                    key: 'offset.xs'
                  },
                  {
                    key: 'offset.sm'
                  },
                  {
                    key: 'offset.md'
                  },
                  {
                    key: 'offset.lg'
                  },
                  {
                    key: 'offset.xl'
                  }
                ]
              },
              {
                type     : 'div',
                htmlClass: '',
                items    : [
                  {
                    type     : 'heading',
                    title    : 'Order',
                    htmlClass: 'mt-3',
                    level    : 5
                  },
                  {
                    key: '_order.orderType'
                  },
                  {
                    type     : 'div',
                    items    : [
                      {
                        key: '_order.typeCustom.xs'
                      },
                      {
                        key: '_order.typeCustom.sm'
                      },
                      {
                        key: '_order.typeCustom.md'
                      },
                      {
                        key: '_order.typeCustom.lg'
                      },
                      {
                        key: '_order.typeCustom.xl'
                      }
                    ],
                    visibleIf: {
                      $eval       : 'return ($val._order.orderType == \'custom\');',
                      dependencies: [
                        '_order.orderType'
                      ]
                    }
                  }
                ]
              },
              {
                type     : 'heading',
                title    : 'Vertical align',
                htmlClass: 'mt-3',
                level    : 5
              },
              {
                key: 'verticalAlign'
              }
            ]
          }
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('col', layoutInfo, layoutColJsfDefinition);
