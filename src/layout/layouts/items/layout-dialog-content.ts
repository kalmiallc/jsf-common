import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  JsfUnknownLayout
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type    : 'dialog-content',
  title   : 'Dialog content',
  category: 'Popups & Modals',
  icon    : 'layout-icons/dialog-content.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutDialogContent extends JsfAbstractItemsLayout<'dialog-content'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutDialogContent) {
    super();
    Object.assign(this, data);
  }
}

export const layoutDialogContentJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties

    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('dialog-content', layoutInfo, layoutDialogContentJsfDefinition);
