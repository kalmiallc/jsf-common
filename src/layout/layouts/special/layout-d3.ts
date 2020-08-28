import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'd3',
  title   : 'Chart library',
  category: 'Layout',
  icon    : 'layout-icons/d3.svg'
};

export class JsfLayoutD3 extends JsfAbstractSpecialLayout<'d3'> {

  chartType: string;

  chartOptions: any;

  dataSets: any[][];

  height?: number;

  constructor(data: JsfLayoutD3) {
    super();
    Object.assign(this, data);
  }
}
