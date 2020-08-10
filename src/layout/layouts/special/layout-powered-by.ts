import { JsfAbstractSpecialLayout } from '../../abstract/abstract-layout';
import { DefCategory, DefExtends }  from '../../../jsf-for-jsf/decorators';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'powered-by',
  title: 'Powered by',
  icon: 'layout-icons/powered-by.svg'
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Layout')
export class JsfLayoutPoweredBy extends JsfAbstractSpecialLayout<'powered-by'> {

  constructor(data: JsfLayoutPoweredBy) {
    super();
    Object.assign(this, data);
  }

}
