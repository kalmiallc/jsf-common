import { JsfAbstractItemsLayout }         from '../../abstract/abstract-layout';
import { JsfLayoutButtonPreferences }     from '../special';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { JsfLayoutMenuItem } from './layout-menu-item';
import { createDependencyArray } from '../../../jsf-for-jsf/util/dependency-array';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'menu',
  title: 'Menu',
  icon: 'layout-icons/menu.svg',
  items: {
    enabled: true
  }
})
@DefLayout({
  type : 'div',
  items: [
    {
      key: 'title'
    },
    {
      key: 'icon'
    },
    {
      type: 'hr'
    },
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          level: 5,
          title: 'Template data'
        },
        {
          key: 'templateData.$eval'
        },
        createDependencyArray('templateData')
      ]
    }
  ]
})

@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Navigation')
export class JsfLayoutMenu extends JsfAbstractItemsLayout<'menu'> {
  @DefProp('JsfLayoutMenuItem[]')
  items: JsfLayoutMenuItem[];

  @DefProp({
    type : 'string',
    title: 'Title'
  })
  title: string;

  @DefProp({
    type      : 'object',
    title     : 'Template data',
    properties: {
      $eval       : {
        type : 'string',
        title: 'Eval',
        handler: {
          type: 'common/code-editor',
          options: {
            language: 'javascript'
          }
        }
      },
      dependencies: {
        type : 'array',
        title: 'Dependencies',
        items: {
          type: 'string'
        }
      }
    }
  })
  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  @DefProp({
    type : 'string',
    title: 'Icon'
  })
  icon?: string;

  @DefProp('JsfLayoutButtonPreferences')
  preferences?: JsfLayoutButtonPreferences;

  constructor(data: JsfLayoutMenu) {
    super();
    Object.assign(this, data);
  }
}
