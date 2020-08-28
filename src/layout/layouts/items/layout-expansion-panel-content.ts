import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'expansion-panel-content',
  title   : 'Expansion panel content',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutExpansionPanelContent extends JsfAbstractItemsLayout<'expansion-panel-content'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutExpansionPanelContent) {
    super();
    Object.assign(this, data);
  }
}
