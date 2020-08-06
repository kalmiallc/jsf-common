import { JsfAbstractItemsLayout, JsfAbstractPropLayout }               from '../../abstract/abstract-layout';
import { JsfLayoutExpansionPanelStandalonePanel }                      from '../../index';
import { DefCategory, DefExtends, DefLayout, DefProp, DefSpecialProp } from '../../../jsf-for-jsf/decorators';
import { DefLayoutInfo }                                               from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type : 'expansion-panel-standalone',
  items: {
    enabled     : true,
    default     : ['expansion-panel-standalone-panel'],
    allowedTypes: ['expansion-panel-standalone-panel']
  }
})
@DefLayout({
  type : 'div',
  items: [
    { key: 'multi' }
  ]
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutExpansionPanelStandalone extends JsfAbstractItemsLayout<'expansion-panel-standalone'> {
  @DefProp({
    type : 'string',
    title: 'Type',
    const: 'expansion-panel-standalone'
  })
  type: 'expansion-panel-standalone';

  @DefSpecialProp(['JsfLayoutExpansionPanelStandalonePanel[]'])
  items: (JsfLayoutExpansionPanelStandalonePanel)[];

  /**
   * Whether the user can expand multiple panels at the same time.
   */
  @DefProp({
    type : 'boolean',
    title: 'Multi'
  })
  multi?: boolean;

  constructor(data: JsfLayoutExpansionPanelStandalone) {
    super();
    Object.assign(this, data);
  }
}
