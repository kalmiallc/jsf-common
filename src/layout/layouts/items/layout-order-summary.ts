import { JsfAbstractItemsLayout }               from '../../abstract/abstract-layout';
import { JsfLayoutOrderSummaryStaticContainer } from './layout-order-summary-static-container';
import { JsfLayoutOrderSummaryScrollContainer } from './layout-order-summary-scroll-container';
import { DefExtends, DefProp, DefCategory }                  from '../../../jsf-for-jsf/decorators';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'order-summary',
  title: 'Order summary',
  icon: 'layout-icons/order-summary.svg',
  items: {
    enabled: true,
    allowedTypes: ['order-summary-static-container', 'order-summary-scroll-container', 'order-summary-overlay']
  }
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutOrderSummary extends JsfAbstractItemsLayout<'order-summary'> {
  // @DefProp(['JsfLayoutOrderSummaryStaticContainer[]', 'JsfLayoutOrderSummaryScrollContainer[]']) --TODO--
  items: (JsfLayoutOrderSummaryStaticContainer | JsfLayoutOrderSummaryScrollContainer)[];

  constructor(data: JsfLayoutOrderSummary) {
    super();
    Object.assign(this, data);
  }
}
