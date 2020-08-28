import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type             : 'badge',
  title            : 'Badge',
  category         : 'Text',
  icon             : 'layout-icons/badge.svg',
  defaultDefinition: {
    type : 'badge',
    title: 'Badge'
  }
};

export class JsfLayoutBadge extends JsfAbstractSpecialLayout<'badge'> {

  title: string;

  templateData?: {
    $eval: string;
    dependencies?: string[];
  };

  color?: string | {
    $eval: string;
    dependencies?: string[];
  };

  constructor(data: JsfLayoutBadge) {
    super();
    Object.assign(this, data);
  }
}
