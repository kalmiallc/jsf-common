import { JsfAbstractItemsLayout }         from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory, DefSpecialProp } from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout } from '../../index';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'dialog-actions',
  items: {
    enabled: true
  }
})
@DefLayout({
  type : 'div',
  items: [
    { key: 'align' }
  ]
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Popups & Modals')
export class JsfLayoutDialogActions extends JsfAbstractItemsLayout<'dialog-actions'> {
  @DefProp({
    type       : 'string',
    title      : 'Align',
    handler: {
      type: 'common/dropdown',
      values: [
        {value: 'center', label: 'Center'},
        {value: 'end', label: 'End'},
      ]
    }
  })
  align: 'center' | 'end';

  @DefSpecialProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutDialogActions) {
    super();
    Object.assign(this, data);
  }
}
