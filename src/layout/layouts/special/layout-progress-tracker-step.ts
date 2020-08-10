import { JsfAbstractSpecialLayout }       from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'progress-tracker-step',
  title: 'Progress tracker step',
  icon: 'layout-icons/progress-tracker.svg'
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Layout')
@DefLayout({
  type: 'div',
  items: [
    { key: 'title' },
    // Title template data stuff ↓
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Title template data',
          level: '5',
        },
        { key: 'titleTemplateData.$eval' },
        {
          type: 'heading',
          title: 'Dependencies',
          level: 6
        },
        {
          type: 'array',
          key: 'titleTemplateData.dependencies',
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
                            path: 'titleTemplateData.dependencies',
                            index: {
                              $eval: `return $getItemIndex('titleTemplateData.dependencies[]')`
                            }
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  key: 'titleTemplateData.dependencies[]'
                },
              ]
            }
          ]
        },
        {
          type: 'div',
          titleTemplateData: {
            $eval: `return !$val.titleTemplateData.dependencies.length`,
            dependencies: ['titleTemplateData']
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
                  path: 'titleTemplateData.dependencies',
                }
              }
            },
          ]
        },
      ]
    },
    // Description template data stuff ↓
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Description template data',
          level: '5',
        },
        { key: 'descriptionTemplateData.$eval' },
        {
          type: 'heading',
          title: 'Dependencies',
          level: 6
        },
        {
          type: 'array',
          key: 'descriptionTemplateData.dependencies',
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
                            path: 'descriptionTemplateData.dependencies',
                            index: {
                              $eval: `return $getItemIndex('descriptionTemplateData.dependencies[]')`
                            }
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  key: 'descriptionTemplateData.dependencies[]'
                },
              ]
            }
          ]
        },
        {
          type: 'div',
          titleTemplateData: {
            $eval: `return !$val.titleTemplateData.dependencies.length`,
            dependencies: ['descriptionTemplateData']
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
                  path: 'descriptionTemplateData.dependencies',
                }
              }
            },
          ]
        },
      ]
    },
    // Icon template data stuff ↓
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Icon',
          level: '5',
        },
        { key: 'icon.$eval' },
        {
          type: 'heading',
          title: 'Dependencies',
          level: 6
        },
        {
          type: 'array',
          key: 'icon.dependencies',
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
                            path: 'icon.dependencies',
                            index: {
                              $eval: `return $getItemIndex('icon.dependencies[]')`
                            }
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  key: 'icon.dependencies[]'
                },
              ]
            }
          ]
        },
        {
          type: 'div',
          title: {
            $eval: `return !$val.title.dependencies.length`,
            dependencies: ['icon']
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
                  path: 'icon.dependencies',
                }
              }
            },
          ]
        },
      ]
    },
    { key: 'disabled' },
    // Default
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Default',
          level: '5',
        },
        { key: 'disabled.$eval' },
        {
          type: 'heading',
          title: 'Dependencies',
          level: 6
        },
        {
          type: 'array',
          key: 'disabled.dependencies',
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
                            path: 'disabled.dependencies',
                            index: {
                              $eval: `return $getItemIndex('disabled.dependencies[]')`
                            }
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  key: 'disabled.dependencies[]'
                },
              ]
            }
          ]
        },
        {
          type: 'div',
          disabled: {
            $eval: `return !$val.disabled.dependencies.length`,
            dependencies: ['disabled']
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
                  path: 'disabled.dependencies',
                }
              }
            },
          ]
        },
      ]
    },
  ]
})
export class JsfLayoutProgressTrackerStep extends JsfAbstractSpecialLayout<'progress-tracker-step'> {

  @DefProp({
    type: 'string',
    title: 'Title'
  })
  title?: string;

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
          type: 'string'
        }
      },
    }
  })
  titleTemplateData?: {
    $eval: string,
    dependencies?: string[]
  };

  @DefProp({
    type: 'string',
    title: 'Description'
  })
  description?: string;


  @DefProp({
    type      : 'object',
    title     : 'Description template data',
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
  descriptionTemplateData?: {
    $eval: string,
    dependencies?: string[]
  };


  @DefProp({
    type      : 'object',
    title     : 'Icon',
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
  icon?: string | {
    $eval: string,
    dependencies?: string[]
  };

  @DefProp({
    type      : 'object',
    title     : 'Disabled',
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
  disabled?: boolean | {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutProgressTrackerStep) {
    super();
    Object.assign(this, data);
  }
}
