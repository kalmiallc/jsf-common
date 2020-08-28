import { LayoutInfoInterface }                     from '../../../register/interfaces';
import { JsfAbstractPropLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type       : 'table',
  title      : 'Table',
  category   : 'List',
  icon       : 'layout-icons/table.svg',
  formControl: {
    enabled: true
  },
  items      : {
    enabled: true
  }
};

export class JsfLayoutPropTable extends JsfAbstractPropLayout {
  type: 'table';

  headers: JsfUnknownLayout[];

  items: JsfUnknownLayout[];

  preferences?: JsfLayoutPropTablePreferences;

  constructor(data: JsfLayoutPropTable) {
    super();
    Object.assign(this, data);
  }
}


export interface JsfLayoutPropTablePreferences {
  /**
   * Breakpoints for controlling column widths.
   */
  columnWidthBreakpoints: {
    xs?: { [headerLayoutId: string]: number },
    sm?: { [headerLayoutId: string]: number },
    md?: { [headerLayoutId: string]: number },
    lg?: { [headerLayoutId: string]: number },
    xl?: { [headerLayoutId: string]: number },
  };

}
