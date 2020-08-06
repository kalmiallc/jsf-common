import { JsfAbstractSpecialLayout } from '../../abstract/abstract-layout';
import { DefExtends, DefCategory, DefProp, DefLayout }               from '../../../jsf-for-jsf';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'app-breadcrumbs'
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Navigation')
@DefLayout({
  type: 'div',
  items: [
    { key: 'separator' }
  ]
})
export class JsfLayoutAppBreadcrumbs extends JsfAbstractSpecialLayout<'app-breadcrumbs'> {

  @DefProp({
    type: 'string',
    title: 'Separator'
  })
  separator?: string;

  constructor(data: JsfLayoutAppBreadcrumbs) {
    super();
    Object.assign(this, data);
  }

}
