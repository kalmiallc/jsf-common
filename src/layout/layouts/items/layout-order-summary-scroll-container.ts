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
  type        : 'order-summary-scroll-container',
  title       : 'Order summary scroll container',
  category    : 'Layout',
  icon        : 'unknown.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutOrderSummaryScrollContainer extends JsfAbstractItemsLayout<'order-summary-scroll-container'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutOrderSummaryScrollContainer) {
    super();
    Object.assign(this, data);
  }
}

export const layoutOrderSummaryScrollContainerJsfDefinition = {
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

JsfRegister.layout('order-summary-scroll-container', layoutInfo, layoutOrderSummaryScrollContainerJsfDefinition);
