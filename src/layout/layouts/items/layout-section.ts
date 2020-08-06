import { JsfAbstractItemsLayout }         from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'section',
  items: {
    enabled: true
  }
})
@DefLayout({
  type : 'div',
  items: [
    {
      key: 'expandable'
    },
    {
      key: 'expanded'
    }
  ]
})

@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutSection extends JsfAbstractItemsLayout<'section'> {

  @DefProp({
    type : 'boolean',
    title: 'Expandable',
  })
  expandable?: boolean;

  @DefProp({
    type : 'boolean',
    title: 'Expand',
  })
  expanded?: boolean;

  constructor(data: JsfLayoutSection) {
    super();
    Object.assign(this, data);
  }
}
