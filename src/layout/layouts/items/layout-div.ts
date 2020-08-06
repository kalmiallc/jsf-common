import { JsfAbstractItemsLayout }                      from '../../abstract/abstract-layout';
import { DefCategory, DefExtends, DefProp, DefLayout } from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout }                            from '../../index';
import { DefLayoutInfo }                               from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'div',
  items: {
    enabled: true
  }
})
@DefLayout({
  type: 'div',
  items: [
    {
      type: 'row',
      items: [
        {
          type: 'col',
          xs: 6,
          items: [
            {
              type: 'heading',
              level: 5,
              title: 'Vertical Scroll'
            },
            {
              key: 'scroll.vertical',
              htmlClass: 'h5'
            }
          ]
        },
        {
          type: 'col',
          xs: 6,
          items: [
            {
              type: 'heading',
              level: 5,
              title: 'Horizontal Scroll'
            },
            {
              key: 'scroll.horizontal',
              htmlClass: 'h5'
            }
          ]
        }
      ]
    },
    {
      type: 'hr'
    },
    {
      type: 'heading',
      level: 5,
      title: 'Custom code - on scroll stop'
    },
    {
      key: 'scroll.onScrollStop.$eval'
    }
  ]
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutDiv extends JsfAbstractItemsLayout<'div'> {
  @DefProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];

  @DefProp({
    type: 'object',
    properties: {
      vertical: {
        type: 'boolean'
      },
      horizontal: {
        type: 'boolean'
      },
      onScrollStop: {
        type: 'object',
        properties: {
          $eval: {
            type: 'string',
            title: 'Eval',
            handler: {
              type: 'common/code-editor',
              options: {
                language: 'javascript'
              }
            }
          }
        }
      }
    }
  })
  scroll?: {
    vertical?: boolean;
    horizontal?: boolean;

    onScrollStop?: {
      $eval: string
    }
  };

  constructor(data: JsfLayoutDiv) {
    super();
    Object.assign(this, data);
  }
}
