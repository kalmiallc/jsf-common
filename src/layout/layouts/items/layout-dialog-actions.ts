import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type: 'dialog-actions',
  title: 'Dialog actions',
  category: 'Popups & Modals',
  icon: 'layout-icons/dialog-actions.svg',
  items: {
    enabled: true
  }
};

export class JsfLayoutDialogActions extends JsfAbstractItemsLayout<'dialog-actions'> {
  align: 'center' | 'end';

  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutDialogActions) {
    super();
    Object.assign(this, data);
  }
}
