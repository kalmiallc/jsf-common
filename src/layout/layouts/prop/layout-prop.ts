import { LayoutInfoInterface }                                                              from '../../../register/interfaces';
import { jsfAbstractLayoutTranslatableProperties, JsfAbstractPropLayout, JsfUnknownLayout } from '../../../layout';
import { JsfRegister }                                                                      from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'prop',
  title       : 'Form Control',
  category    : 'Layout',
  icon        : 'layout-icons/prop.svg',
  formControl : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'placeholder']
  }
};

export class JsfLayoutProp extends JsfAbstractPropLayout {
  type?: never;

  preferences?: JsfLayoutPropPreferences;

  /**
   * Used only in specific cases like table 2.0, kanban board, ...
   */
  items?: JsfUnknownLayout[];

  constructor(data: JsfLayoutProp) {
    super();
    Object.assign(this, data);
  }
}

export type JsfLayoutPropPreferences =
  JsfLayoutPropStringPreferences |
  JsfLayoutPropNumberPreferences |
  JsfLayoutPropBooleanPreferences;


export interface JsfLayoutPropStringPreferences {
  /**
   * Prop color palette.
   */
  color?: 'primary' | 'accent';
  /**
   * Set the appearance of input form fields.
   */
  appearance?: 'legacy' | 'standard' | 'fill' | 'outline';
  /**
   * Input variant. Affects appearance of the control as defined in the active theme.
   */
  variant?: 'standard' | 'small';
  /**
   * Whether the prop should have a clear button.
   */
  clearable?: boolean;
  /**
   * Name of a material icon to use as the prefix.
   * See https://material.io/tools/icons/
   */
  prefixIcon?: string;
  /**
   * Name of a material icon to use as the suffix.
   * See https://material.io/tools/icons/
   */
  suffixIcon?: string;
  /**
   * Text to use as the prefix.
   */
  prefixLabel?: string;
  /**
   * Text to use as the suffix.
   */
  suffixLabel?: string;
}

export interface JsfLayoutPropNumberPreferences extends JsfLayoutPropStringPreferences {
  /**
   * Show the increment/decrement buttons on the sides of the input control.
   */
  stepperButtons?: boolean;
  /**
   * Amount to increment/decrement the value when using stepper buttons or arrow keys.
   */
  step?: number;
}

export interface JsfLayoutPropIntegerPreferences extends JsfLayoutPropStringPreferences {
  /**
   * Show the increment/decrement buttons on the sides of the input control.
   */
  stepperButtons?: boolean;
  /**
   * Amount to increment/decrement the value when using stepper buttons or arrow keys.
   */
  step?: number;
}

export interface JsfLayoutPropBooleanPreferences {
  /**
   * Display the control as either a checkbox or a slider.
   */
  variant: 'checkbox' | 'slider';
  /**
   * Prop color palette.
   */
  color?: 'primary' | 'accent';
  /**
   * Set the position of the label in relation to the check box.
   */
  labelPositionCheckbox?: 'before' | 'after';
  /**
   * Set the position of the label in relation to the slider.
   */
  labelPositionSlider?: 'before' | 'after';
}

// The actual definition should be fetched from the `@prop/<type>` layouts, in order to avoid having to do any definition transforms based
// on prop type.
JsfRegister.layout('prop', layoutInfo, null);
