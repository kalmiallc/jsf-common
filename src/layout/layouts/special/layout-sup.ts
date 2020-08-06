import { JsfAbstractSpecialLayout } from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory }       from '../../../jsf-for-jsf/decorators';
import { createDependencyArray } from '../../../jsf-for-jsf/util/dependency-array';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'sup'
})
@DefLayout({
  type : 'div',
  items: [
    { key: 'title' },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Template data',
          level: 5
        },
        { key: 'templateData.$eval' },
        createDependencyArray('templateData')
      ]
    }
  ]
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Text')
export class JsfLayoutSup extends JsfAbstractSpecialLayout<'sup'> {

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

  constructor(data: JsfLayoutSup) {
    super();
    Object.assign(this, data);
  }
}
