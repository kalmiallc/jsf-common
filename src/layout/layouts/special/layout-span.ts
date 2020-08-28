import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type             : 'span',
  title            : 'Span',
  category         : 'Text',
  icon             : 'layout-icons/span.svg',
  defaultDefinition: {
    type : 'span',
    title: 'Span text'
  }
};

export class JsfLayoutSpan extends JsfAbstractSpecialLayout<'span'> {

  title: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutSpan) {
    super();
    Object.assign(this, data);
  }
}
