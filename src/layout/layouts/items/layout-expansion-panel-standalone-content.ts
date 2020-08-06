import { JsfAbstractItemsLayout }           from '../../abstract/abstract-layout';
import { DefCategory, DefExtends, DefProp } from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout }                 from '../../index';
import { DefLayoutInfo }                    from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type : 'expansion-panel-standalone-content',
  items: {
    enabled: true
  }
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutExpansionPanelStandaloneContent extends JsfAbstractItemsLayout<'expansion-panel-standalone-content'> {
  @DefProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutExpansionPanelStandaloneContent) {
    super();
    Object.assign(this, data);
  }
}
