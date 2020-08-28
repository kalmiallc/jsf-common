import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'app-breadcrumbs',
  title   : 'Breadcrumbs',
  category: 'Navigation',
  icon    : 'layout-icons/app-breadcrumbs.svg'
};

export class JsfLayoutAppBreadcrumbs extends JsfAbstractSpecialLayout<'app-breadcrumbs'> {

  separator?: string;

  constructor(data: JsfLayoutAppBreadcrumbs) {
    super();
    Object.assign(this, data);
  }

}
