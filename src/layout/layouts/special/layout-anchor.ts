import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type             : 'anchor',
  title            : 'Link',
  category         : 'Text',
  icon             : 'layout-icons/anchor.svg',
  defaultDefinition: {
    type : 'anchor',
    title: 'My link',
    href : 'https://'
  }
};

export class JsfLayoutAnchor extends JsfAbstractSpecialLayout<'anchor'> {

  title: string;

  titleTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  href: string;

  hrefTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  constructor(data: JsfLayoutAnchor) {
    super();
    Object.assign(this, data);
  }
}
