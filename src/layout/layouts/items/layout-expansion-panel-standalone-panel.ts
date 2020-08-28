import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'expansion-panel-standalone-panel',
  title   : 'Expansion panel standalone panel',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true,
    default: ['expansion-panel-standalone-header', 'expansion-panel-standalone-content'],
    fixed  : ['expansion-panel-standalone-header', 'expansion-panel-standalone-content']
  }
};

export class JsfLayoutExpansionPanelStandalonePanel extends JsfAbstractItemsLayout<'expansion-panel-standalone-panel'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutExpansionPanelStandalonePanel) {
    super();
    Object.assign(this, data);
  }
}
