import { LayoutInfoInterface }                  from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfLayoutCol } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'row',
  title   : 'Row',
  category: 'Layout',
  icon    : 'layout-icons/row.svg',
  items   : {
    enabled     : true,
    allowedTypes: ['col']
  }
};

export class JsfLayoutRow extends JsfAbstractItemsLayout<'row'> {
  /**
   * Toggle column gutters. Defaults to true.
   */
  gutters?: boolean;

  /**
   * Vertical alignment for items.
   */
  verticalAlign: 'start' | 'center' | 'end';

  /**
   * Horizontal alignment.
   */
  horizontalAlign: 'start' | 'center' | 'end' | 'around' | 'between';

  items: JsfLayoutCol[];

  constructor(data: JsfLayoutRow) {
    super();
    Object.assign(this, data);
  }
}
