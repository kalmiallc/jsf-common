import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'sub',
  title   : 'Subscript',
  category: 'Text',
  icon    : 'layout-icons/sub.svg'
};

export class JsfLayoutSub extends JsfAbstractSpecialLayout<'sub'> {

  title: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutSub) {
    super();
    Object.assign(this, data);
  }
}
