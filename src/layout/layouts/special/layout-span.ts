import { JsfAbstractSpecialLayout }       from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'span',
  title: 'Span',
  icon: 'layout-icons/span.svg',
  defaultDefinition:  {
    type: 'span',
    title: 'Span text'
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
          title: 'Template data',
          level: 5
        },
        {
          key: 'templateData.$eval'
        },
        // bogus layout for sensible collapsing & readability
        // ↓↓↓ templateData.dependencies [] ↓↓↓
        {
          type: 'div',
          items: [
            {
              type: 'heading',
              title: 'Dependencies',
              level: 6
            },
            {
              type: 'array',
              key: 'templateData.dependencies',
              items: [
                {
                  type: 'expansion-panel-content',
                  items: [
                    {
                      type: 'hr'
                    },
                    {
                      type: 'div',
                      htmlClass: 'd-flex justify-content-between',
                      items: [
                        {
                          type: 'div',
                        },
                        {
                          type: 'button',
                          icon: 'delete',
                          color: 'accent',
                          preferences: {
                            variant: 'icon'
                          },
                          onClick: [
                            {
                              arrayItemRemove: {
                                path: 'templateData.dependencies',
                                index: {
                                  $eval: `return $getItemIndex('templateData.dependencies[]')`
                                }
                              }
                            }
                          ]
                        }
                      ]
                    },
                    {
                      key: 'templateData.dependencies[]'
                    },
                  ]
                }
              ]
            },
            {
              type: 'div',
              visibleIf: {
                $eval: `return !$val.templateData.dependencies.length`,
                dependencies: ['templateData']
              },
              items: [
                {
                  type: 'span',
                  htmlClass: 'd-block py-4 text-center',
                  title: 'No dependencies yet.'
                }
              ]
            },
            {
              type: 'row',
              horizontalAlign: 'center',
              htmlClass: 'mt-2',
              items: [
                {
                  type: 'button',
                  title: 'Add dependency',
                  // htmlClass: 't-3',
                  onClick: {
                    arrayItemAdd: {
                      path: 'templateData.dependencies',
                    }
                  }
                },
              ]
            }
          ]
        }
      ]
    }
  ]
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Text')
export class JsfLayoutSpan extends JsfAbstractSpecialLayout<'span'> {

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

  constructor(data: JsfLayoutSpan) {
    super();
    Object.assign(this, data);
  }
}
