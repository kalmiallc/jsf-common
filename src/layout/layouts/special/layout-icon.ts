import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type             : 'icon',
  title            : 'Icon',
  icon             : 'layout-icons/icon.svg',
  category         : 'Text',
  defaultDefinition: {
    type: 'icon',
    icon: 'warning'
  }
};

export class JsfLayoutIcon extends JsfAbstractSpecialLayout<'icon'> {

  icon: string;

  color?: 'primary' | 'accent' | 'warn';

  size?: string; // 24px, 1rem, etc...

  constructor(data: JsfLayoutIcon) {
    super();
    Object.assign(this, data);
  }
}
