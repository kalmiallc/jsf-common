import { JsfAbstractSpecialLayout }       from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'icon',
  title: 'Icon',
  icon: 'layout-icons/icon.svg'
})
@DefLayout({
  type : 'div',
  items: [
    { key: 'icon' },
    { key: 'color' },
    { key: 'size' },
  ]
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Buttons & Indicators')
export class JsfLayoutIcon extends JsfAbstractSpecialLayout<'icon'> {
  @DefProp({
    type : 'string',
    title: 'Icon',
  })
  icon: string;

  @DefProp({
    type       : 'string',
    title      : 'Color',
    handler: {
      type: 'common/dropdown',
      values: [
        {value: 'primary', label: 'Primary'},
        {value: 'accent', label: 'Accent'},
        {value: 'warn', label: 'Warn'}
      ]
    }
  })
  color?: 'primary' | 'accent' | 'warn';

  @DefProp({
    type : 'string',
    title: 'Size',
  })
  size?: string; // 24px, 1rem, etc...

  constructor(data: JsfLayoutIcon) {
    super();
    Object.assign(this, data);
  }
}
