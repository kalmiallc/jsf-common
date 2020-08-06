import { JsfAbstractItemsLayout } from '../../abstract/abstract-layout';
import { DefProp, DefExtends, DefCategory }    from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout } from '../../index';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'expansion-panel-content',
  items: {
    enabled: true
  }
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutExpansionPanelContent extends JsfAbstractItemsLayout<'expansion-panel-content'> {
  @DefProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];
  constructor(data: JsfLayoutExpansionPanelContent) {
    super();
    Object.assign(this, data);
  }
}
