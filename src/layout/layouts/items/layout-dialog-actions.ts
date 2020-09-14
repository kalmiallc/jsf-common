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
  type        : 'dialog-actions',
  title       : 'Dialog actions',
  category    : 'Popups & Modals',
  icon        : 'layout-icons/dialog-actions.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutDialogActions extends JsfAbstractItemsLayout<'dialog-actions'> {
  align: 'center' | 'end';

  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutDialogActions) {
    super();
    Object.assign(this, data);
  }
}

export const layoutDialogActionsJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      align: {
        type   : 'string',
        title  : 'Align',
        handler: {
          type  : 'common/dropdown',
          values: [
            {
              value: 'center',
              label: 'Center'
            },
            {
              value: 'end',
              label: 'End'
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
        ...EditorInterfaceLayoutFactory.createPanel('Dialog Actions', [
          {
            type : 'div',
            items: [
              {
                key: 'align'
              }
            ]
          }
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('dialog-actions', layoutInfo, layoutDialogActionsJsfDefinition);
