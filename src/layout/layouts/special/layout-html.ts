import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type             : 'html',
  title            : 'Html',
  category         : 'Text',
  icon             : 'layout-icons/html.svg',
  defaultDefinition: {
    type: 'html',
    html: '<span>Custom HTML here</span>'
  }
};

export class JsfLayoutHtml extends JsfAbstractSpecialLayout<'html'> {

  html: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutHtml) {
    super();
    Object.assign(this, data);
  }
}
