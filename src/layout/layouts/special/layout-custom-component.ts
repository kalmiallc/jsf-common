import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'custom-component',
  title   : 'Custom component',
  category: 'Layout',
  icon    : 'layout-icons/custom-component.svg'
};

export class JsfLayoutCustomComponent extends JsfAbstractSpecialLayout<'custom-component'> {

  /**
   * Inline component or remote url to load.
   */
  component: {
               $eval: string,
             } | string;

  /**
   * Optional config to be passed to the component factory.
   */
  config?: {
             $eval: string,
           } | any;

  constructor(data: JsfLayoutCustomComponent) {
    super();
    Object.assign(this, data);
  }
}
