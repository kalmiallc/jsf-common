import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  JsfLayoutOrderSummary
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type    : 'order-summary-overlay',
  title   : 'Order summary overlay',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutOrderSummaryOverlay extends JsfAbstractItemsLayout<'order-summary-overlay'> {
  items: JsfLayoutOrderSummary[];

  /**
   * The screen size at which the mode changes from static to floating.
   */
  floatModeChangeBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Horizontal alignment in float mode.
   */
  floatHorizontalAlign?: 'start' | 'center' | 'end';

  /**
   * Horizontal alignment in static mode.
   */
  staticHorizontalAlign?: 'start' | 'center' | 'end';

  /**
   * Column sizes at different breakpoints.
   */
  columnSize?: {
    xs?: number | 'auto' | 'content';
    sm?: number | 'auto' | 'content';
    md?: number | 'auto' | 'content';
    lg?: number | 'auto' | 'content';
    xl?: number | 'auto' | 'content';
  };

  fullHeight?: boolean;

  constructor(data: JsfLayoutOrderSummaryOverlay) {
    super();
    Object.assign(this, data);
  }
}

export const layoutOrderSummaryOverlayJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      floatModeChangeBreakpoint: {
        type       : 'string',
        title      : 'Float mode change breakpoint',
        description: 'Choose xs, sm, md, lg or xl',
        handler    : {
          type  : 'common/button-toggle',
          values: [
            {
              label: 'xs',
              value: 'xs'
            },
            {
              label: 'sm',
              value: 'sm'
            },
            {
              label: 'md',
              value: 'md'
            },
            {
              label: 'lg',
              value: 'lg'
            },
            {
              label: 'xl',
              value: 'xl'
            }
          ]
        }
      },
      floatHorizontalAlign     : {
        type       : 'string',
        title      : 'Float horizontal align',
        description: 'Choose start, center or end',
        handler    : {
          type  : 'common/button-toggle',
          values: [
            {
              label: 'start',
              value: 'start'
            },
            {
              label: 'center',
              value: 'center'
            },
            {
              label: 'end',
              value: 'end'
            }
          ]
        }
      },
      fullHeight               : {
        type : 'boolean',
        title: 'Full height'
      },
      staticHorizontalAlign    : {
        type       : 'string',
        title      : 'Static horizontal align',
        description: 'Choose start, center or end',
        handler    : {
          type  : 'common/button-toggle',
          values: [
            {
              label: 'start',
              value: 'start'
            },
            {
              label: 'center',
              value: 'center'
            },
            {
              label: 'end',
              value: 'end'
            }
          ]
        }
      },
      columnSize               : {
        type      : 'object',
        title     : 'Column size',
        properties: {
          xs: {
            type       : 'string',
            title      : 'xs',
            description: 'Choose column size at xs breakpoint.',
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
          sm: {
            type       : 'string',
            title      : 'sm',
            description: 'Choose column size at sm breakpoint.',
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
          md: {
            type       : 'string',
            title      : 'md',
            description: 'Choose column size at md breakpoint.',
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
          lg: {
            type       : 'string',
            title      : 'lg',
            description: 'Choose column size at lg breakpoint.',
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
          xl: {
            type       : 'string',
            title      : 'xl',
            description: 'Choose column size at xl breakpoint.',
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
          }
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Order Summary Overlay', [
          {
            type : 'div',
            items: [
              {
                type : 'heading',
                title: 'Float mode change breakpoint',
                level: 5
              },
              {
                key      : 'floatModeChangeBreakpoint',
                htmlClass: 'mb-3'
              },
              {
                type : 'heading',
                title: 'Float horizontal align',
                level: 5
              },
              {
                key      : 'floatHorizontalAlign',
                htmlClass: 'mb-3'
              },
              {
                type : 'heading',
                title: 'Static horizontal align',
                level: 5
              },
              {
                key      : 'staticHorizontalAlign',
                htmlClass: 'mb-3'
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Column size',
                    level: 5
                  },
                  {
                    key: 'columnSize.xs'
                  },
                  {
                    key: 'columnSize.sm'
                  },
                  {
                    key: 'columnSize.md'
                  },
                  {
                    key: 'columnSize.lg'
                  },
                  {
                    key: 'columnSize.xl'
                  }
                ]
              }
            ]
          }
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('order-summary-overlay', layoutInfo, layoutOrderSummaryOverlayJsfDefinition);
