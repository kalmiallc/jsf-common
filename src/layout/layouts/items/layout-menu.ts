import { LayoutInfoInterface }                                                   from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfLayoutButtonPreferences, JsfLayoutMenuItem } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'menu',
  title   : 'Menu',
  category: 'Navigation',
  icon    : 'layout-icons/menu.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutMenu extends JsfAbstractItemsLayout<'menu'> {
  items: JsfLayoutMenuItem[];

  title: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  icon?: string;

  preferences?: JsfLayoutButtonPreferences;

  constructor(data: JsfLayoutMenu) {
    super();
    Object.assign(this, data);
  }
}
