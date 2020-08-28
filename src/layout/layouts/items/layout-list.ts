import { LayoutInfoInterface }                       from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfLayoutListItem } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type : 'list',
  title: 'List',
  icon : 'layout-icons/list.svg',
  items: {
    enabled: true,
    fixed  : ['list-item']
  }
};

export class JsfLayoutList extends JsfAbstractItemsLayout<'list'> {

  items: JsfLayoutListItem[];

  preferences?: JsfLayoutListPreferences;

  constructor(data: JsfLayoutList) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutListPreferences {
  /**
   * List type, ordered or unordered.
   * Default is 'unordered'.
   */
  type: 'ordered' | 'unordered';
}
