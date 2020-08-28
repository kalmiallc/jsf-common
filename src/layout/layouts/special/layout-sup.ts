import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'sup',
  title   : 'Superscript',
  category: 'Text',
  icon    : 'layout-icons/sup.svg'
};

export class JsfLayoutSup extends JsfAbstractSpecialLayout<'sup'> {

  title: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutSup) {
    super();
    Object.assign(this, data);
  }
}
