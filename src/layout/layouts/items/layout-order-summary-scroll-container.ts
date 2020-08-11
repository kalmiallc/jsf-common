import { JsfAbstractItemsLayout } from '../../abstract/abstract-layout';
import { DefExtends, DefProp, DefCategory }    from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout } from '../../index';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'order-summary-scroll-container',
  title: 'Order summary scroll container',
  icon: 'unknown.svg',
  items: {
    enabled: true
  }
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutOrderSummaryScrollContainer extends JsfAbstractItemsLayout<'order-summary-scroll-container'> {
  @DefProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];
  constructor(data: JsfLayoutOrderSummaryScrollContainer) {
    super();
    Object.assign(this, data);
  }
}
