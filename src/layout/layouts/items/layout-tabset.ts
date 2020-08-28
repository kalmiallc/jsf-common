import { LayoutInfoInterface }                  from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfLayoutTab } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'tabset',
  title   : 'Tabset',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled     : true,
    default     : ['tab', 'tab', 'tab'],
    allowedTypes: ['tab']
  }
};

export class JsfLayoutTabSet extends JsfAbstractItemsLayout<'tabset'> {
  items: JsfLayoutTab[];

  preferences?: JsfLayoutTabSetPreferences;

  constructor(data: JsfLayoutTabSet) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutTabSetPreferences {
  /**
   * Whether tab contents have a dynamic height.
   * Default is True.
   */
  dynamicHeight?: boolean;
  /**
   * Align tab labels in the tabset container.
   * Default is 'start'.
   */
  labelAlignment?: 'start' | 'center' | 'end';
  /**
   * Set whether the tabset header appears above or below the tab contents.
   * Default is 'above'.
   */
  headerPosition?: 'above' | 'below';
  /**
   * Color of the selection highlight.
   * Default is 'primary'.
   */
  color?: 'primary' | 'accent';
  /**
   * Color of the header background.
   * Default is 'none'.
   */
  backgroundColor?: 'none' | 'primary' | 'accent';
  /**
   * Whether ripples are disabled.
   * Default is False.
   */
  disableRipple?: boolean;
  /**
   * Type of header to render.
   * Default is 'default'.
   */
  headerType?: 'default' | 'round';
}
