import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  JsfLayoutCol
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type    : 'row',
  title   : 'Row',
  category: 'Layout',
  icon    : 'layout-icons/row.svg',
  items   : {
    enabled     : true,
    allowedTypes: ['col']
  }
};

export class JsfLayoutRow extends JsfAbstractItemsLayout<'row'> {
  /**
   * Toggle column gutters. Defaults to true.
   */
  gutters?: boolean;

  /**
   * Vertical alignment for items.
   */
  verticalAlign?: 'start' | 'center' | 'end';

  /**
   * Horizontal alignment.
   */
  horizontalAlign?: 'start' | 'center' | 'end' | 'around' | 'between';

  items: JsfLayoutCol[];

  constructor(data: JsfLayoutRow) {
    super();
    Object.assign(this, data);
  }
}

export const layoutRowJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      gutters        : {
        type       : 'boolean',
        title      : 'Gutters',
        description: 'Toggle column gutters (gap between columns):'
      },
      verticalAlign  : {
        type       : 'string',
        title      : 'Vertical align',
        description: 'Vertically align children elements',
        handler    : {
          type  : 'common/dropdown',
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
      horizontalAlign: {
        type       : 'string',
        title      : 'Horizontal align',
        description: 'Horizontally align children elements',
        handler    : {
          type  : 'common/dropdown',
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
            },
            {
              label: 'around',
              value: 'around'
            },
            {
              label: 'between',
              value: 'between'
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
        ...EditorInterfaceLayoutFactory.createPanel('Row', [
          {
            type : 'div',
            items: [
              {
                key: 'verticalAlign'
              },
              {
                key: 'horizontalAlign'
              },
              {
                type: 'hr'
              },
              {
                key: 'gutters'
              }
            ]
          }
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('row', layoutInfo, layoutRowJsfDefinition);
