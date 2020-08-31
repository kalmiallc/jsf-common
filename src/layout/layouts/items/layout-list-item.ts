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
  type    : 'list-item',
  title   : 'List item',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutListItem extends JsfAbstractItemsLayout<'list-item'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutListItem) {
    super();
    Object.assign(this, data);
  }
}

export const layoutListItemJsfDefinition = {
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

JsfRegister.layout('list-item', layoutInfo, layoutListItemJsfDefinition);
