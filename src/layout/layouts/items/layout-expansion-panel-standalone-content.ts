import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'expansion-panel-standalone-content',
  title   : 'Expansion panel standalone content',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutExpansionPanelStandaloneContent extends JsfAbstractItemsLayout<'expansion-panel-standalone-content'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutExpansionPanelStandaloneContent) {
    super();
    Object.assign(this, data);
  }
}
