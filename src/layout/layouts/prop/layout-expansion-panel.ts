import { JsfAbstractPropLayout }                                         from '../../abstract/abstract-layout';
import { JsfUnknownLayout }                                              from '../../index';
import { DefExtends, DefLayout, DefProp, DefCategory, DefSpecialProp }   from '../../../jsf-for-jsf/decorators';
import { JsfLayoutExpansionPanelContent, JsfLayoutExpansionPanelHeader } from '../items';
import { DefLayoutInfo }                                                 from '../../../jsf-register-decorators';

export class JsfLayoutPropExpansionPanelPreferences {}

@DefLayoutInfo({
  type: 'expansion-panel',
  title: 'Expansion-panel',
  icon: 'layout-icons/expansion-panel.svg',
  formControl: {
    enabled: true
  },
  items: {
    enabled: true,
    fixed: ['expansion-panel-header', 'expansion-panel-content']
  }
})
@DefLayout({
  type : 'div',
  items: [
    // { key: 'type' },
    { key: 'multi' }
  ]
})
@DefExtends('JsfAbstractPropLayout')
@DefCategory('Layout')
export class JsfLayoutPropExpansionPanel extends JsfAbstractPropLayout {
  @DefProp({
    type : 'string',
    title: 'Type',
    const: 'expansion-panel'
  })
  type: 'expansion-panel';


  @DefSpecialProp(['JsfLayoutExpansionPanelContent[]', 'JsfLayoutExpansionPanelHeader[]'])
  items: (JsfLayoutExpansionPanelContent | JsfLayoutExpansionPanelHeader)[];

  /**
   * Whether the user can expand multiple panels at the same time.
   */
  @DefProp({
    type : 'boolean',
    title: 'Multi'
  })
  multi?: boolean;

  @DefSpecialProp('JsfLayoutPropExpansionPanelPreferences')
  preferences?: JsfLayoutPropExpansionPanelPreferences;

  constructor(data: JsfLayoutPropExpansionPanel) {
    super();
    Object.assign(this, data);
  }
}
