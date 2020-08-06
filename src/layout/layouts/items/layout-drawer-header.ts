import { JsfAbstractItemsLayout } from '../../abstract/abstract-layout';
import { DefProp, DefExtends, DefCategory }             from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout } from '../../index';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'drawer-header',
  items: {
    enabled: true
  }
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutDrawerHeader extends JsfAbstractItemsLayout<'drawer-header'> {
  @DefProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];
  constructor(data: JsfLayoutDrawerHeader) {
    super();
    Object.assign(this, data);
  }
}
