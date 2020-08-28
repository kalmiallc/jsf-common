import { LayoutInfoInterface }                                            from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfLayoutExpansionPanelStandalonePanel } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'expansion-panel-standalone',
  title   : 'Expansion panel standalone',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled     : true,
    default     : ['expansion-panel-standalone-panel'],
    allowedTypes: ['expansion-panel-standalone-panel']
  }
};

export class JsfLayoutExpansionPanelStandalone extends JsfAbstractItemsLayout<'expansion-panel-standalone'> {
  type: 'expansion-panel-standalone';

  items: (JsfLayoutExpansionPanelStandalonePanel)[];

  /**
   * Whether the user can expand multiple panels at the same time.
   */
  multi?: boolean;

  constructor(data: JsfLayoutExpansionPanelStandalone) {
    super();
    Object.assign(this, data);
  }
}
