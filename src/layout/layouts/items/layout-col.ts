import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'col',
  title   : 'Column',
  category: 'Layout',
  icon    : 'layout-icons/col.svg',
  items   : {
    enabled: true
  },
  parent  : {
    allowedTypes: ['row']
  }
};

export class JsfLayoutCol extends JsfAbstractItemsLayout<'col'> {
  items: JsfUnknownLayout[];
  /**
   * Column widths.
   */
  xs?: number | 'auto' | 'content' | 'none';
  sm?: number | 'auto' | 'content' | 'none';
  md?: number | 'auto' | 'content' | 'none';
  lg?: number | 'auto' | 'content' | 'none';
  xl?: number | 'auto' | 'content' | 'none';

  /**
   * Column offsets.
   */
  offset?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };

  /**
   * Visual order in row.
   */
  order?: {
            xs?: number;
            sm?: number;
            md?: number;
            lg?: number;
            xl?: number;
          } | 'first' | 'last';

  /**
   * Vertical alignment for self.
   */
  verticalAlign?: 'start' | 'center' | 'end';


  constructor(data: JsfLayoutCol) {
    super();
    Object.assign(this, data);
  }
}
