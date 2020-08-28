import { LayoutInfoInterface }                                                   from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfLayoutDrawerContent, JsfLayoutDrawerHeader } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'drawer',
  title   : 'Drawer',
  category: 'Layout',
  icon    : 'layout-icons/drawer.svg',
  items   : {
    enabled: true,
    fixed  : ['drawer-header', 'drawer-content']
  }
};

export class JsfLayoutDrawer extends JsfAbstractItemsLayout<'drawer'> {
  items: (JsfLayoutDrawerHeader | JsfLayoutDrawerContent)[];

  color?: 'primary' | 'accent' | 'none';

  position?: 'bottom' | 'top';

  constructor(data: JsfLayoutDrawer) {
    super();
    Object.assign(this, data);
  }
}
