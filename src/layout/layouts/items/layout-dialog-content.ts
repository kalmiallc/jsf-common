import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type: 'dialog-content',
  title: 'Dialog content',
  category: 'Popups & Modals',
  icon: 'layout-icons/dialog-content.svg',
  items: {
    enabled: true
  }
};

export class JsfLayoutDialogContent extends JsfAbstractItemsLayout<'dialog-content'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutDialogContent) {
    super();
    Object.assign(this, data);
  }
}
