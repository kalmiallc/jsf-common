import { LayoutInfoInterface }                                  from '../../../register/interfaces';
import { JsfAbstractSpecialLayout, JsfLayoutButtonPreferences } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'array-item-add',
  title   : 'Array item add',
  category: 'Buttons & Indicators',
  icon    : 'layout-icons/array-item-add.svg'
};

export class JsfLayoutArrayItemAdd extends JsfAbstractSpecialLayout<'array-item-add'> {

  title: string;

  icon?: string;

  path: string;

  value?: {
            $eval: string,
          } | any;

  preferences?: JsfLayoutButtonPreferences;

  constructor(data: JsfLayoutArrayItemAdd) {
    super();
    Object.assign(this, data);
  }
}
