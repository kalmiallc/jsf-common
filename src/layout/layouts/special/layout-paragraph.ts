import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type             : 'paragraph',
  title            : 'Paragraph',
  category         : 'Text',
  icon             : 'layout-icons/paragraph.svg',
  defaultDefinition: {
    type : 'paragraph',
    title: 'Paragraph text'
  }
};

export class JsfLayoutParagraph extends JsfAbstractSpecialLayout<'paragraph'> {

  title: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutParagraph) {
    super();
    Object.assign(this, data);
  }
}
