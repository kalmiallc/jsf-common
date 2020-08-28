import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'hr',
  title   : 'Horizontal rule',
  category: 'Layout',
  icon    : 'layout-icons/hr.svg'
};

export class JsfLayoutHr extends JsfAbstractSpecialLayout<'hr'> {

  constructor(data: JsfLayoutHr) {
    super();
    Object.assign(this, data);
  }

}
