import { LayoutInfoInterface }                   from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfLayoutStep } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'stepper',
  title   : 'Stepper',
  category: 'Layout',
  icon    : 'layout-icons/stepper.svg',
  items   : {
    enabled     : true,
    default     : ['step', 'step', 'step'],
    allowedTypes: ['step']
  }
};

export class JsfLayoutStepper extends JsfAbstractItemsLayout<'stepper'> {

  items: JsfLayoutStep[];

  variant?: 'horizontal' | 'vertical';

  linear?: boolean;

  primary?: boolean;

  preferences?: JsfLayoutStepperPreferences;

  initialStep?: number | {
    $eval: string;
  };

  // Event - step change
  onStepChange?: {
    $eval: string;
  };

  constructor(data: JsfLayoutStepper) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutStepperPreferences {
  /**
   * Stepper variant.
   */
  appearance: 'standard' | 'compact';
  /**
   * Define the position of the labels.
   * Only available for horizontal-type stepper.
   */
  labelPosition?: 'end' | 'bottom';
  /**
   * Define the position of the step header.
   */
  stepHeaderPosition: 'start' | 'end';
  /**
   * Name of a material icon to use as the edit icon.
   * See https://material.io/tools/icons/
   */
  editIcon: string;
  /**
   * Name of a material icon to use as the done icon.
   * See https://material.io/tools/icons/
   */
  doneIcon: string;
}
