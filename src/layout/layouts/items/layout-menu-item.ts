import { LayoutInfoInterface }                                                 from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfLayoutOnClickInterface, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'menu-item',
  title   : 'Menu item',
  category: 'Navigation',
  icon    : 'layout-icons/menu-item.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutMenuItem extends JsfAbstractItemsLayout<'menu-item'> {
  items: JsfUnknownLayout[];

  title: string;

  description?: string;

  titleTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  descriptionTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  icon?: string;

  onClick?: JsfLayoutOnClickInterface | JsfLayoutOnClickInterface[];

  constructor(data: JsfLayoutMenuItem) {
    super();
    Object.assign(this, data);
  }
}
