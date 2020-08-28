import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type             : 'button',
  title            : 'Button',
  category         : 'Buttons & Indicators',
  icon             : 'layout-icons/button.svg',
  defaultDefinition: {
    type : 'button',
    title: 'Button'
  }
};

export class JsfLayoutButton extends JsfAbstractSpecialLayout<'button'> {

  title?: string;

  titleTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  icon?: string;

  /**
   * @deprecated Use onClick `submit` option instead.
   */
  submit?: boolean;

  scrollToTop?: boolean; // TODO move this under click event options

  disabled?: {
               $eval: string;
               dependencies: string[];
             } | boolean;

  preferences?: JsfLayoutButtonPreferences;

  constructor(data: JsfLayoutButton) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutButtonPreferences {
  /**
   * Color of the selection highlight.
   * Default is 'none'.
   */
  color?: 'none' | 'primary' | 'accent';
  /**
   * Button variant.
   * Default is 'basic'.
   */
  variant: 'basic' | 'raised' | 'flat' | 'stroked' | 'icon' | 'fab' | 'mini-fab';
  /**
   * Button size.
   */
  size: 'normal' | 'large' | 'small';
  /**
   * Whether ripples are disabled.
   * Default is False.
   */
  disableRipple?: boolean;
}
