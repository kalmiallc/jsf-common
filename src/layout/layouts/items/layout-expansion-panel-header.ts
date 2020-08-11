import { JsfAbstractItemsLayout } from '../../abstract/abstract-layout';
import { DefProp, DefExtends, DefCategory }    from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout } from '../../index';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'expansion-panel-header',
  title: 'Expansion panel header',
  icon: 'unknown.svg',
  items: {
    enabled: true
  }
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutExpansionPanelHeader extends JsfAbstractItemsLayout<'expansion-panel-header'> {
  @DefProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];
  constructor(data: JsfLayoutExpansionPanelHeader) {
    super();
    Object.assign(this, data);
  }
}
