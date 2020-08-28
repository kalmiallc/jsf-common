import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type : 'expansion-panel-standalone-header',
  title: 'Expansion panel standalone header',
  category: 'Layout',
  icon : 'unknown.svg',
  items: {
    enabled: true
  }
};

export class JsfLayoutExpansionPanelStandaloneHeader extends JsfAbstractItemsLayout<'expansion-panel-standalone-header'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutExpansionPanelStandaloneHeader) {
    super();
    Object.assign(this, data);
  }
}
