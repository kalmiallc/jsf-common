import { JsfAbstractItemsLayout } from '../../abstract/abstract-layout';
import { DefSpecialProp, DefExtends, DefCategory }    from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout } from '../../index';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'dialog-content',
  title: 'Dialog content',
  icon: 'layout-icons/dialog-content.svg',
  items: {
    enabled: true
  }
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Popups & Modals')
export class JsfLayoutDialogContent extends JsfAbstractItemsLayout<'dialog-content'> {
  @DefSpecialProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutDialogContent) {
    super();
    Object.assign(this, data);
  }
}
