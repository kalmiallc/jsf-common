import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfLayoutCol
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'row',
  title       : 'Row',
  category    : 'Layout',
  icon        : 'layout-icons/row.svg',
  items       : {
    enabled     : true,
    allowedTypes: ['col']
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
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
      },

      verticalAlign  : {
        type       : 'string',
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
      },

      horizontalAlign: {
        type       : 'string',
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
            },
            {
              label: 'Around',
              value: 'around'
            },
            {
              label: 'Between',
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
          ...EditorInterfaceLayoutFactory.outputKey('gutters'),
          ...EditorInterfaceLayoutFactory.outputKey('verticalAlign', 'Vertical align'),
          ...EditorInterfaceLayoutFactory.outputKey('horizontalAlign', 'Horizontal align'),
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('row', layoutInfo, layoutRowJsfDefinition);
