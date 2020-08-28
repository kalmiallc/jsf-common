import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'order-summary-scroll-container',
  title   : 'Order summary scroll container',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutOrderSummaryScrollContainer extends JsfAbstractItemsLayout<'order-summary-scroll-container'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutOrderSummaryScrollContainer) {
    super();
    Object.assign(this, data);
  }
}
