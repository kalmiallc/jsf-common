import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout, jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  JsfLayoutOrderSummaryScrollContainer,
  JsfLayoutOrderSummaryStaticContainer
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type    : 'order-summary',
  title   : 'Order summary',
  category: 'Layout',
  icon    : 'layout-icons/order-summary.svg',
  items   : {
    enabled     : true,
    allowedTypes: ['order-summary-static-container', 'order-summary-scroll-container', 'order-summary-overlay']
  }
};

export class JsfLayoutOrderSummary extends JsfAbstractItemsLayout<'order-summary'> {
  items: (JsfLayoutOrderSummaryStaticContainer | JsfLayoutOrderSummaryScrollContainer)[];

  constructor(data: JsfLayoutOrderSummary) {
    super();
    Object.assign(this, data);
  }
}

export const layoutOrderSummaryJsfDefinition = {
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

JsfRegister.layout('order-summary', layoutInfo, layoutOrderSummaryJsfDefinition);
