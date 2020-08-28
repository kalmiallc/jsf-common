import { LayoutInfoInterface }                     from '../../../register/interfaces';
import { JsfAbstractPropLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type       : 'array',
  title      : 'Array',
  category   : 'List',
  icon       : 'layout-icons/array.svg',
  formControl: {
    enabled: true
  },
  items      : {
    enabled: true
  }
};

export class JsfLayoutPropArray extends JsfAbstractPropLayout {
  type: 'array';

  items: JsfUnknownLayout[];

  addable?: boolean;

  orderable?: boolean;

  removable?: boolean;

  constructor(data: JsfLayoutPropArray) {
    super();
    Object.assign(this, data);
  }
}
