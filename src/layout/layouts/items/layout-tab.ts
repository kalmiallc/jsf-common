import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'tab',
  title   : 'Tab',
  category: 'Layout',
  icon    : 'layout-icons/tab.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutTab extends JsfAbstractItemsLayout<'tab'> {
  items: JsfUnknownLayout[];

  title?: string;

  selected?: boolean;

  preferences?: JsfLayoutTabPreferences;

  constructor(data: JsfLayoutTab) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutTabPreferences {
  /**
   * Name of a material icon to use as the prefix.
   * See https://material.io/tools/icons/
   */
  prefixIcon?: string;
  /**
   * Text to use as the prefix.
   */
  prefixLabel?: string;
}
