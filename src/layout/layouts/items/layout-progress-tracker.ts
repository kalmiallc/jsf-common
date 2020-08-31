import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  JsfLayoutProgressTrackerStep
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type    : 'progress-tracker',
  title   : 'Progress tracker',
  category: 'Layout',
  icon    : 'layout-icons/progress-tracker.svg',
  items   : {
    enabled: true,
    fixed  : ['progress-tracker-step']
  }
};

export class JsfLayoutProgressTracker extends JsfAbstractItemsLayout<'progress-tracker'> {
  items: JsfLayoutProgressTrackerStep[];

  step?: number | {
    $eval: string;
    dependencies: string[]
  }; // Range 0 to n, where n is last step index

  progressTitle: string;

  progressTitleTemplateData: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutProgressTracker) {
    super();
    Object.assign(this, data);
  }
}

export const layoutProgressTrackerJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      step                     : {
        type      : 'object',
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
            title: 'Dependenices',
            items: {
              type: 'string'
            }
          }
        }
      },
      progressTitle            : {
        type : 'string',
        title: 'Progress title'
      },
      progressTitleTemplateData: {
        type      : 'object',
        title     : 'Progress title template data',
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
            title: 'Dependenices',
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
        ...EditorInterfaceLayoutFactory.createPanel('Progress Tracker', [
          {
            type : 'div',
            items: [
              {
                type : 'div',
                items: [
                  {
                    type : 'heading',
                    title: 'Step',
                    level: 5
                  },
                  {
                    key: 'step.$eval'
                  },
                  {
                    type : 'div',
                    items: [
                      {
                        type : 'heading',
                        title: 'Dependencies',
                        level: 6
                      },
                      {
                        type : 'array',
                        key  : 'step.dependencies',
                        items: [
                          {
                            type : 'row',
                            items: [
                              {
                                type : 'col',
                                xs   : 'auto',
                                items: [
                                  {
                                    key: 'step.dependencies[]'
                                  }
                                ]
                              },
                              {
                                type : 'col',
                                xs   : 'content',
                                items: [
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
                                          path : 'step.dependencies',
                                          index: {
                                            $eval: 'return $getItemIndex(\'step.dependencies[]\')'
                                          }
                                        }
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        type     : 'div',
                        visibleIf: {
                          $eval       : 'return !$val.step.dependencies.length',
                          dependencies: [
                            'step'
                          ]
                        },
                        items    : [
                          {
                            type     : 'span',
                            htmlClass: 'd-block py-4 text-center',
                            title    : 'No dependencies yet.'
                          }
                        ]
                      },
                      {
                        type   : 'button',
                        icon   : 'add',
                        title  : 'Add dependency',
                        onClick: {
                          arrayItemAdd: {
                            path: 'step.dependencies'
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

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('progress-tracker', layoutInfo, layoutProgressTrackerJsfDefinition);
