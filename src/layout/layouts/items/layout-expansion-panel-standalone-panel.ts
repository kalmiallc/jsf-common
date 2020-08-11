import { JsfAbstractItemsLayout }           from '../../abstract/abstract-layout';
import { DefCategory, DefExtends, DefProp } from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout }                 from '../../index';
import { DefLayoutInfo }                    from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type : 'expansion-panel-standalone-panel',
  title: 'Expansion panel standalone panel',
  icon: 'unknown.svg',
  items: {
    enabled: true,
    default: ['expansion-panel-standalone-header', 'expansion-panel-standalone-content'],
    fixed  : ['expansion-panel-standalone-header', 'expansion-panel-standalone-content']
  }
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutExpansionPanelStandalonePanel extends JsfAbstractItemsLayout<'expansion-panel-standalone-panel'> {
  @DefProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutExpansionPanelStandalonePanel) {
    super();
    Object.assign(this, data);
  }
}
