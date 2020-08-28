import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type             : 'heading',
  title            : 'Heading',
  category         : 'Text',
  icon             : 'layout-icons/heading.svg',
  defaultDefinition: {
    type : 'heading',
    level: 3,
    title: 'Heading text'
  }
};

export class JsfLayoutHeading extends JsfAbstractSpecialLayout<'heading'> {

  title: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  level?: 1 | 2 | 3 | 4 | 5 | 6;

  constructor(data: JsfLayoutHeading) {
    super();
    Object.assign(this, data);
  }
}
