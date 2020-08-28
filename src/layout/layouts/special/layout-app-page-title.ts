import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type             : 'app-page-title',
  title            : 'Page title',
  category         : 'Layout',
  icon             : 'layout-icons/app-page-title.svg',
  defaultDefinition: {
    type: 'app-page-title'
  }
};

export class JsfLayoutAppPageTitle extends JsfAbstractSpecialLayout<'app-page-title'> {

  title?: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutAppPageTitle) {
    super();
    Object.assign(this, data);
  }
}
