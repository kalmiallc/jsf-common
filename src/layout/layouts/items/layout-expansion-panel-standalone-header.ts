import { JsfAbstractItemsLayout }           from '../../abstract/abstract-layout';
import { DefCategory, DefExtends, DefProp } from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout }                 from '../../index';
import { DefLayoutInfo }                    from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type : 'expansion-panel-standalone-header',
  items: {
    enabled: true
  }
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutExpansionPanelStandaloneHeader extends JsfAbstractItemsLayout<'expansion-panel-standalone-header'> {
  @DefProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutExpansionPanelStandaloneHeader) {
    super();
    Object.assign(this, data);
  }
}
