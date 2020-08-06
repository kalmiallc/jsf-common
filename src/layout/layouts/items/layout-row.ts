import { JsfAbstractItemsLayout }                      from '../../abstract/abstract-layout';
import { JsfLayoutCol }                                from './layout-col';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { DefLayoutInfo }                               from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'row',
  items: {
    enabled: true,
    allowedTypes: ['col']
  }
})
@DefLayout({
  type : 'div',
  items: [
    {
      key: 'verticalAlign'
    },
    {
      key: 'horizontalAlign'
    },
    {
      type: 'hr'
    },
    {
      key: 'gutters'
    }
  ]
})

@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutRow extends JsfAbstractItemsLayout<'row'> {
  /**
   * Toggle column gutters. Defaults to true.
   */
  @DefProp({
    type : 'boolean',
    title: 'Gutters',
    description: 'Toggle column gutters (gap between columns):'
  })
  gutters?: boolean;
  /**
   * Vertical alignment for items.
   */
  @DefProp({
    type       : 'string',
    title      : 'Vertical align',
    description: 'Vertically align children elements',
    handler: {
      type: 'common/dropdown',
      values: [
        { label: 'start', value: 'start'},
        { label: 'center', value: 'center'},
        { label: 'end', value: 'end'}
      ]
    }
  })
  verticalAlign: 'start' | 'center' | 'end';
  /**
   * Horizontal alignment.
   */
  @DefProp({
    type       : 'string',
    title      : 'Horizontal align',
    description: 'Horizontally align children elements',
    handler: {
      type: 'common/dropdown',
      values: [
        { label: 'start', value: 'start'},
        { label: 'center', value: 'center'},
        { label: 'end', value: 'end'},
        { label: 'around', value: 'around'},
        { label: 'between', value: 'between'}
      ]
    }
  })
  horizontalAlign: 'start' | 'center' | 'end' | 'around' | 'between';

  @DefProp('JsfLayoutCol[]')
  items: JsfLayoutCol[];

  constructor(data: JsfLayoutRow) {
    super();
    Object.assign(this, data);
  }
}
