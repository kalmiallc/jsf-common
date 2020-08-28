import { LayoutInfoInterface }    from '../../../register/interfaces';
import { JsfAbstractItemsLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'section',
  title   : 'Section',
  category: 'Layout',
  icon    : 'layout-icons/section.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutSection extends JsfAbstractItemsLayout<'section'> {

  expandable?: boolean;

  expanded?: boolean;

  constructor(data: JsfLayoutSection) {
    super();
    Object.assign(this, data);
  }
}
