import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'progress-bar',
  title   : 'Progress bar',
  category: 'Buttons & Indicators',
  icon    : 'layout-icons/progress-bar.svg'
};

export class JsfLayoutProgressBar extends JsfAbstractSpecialLayout<'progress-bar'> {

  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';

  color?: 'primary' | 'accent' | 'warn';

  progress?: number | {
    $eval: string;
    dependencies: string[]
  }; // Range 0 to 100

  constructor(data: JsfLayoutProgressBar) {
    super();
    Object.assign(this, data);
  }
}
