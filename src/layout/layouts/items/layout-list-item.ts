import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'list-item',
  title   : 'List item',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutListItem extends JsfAbstractItemsLayout<'list-item'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutListItem) {
    super();
    Object.assign(this, data);
  }
}
