import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

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
