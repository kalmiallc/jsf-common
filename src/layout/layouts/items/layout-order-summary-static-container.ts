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
  type    : 'order-summary-static-container',
  title   : 'Order summary static container',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutOrderSummaryStaticContainer extends JsfAbstractItemsLayout<'order-summary-static-container'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutOrderSummaryStaticContainer) {
    super();
    Object.assign(this, data);
  }
}

export const layoutOrderSummaryStaticContainerJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
      ]),
    ]
  }
};

JsfRegister.layout('order-summary-static-container', layoutInfo, layoutOrderSummaryStaticContainerJsfDefinition);
