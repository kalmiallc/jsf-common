import { JsfAbstractItemsLayout }         from '../../abstract/abstract-layout';
import { JsfLayoutDrawerHeader }          from './layout-drawer-header';
import { JsfLayoutDrawerContent }         from './layout-drawer-content';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'drawer',
  title: 'Drawer',
  icon: 'layout-icons/drawer.svg',
  items: {
    enabled: true,
    fixed: [ 'drawer-header', 'drawer-content' ]
  }
})
@DefLayout({
  type : 'div',
  items: [
    {
      type: 'heading',
      level: 5,
      title: 'Color'
    },
    {
      key: 'color',
      htmlClass: 'mb-3'
    },
    {
      type: 'heading',
      level: 5,
      title: 'Position'
    },
    {
      key: 'position'
    }
  ]
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutDrawer extends JsfAbstractItemsLayout<'drawer'> {
  // @DefProp(['JsfLayoutDrawerHeader', 'JsfLayoutDrawerContent'])   --TODO--
  items: (JsfLayoutDrawerHeader | JsfLayoutDrawerContent)[];
  
  @DefProp({
    type       : 'string',
    title      : 'Color',
    description: 'Choose color of the drawer.',
    handler: {
      type: 'common/button-toggle',
      values: [
        { label: 'Primary', value: 'primary'},
        { label: 'Accent', value: 'accent'},
        { label: 'None', value: 'none'}
      ]
    }
  })
  color?: 'primary' | 'accent' | 'none';

  @DefProp({
    type       : 'string',
    title      : 'Position',
    description: 'Choose the position of the drawer.',
    handler: {
      type: 'common/button-toggle',
      values: [
        { label: 'Bottom', value: 'bottom'},
        { label: 'Top', value: 'top'}
      ]
    }
  })
  position?: 'bottom' | 'top';

  constructor(data: JsfLayoutDrawer) {
    super();
    Object.assign(this, data);
  }
}
