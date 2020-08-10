import { JsfAbstractSpecialLayout } from '../../abstract/abstract-layout';
import { DefCategory, DefExtends, DefProp, DefLayout }  from '../../../jsf-for-jsf/decorators';
import { createDependencyArray } from '../../../jsf-for-jsf/util/dependency-array';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'badge',
  title: 'Badge',
  icon: 'layout-icons/badge.svg'
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Text')
@DefLayout({
  type: 'div',
  items: [
    { key: 'title' },
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Template data',
          level: 5
        },
        { key: 'templateData.$eval'},
        createDependencyArray('templateData')
      ]
    },
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Color',
          level: 5
        },
        { key: 'color.$eval' },
        createDependencyArray('color')
      ]
    }
  ]
})
export class JsfLayoutBadge extends JsfAbstractSpecialLayout<'badge'> {

  @DefProp({
    type: 'string',
    title: 'Title'
  })
  title: string;

  @DefProp({
    type: 'object',
    title: 'Template data',
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
      },
      dependencies: {
        type: 'array',
        title: 'Dependencies',
        items: {
          type: 'string'
        }
      }
    }
  })
  templateData?: {
    $eval: string;
    dependencies?: string[];
  };

  @DefProp({
    type: 'object',
    title: 'Color',
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
      },
      dependencies: {
        type: 'array',
        title: 'Dependencies',
        items: {
          type: 'string'
        }
      }
    }
  })
  color?: string | {
    $eval: string;
    dependencies?: string[];
  };

  constructor(data: JsfLayoutBadge) {
    super();
    Object.assign(this, data);
  }
}
