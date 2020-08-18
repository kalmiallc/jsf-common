import { JsfAbstractSpecialLayout }       from '../../abstract/abstract-layout';
import { DefExtends, DefLayout, DefProp, DefCategory } from '../../../jsf-for-jsf/decorators';
import { createDependencyArray } from '../../../jsf-for-jsf/util/dependency-array';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'anchor',
  title: 'Link',
  icon: 'layout-icons/anchor.svg',
  defaultDefinition:  {
    type : 'anchor',
    title: 'My link',
    href : 'https://'
  }
})
@DefLayout({
  type : 'div',
  items: [
    {
      key: 'title'
    },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Title template data',
          level: 5
        },
        {
          key: 'titleTemplateData.$eval'
        },
        // bogus layout for sensible collapsing & readability
        createDependencyArray('titleTemplateData')
      ]
    },
    { key: 'href' },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Href template data',
          level: 5
        },
        {
          key: 'hrefTemplateData.$eval'
        },
        // bogus layout for sensible collapsing & readability
        createDependencyArray('hrefTemplateData')
      ]
    }

  ]
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Text')
export class JsfLayoutAnchor extends JsfAbstractSpecialLayout<'anchor'> {

  @DefProp({
    type : 'string',
    title: 'Title'
  })
  title: string;

  @DefProp({
    type      : 'object',
    title     : 'Title template data',
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
          type: 'string',
        }
      },
    }
  })
  titleTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  @DefProp({
    type : 'string',
    title: 'Href'
  })
  href: string;

  @DefProp({
    type      : 'object',
    title     : 'Href template data',
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
      },
    }
  })
  hrefTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  constructor(data: JsfLayoutAnchor) {
    super();
    Object.assign(this, data);
  }
}
