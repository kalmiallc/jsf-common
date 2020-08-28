import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'chartjs',
  title   : 'Chart',
  category: 'Layout',
  icon    : 'layout-icons/chartjs.svg'
};

export class JsfLayoutChartJS extends JsfAbstractSpecialLayout<'chartjs'> {

  width?: string;

  height?: string;

  /**
   * ChartJS config object.
   */
  config: {
            $eval: string,
            dependencies: string[]
          } | any;

  constructor(data: JsfLayoutChartJS) {
    super();
    Object.assign(this, data);
  }
}
