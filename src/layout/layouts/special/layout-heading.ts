import { JsfAbstractSpecialLayout }                    from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { createDependencyArray }                       from '../../../jsf-for-jsf/util/dependency-array';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'heading',
  title: 'Heading',
  icon: 'layout-icons/heading.svg',
  defaultDefinition:  {
    type: 'heading',
    level: 3,
    title: 'Heading text'
  }
})
@DefLayout({
  type : 'div',
  items: [
    {
      key: 'title'
    },
    { 
      key: 'level',
      htmlClass: 'my-3'
    },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Template data',
          level: 5
        },
        { 
          key: 'templateData.$eval',
          htmlClass: 'mb-3'
        },
        // bogus layout for sensible collapsing & readability
        createDependencyArray('templateData')
      ]
    }
  ]
})

@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Text')
export class JsfLayoutHeading extends JsfAbstractSpecialLayout<'heading'> {

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
      },
    }
  })
  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  @DefProp({
    type       : 'integer',
    title      : 'level',
    minimum    : 1,
    maximum    : 6,
    description: 'Choose a number from 1 to 6'
  })
  level?: 1 | 2 | 3 | 4 | 5 | 6;

  constructor(data: JsfLayoutHeading) {
    super();
    Object.assign(this, data);
  }
}
