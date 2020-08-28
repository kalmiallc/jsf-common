import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'expansion-panel-header',
  title   : 'Expansion panel header',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutExpansionPanelHeader extends JsfAbstractItemsLayout<'expansion-panel-header'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutExpansionPanelHeader) {
    super();
    Object.assign(this, data);
  }
}
