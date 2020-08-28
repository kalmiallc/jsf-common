import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'order-summary-line-item',
  title   : 'Order summery line item',
  category: 'Layout',
  icon    : 'layout-icons/order-summary.svg'
};

export class JsfLayoutOrderSummaryLineItem extends JsfAbstractSpecialLayout<'order-summary-line-item'> {

  label: string;

  labelTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  value: string;

  valueTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  constructor(data: JsfLayoutOrderSummaryLineItem) {
    super();
    Object.assign(this, data);
  }
}
