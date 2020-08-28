import { LayoutInfoInterface }                                                                                from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfLayoutOrderSummaryScrollContainer, JsfLayoutOrderSummaryStaticContainer } from '../../../layout';

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
