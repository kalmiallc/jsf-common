import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'progress-tracker-step',
  title   : 'Progress tracker step',
  category: 'Layout',
  icon    : 'layout-icons/progress-tracker.svg'
};

export class JsfLayoutProgressTrackerStep extends JsfAbstractSpecialLayout<'progress-tracker-step'> {

  title?: string;

  titleTemplateData?: {
    $eval: string,
    dependencies?: string[]
  };

  description?: string;

  descriptionTemplateData?: {
    $eval: string,
    dependencies?: string[]
  };

  icon?: string | {
    $eval: string,
    dependencies?: string[]
  };

  disabled?: boolean | {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutProgressTrackerStep) {
    super();
    Object.assign(this, data);
  }
}
