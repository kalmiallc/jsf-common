import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'step',
  title   : 'Step',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutStep extends JsfAbstractItemsLayout<'step'> {
  items: JsfUnknownLayout[];

  title?: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  /**
   * Array of prop paths which will be checked to determine if this step is valid
   * @deprecated This is now done automatically
   */
  linearValidationProps?: string[];

  optional?: boolean;

  editable?: boolean;

  preferences?: JsfLayoutStepPreferences;

  constructor(data: JsfLayoutStep) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutStepPreferences {
}
