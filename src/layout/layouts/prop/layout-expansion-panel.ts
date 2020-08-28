import { LayoutInfoInterface }                                                                  from '../../../register/interfaces';
import { JsfAbstractPropLayout, JsfLayoutExpansionPanelContent, JsfLayoutExpansionPanelHeader } from '../../../layout';

export class JsfLayoutPropExpansionPanelPreferences {}

const layoutInfo: LayoutInfoInterface = {
  type       : 'expansion-panel',
  title      : 'Expansion-panel',
  category   : 'Layout',
  icon       : 'layout-icons/expansion-panel.svg',
  formControl: {
    enabled: true
  },
  items      : {
    enabled: true,
    fixed  : ['expansion-panel-header', 'expansion-panel-content']
  }
};

export class JsfLayoutPropExpansionPanel extends JsfAbstractPropLayout {
  type: 'expansion-panel';


  items: (JsfLayoutExpansionPanelContent | JsfLayoutExpansionPanelHeader)[];

  /**
   * Whether the user can expand multiple panels at the same time.
   */
  multi?: boolean;

  preferences?: JsfLayoutPropExpansionPanelPreferences;

  constructor(data: JsfLayoutPropExpansionPanel) {
    super();
    Object.assign(this, data);
  }
}
