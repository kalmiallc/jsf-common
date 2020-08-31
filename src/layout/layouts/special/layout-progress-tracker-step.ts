import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type    : 'progress-tracker-step',
  title   : 'Progress tracker step',
  category: 'Layout',
  icon    : 'layout-icons/progress-tracker.svg'
};

export class JsfLayoutProgressTrackerStep extends JsfAbstractSpecialLayout<'progress-tracker-step'> {

  title?: string;

  titleTemplateData?: {
    $eval: string,
    dependencies?: string[]
  };

  description?: string;

  descriptionTemplateData?: {
    $eval: string,
    dependencies?: string[]
  };

  icon?: string | {
    $eval: string,
    dependencies?: string[]
  };

  disabled?: boolean | {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutProgressTrackerStep) {
    super();
    Object.assign(this, data);
  }
}

export const layoutProgressTrackerStepJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      title                  : {
        type : 'string',
        title: 'Title'
      },
      titleTemplateData      : {
        type      : 'object',
        title     : 'Title template data',
        properties: {
          $eval       : {
            type   : 'string',
            title  : 'Eval',
            handler: {
              type   : 'common/code-editor',
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
      },
      description            : {
        type : 'string',
        title: 'Description'
      },
      descriptionTemplateData: {
        type      : 'object',
        title     : 'Description template data',
        properties: {
          $eval       : {
            type   : 'string',
            title  : 'Eval',
            handler: {
              type   : 'common/code-editor',
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
      },
      icon                   : {
        type      : 'object',
        title     : 'Icon',
        properties: {
          $eval       : {
            type   : 'string',
            title  : 'Eval',
            handler: {
              type   : 'common/code-editor',
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
      },
      disabled               : {
        type      : 'object',
        title     : 'Disabled',
        properties: {
          $eval       : {
            type   : 'string',
            title  : 'Eval',
            handler: {
              type   : 'common/code-editor',
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
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Progress Tracker Step', [
          {
            type : 'div',
            items: [
              {
                key: 'title'
              },
              {
                type : 'div',
                items: [
                  {
                    type : 'heading',
                    title: 'Title template data',
                    level: '5'
                  },
                  {
                    key: 'titleTemplateData.$eval'
                  },
                  {
                    type : 'heading',
                    title: 'Dependencies',
                    level: 6
                  },
                  {
                    type : 'array',
                    key  : 'titleTemplateData.dependencies',
                    items: [
                      {
                        type : 'expansion-panel-content',
                        items: [
                          {
                            type: 'hr'
                          },
                          {
                            type     : 'div',
                            htmlClass: 'd-flex justify-content-between',
                            items    : [
                              {
                                type: 'div'
                              },
                              {
                                type       : 'button',
                                icon       : 'delete',
                                color      : 'accent',
                                preferences: {
                                  variant: 'icon'
                                },
                                onClick    : [
                                  {
                                    arrayItemRemove: {
                                      path : 'titleTemplateData.dependencies',
                                      index: {
                                        $eval: 'return $getItemIndex(\'titleTemplateData.dependencies[]\')'
                                      }
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            key: 'titleTemplateData.dependencies[]'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type             : 'div',
                    titleTemplateData: {
                      $eval       : 'return !$val.titleTemplateData.dependencies.length',
                      dependencies: [
                        'titleTemplateData'
                      ]
                    },
                    items            : [
                      {
                        type     : 'span',
                        htmlClass: 'd-block py-4 text-center',
                        title    : 'No dependencies yet.'
                      }
                    ]
                  },
                  {
                    type           : 'row',
                    horizontalAlign: 'center',
                    htmlClass      : 'mt-2',
                    items          : [
                      {
                        type   : 'button',
                        title  : 'Add dependency',
                        onClick: {
                          arrayItemAdd: {
                            path: 'titleTemplateData.dependencies'
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              {
                type : 'div',
                items: [
                  {
                    type : 'heading',
                    title: 'Description template data',
                    level: '5'
                  },
                  {
                    key: 'descriptionTemplateData.$eval'
                  },
                  {
                    type : 'heading',
                    title: 'Dependencies',
                    level: 6
                  },
                  {
                    type : 'array',
                    key  : 'descriptionTemplateData.dependencies',
                    items: [
                      {
                        type : 'expansion-panel-content',
                        items: [
                          {
                            type: 'hr'
                          },
                          {
                            type     : 'div',
                            htmlClass: 'd-flex justify-content-between',
                            items    : [
                              {
                                type: 'div'
                              },
                              {
                                type       : 'button',
                                icon       : 'delete',
                                color      : 'accent',
                                preferences: {
                                  variant: 'icon'
                                },
                                onClick    : [
                                  {
                                    arrayItemRemove: {
                                      path : 'descriptionTemplateData.dependencies',
                                      index: {
                                        $eval: 'return $getItemIndex(\'descriptionTemplateData.dependencies[]\')'
                                      }
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            key: 'descriptionTemplateData.dependencies[]'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type             : 'div',
                    titleTemplateData: {
                      $eval       : 'return !$val.titleTemplateData.dependencies.length',
                      dependencies: [
                        'descriptionTemplateData'
                      ]
                    },
                    items            : [
                      {
                        type     : 'span',
                        htmlClass: 'd-block py-4 text-center',
                        title    : 'No dependencies yet.'
                      }
                    ]
                  },
                  {
                    type           : 'row',
                    horizontalAlign: 'center',
                    htmlClass      : 'mt-2',
                    items          : [
                      {
                        type   : 'button',
                        title  : 'Add dependency',
                        onClick: {
                          arrayItemAdd: {
                            path: 'descriptionTemplateData.dependencies'
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              {
                type : 'div',
                items: [
                  {
                    type : 'heading',
                    title: 'Icon',
                    level: '5'
                  },
                  {
                    key: 'icon.$eval'
                  },
                  {
                    type : 'heading',
                    title: 'Dependencies',
                    level: 6
                  },
                  {
                    type : 'array',
                    key  : 'icon.dependencies',
                    items: [
                      {
                        type : 'expansion-panel-content',
                        items: [
                          {
                            type: 'hr'
                          },
                          {
                            type     : 'div',
                            htmlClass: 'd-flex justify-content-between',
                            items    : [
                              {
                                type: 'div'
                              },
                              {
                                type       : 'button',
                                icon       : 'delete',
                                color      : 'accent',
                                preferences: {
                                  variant: 'icon'
                                },
                                onClick    : [
                                  {
                                    arrayItemRemove: {
                                      path : 'icon.dependencies',
                                      index: {
                                        $eval: 'return $getItemIndex(\'icon.dependencies[]\')'
                                      }
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            key: 'icon.dependencies[]'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type : 'div',
                    title: {
                      $eval       : 'return !$val.title.dependencies.length',
                      dependencies: [
                        'icon'
                      ]
                    },
                    items: [
                      {
                        type     : 'span',
                        htmlClass: 'd-block py-4 text-center',
                        title    : 'No dependencies yet.'
                      }
                    ]
                  },
                  {
                    type           : 'row',
                    horizontalAlign: 'center',
                    htmlClass      : 'mt-2',
                    items          : [
                      {
                        type   : 'button',
                        title  : 'Add dependency',
                        onClick: {
                          arrayItemAdd: {
                            path: 'icon.dependencies'
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              {
                key: 'disabled'
              },
              {
                type : 'div',
                items: [
                  {
                    type : 'heading',
                    title: 'Default',
                    level: '5'
                  },
                  {
                    key: 'disabled.$eval'
                  },
                  {
                    type : 'heading',
                    title: 'Dependencies',
                    level: 6
                  },
                  {
                    type : 'array',
                    key  : 'disabled.dependencies',
                    items: [
                      {
                        type : 'expansion-panel-content',
                        items: [
                          {
                            type: 'hr'
                          },
                          {
                            type     : 'div',
                            htmlClass: 'd-flex justify-content-between',
                            items    : [
                              {
                                type: 'div'
                              },
                              {
                                type       : 'button',
                                icon       : 'delete',
                                color      : 'accent',
                                preferences: {
                                  variant: 'icon'
                                },
                                onClick    : [
                                  {
                                    arrayItemRemove: {
                                      path : 'disabled.dependencies',
                                      index: {
                                        $eval: 'return $getItemIndex(\'disabled.dependencies[]\')'
                                      }
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            key: 'disabled.dependencies[]'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type    : 'div',
                    disabled: {
                      $eval       : 'return !$val.disabled.dependencies.length',
                      dependencies: [
                        'disabled'
                      ]
                    },
                    items   : [
                      {
                        type     : 'span',
                        htmlClass: 'd-block py-4 text-center',
                        title    : 'No dependencies yet.'
                      }
                    ]
                  },
                  {
                    type           : 'row',
                    horizontalAlign: 'center',
                    htmlClass      : 'mt-2',
                    items          : [
                      {
                        type   : 'button',
                        title  : 'Add dependency',
                        onClick: {
                          arrayItemAdd: {
                            path: 'disabled.dependencies'
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('progress-tracker-step', layoutInfo, layoutProgressTrackerStepJsfDefinition);
