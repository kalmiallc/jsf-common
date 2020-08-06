import { JsfAbstractItemsLayout } from '../../abstract/abstract-layout';
import { DefProp, DefExtends, DefCategory }             from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout } from '../../index';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'order-summary-static-container',
  items: {
    enabled: true
  }
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutOrderSummaryStaticContainer extends JsfAbstractItemsLayout<'order-summary-static-container'> {
  @DefProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];
  constructor(data: JsfLayoutOrderSummaryStaticContainer) {
    super();
    Object.assign(this, data);
  }
}
