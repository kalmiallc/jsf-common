import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'powered-by',
  title   : 'Powered by',
  category: 'Layout',
  icon    : 'layout-icons/powered-by.svg'
};

export class JsfLayoutPoweredBy extends JsfAbstractSpecialLayout<'powered-by'> {

  constructor(data: JsfLayoutPoweredBy) {
    super();
    Object.assign(this, data);
  }

}
