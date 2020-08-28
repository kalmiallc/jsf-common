import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'drawer-header',
  title   : 'Drawer header',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutDrawerHeader extends JsfAbstractItemsLayout<'drawer-header'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutDrawerHeader) {
    super();
    Object.assign(this, data);
  }
}
