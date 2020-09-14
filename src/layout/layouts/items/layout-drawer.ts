import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfLayoutDrawerContent,
  JsfLayoutDrawerHeader
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'drawer',
  title       : 'Drawer',
  category    : 'Layout',
  icon        : 'layout-icons/drawer.svg',
  items       : {
    enabled: true,
    fixed  : ['drawer-header', 'drawer-content']
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutDrawer extends JsfAbstractItemsLayout<'drawer'> {
  items: (JsfLayoutDrawerHeader | JsfLayoutDrawerContent)[];

  color?: 'primary' | 'accent' | 'none';

  position?: 'bottom' | 'top';

  constructor(data: JsfLayoutDrawer) {
    super();
    Object.assign(this, data);
  }
}

export const layoutDrawerJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      color   : {
        type       : 'string',
        title      : 'Color',
        description: 'Choose color of the drawer.',
        handler    : {
          type  : 'common/button-toggle',
          values: [
            {
              label: 'Primary',
              value: 'primary'
            },
            {
              label: 'Accent',
              value: 'accent'
            },
            {
              label: 'None',
              value: 'none'
            }
          ]
        }
      },
      position: {
        type       : 'string',
        title      : 'Position',
        description: 'Choose the position of the drawer.',
        handler    : {
          type  : 'common/button-toggle',
          values: [
            {
              label: 'Bottom',
              value: 'bottom'
            },
            {
              label: 'Top',
              value: 'top'
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
        ...EditorInterfaceLayoutFactory.createPanel('Drawer', [
          {
            type : 'div',
            items: [
              {
                type : 'heading',
                level: 5,
                title: 'Color'
              },
              {
                key      : 'color',
                htmlClass: 'mb-3'
              },
              {
                type : 'heading',
                level: 5,
                title: 'Position'
              },
              {
                key: 'position'
              }
            ]
          }
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('drawer', layoutInfo, layoutDrawerJsfDefinition);
