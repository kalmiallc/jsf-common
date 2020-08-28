import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'drawer-content',
  title   : 'Drawer content',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutDrawerContent extends JsfAbstractItemsLayout<'drawer-content'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutDrawerContent) {
    super();
    Object.assign(this, data);
  }
}
