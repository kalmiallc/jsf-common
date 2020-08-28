import { LayoutInfoInterface }                                  from '../../../register/interfaces';
import { JsfAbstractSpecialLayout, JsfLayoutButtonPreferences } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'array-item-remove',
  title   : 'Array item remove',
  category: 'Buttons & Indicators',
  icon    : 'layout-icons/array-item-remove.svg'
};

export class JsfLayoutArrayItemRemove extends JsfAbstractSpecialLayout<'array-item-remove'> {

  title: string;

  icon?: string;

  preferences?: JsfLayoutButtonPreferences;

  constructor(data: JsfLayoutArrayItemRemove) {
    super();
    Object.assign(this, data);
  }
}
