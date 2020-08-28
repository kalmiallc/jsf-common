import { LayoutInfoInterface }                           from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfLayoutOrderSummary } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'order-summary-overlay',
  title   : 'Order summary overlay',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutOrderSummaryOverlay extends JsfAbstractItemsLayout<'order-summary-overlay'> {
  items: JsfLayoutOrderSummary[];

  /**
   * The screen size at which the mode changes from static to floating.
   */
  floatModeChangeBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Horizontal alignment in float mode.
   */
  floatHorizontalAlign?: 'start' | 'center' | 'end';

  /**
   * Horizontal alignment in static mode.
   */
  staticHorizontalAlign?: 'start' | 'center' | 'end';

  /**
   * Column sizes at different breakpoints.
   */
  columnSize?: {
    xs?: number | 'auto' | 'content';
    sm?: number | 'auto' | 'content';
    md?: number | 'auto' | 'content';
    lg?: number | 'auto' | 'content';
    xl?: number | 'auto' | 'content';
  };

  fullHeight?: boolean;

  constructor(data: JsfLayoutOrderSummaryOverlay) {
    super();
    Object.assign(this, data);
  }
}
