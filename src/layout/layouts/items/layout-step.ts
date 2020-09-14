import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfUnknownLayout
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'step',
  title       : 'Step',
  category    : 'Layout',
  icon        : 'unknown.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title']
  }
};

export class JsfLayoutStep extends JsfAbstractItemsLayout<'step'> {
  items: JsfUnknownLayout[];

  title?: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  /**
   * Array of prop paths which will be checked to determine if this step is valid
   * @deprecated This is now done automatically
   */
  linearValidationProps?: string[];

  optional?: boolean;

  editable?: boolean;

  preferences?: JsfLayoutStepPreferences;

  constructor(data: JsfLayoutStep) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutStepPreferences {
}

export const layoutStepJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      title                : {
        type : 'string',
        title: 'Title'
      },
      templateData         : {
        type      : 'object',
        title     : 'Template data',
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
      linearValidationProps: {
        type : 'array',
        title: 'Linear validation props',
        items: {
          type: 'string'
        }
      },
      optional             : {
        type : 'boolean',
        title: 'Optional step'
      },
      editable             : {
        type : 'boolean',
        title: 'Editable step'
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Step', [
          {
            type : 'div',
            items: [
              {
                key      : 'title',
                htmlClass: 'mb-3'
              },
              {
                type     : 'div',
                htmlClass: 'mb-3',
                items    : [
                  {
                    type : 'heading',
                    level: 5,
                    title: 'Template data'
                  },
                  {
                    key: 'templateData.$eval'
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
                        key  : 'templateData.dependencies',
                        items: [
                          {
                            type : 'row',
                            items: [
                              {
                                type : 'col',
                                xs   : 'auto',
                                items: [
                                  {
                                    key: 'templateData.dependencies[]'
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
                                          path : 'templateData.dependencies',
                                          index: {
                                            $eval: 'return $getItemIndex(\'templateData.dependencies[]\')'
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
                          $eval       : 'return !$val.templateData.dependencies.length',
                          dependencies: [
                            'templateData'
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
                            path: 'templateData.dependencies'
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              {
                type     : 'div',
                htmlClass: 'mb-3',
                items    : [
                  {
                    type : 'heading',
                    level: 5,
                    title: 'Linear Validation Props'
                  },
                  {
                    type : 'array',
                    key  : 'linearValidationProps',
                    items: [
                      {
                        type : 'row',
                        items: [
                          {
                            type : 'col',
                            xs   : 'auto',
                            items: [
                              {
                                key: 'linearValidationProps[]'
                              }
                            ]
                          },
                          {
                            type : 'col',
                            xs   : 'content',
                            items: [
                              {
                                type       : 'array-item-remove',
                                title      : '',
                                icon       : 'clear',
                                tooltip    : 'Delete',
                                preferences: {
                                  variant: 'icon'
                                }
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type : 'array-item-add',
                    path : 'linearValidationProps',
                    title: 'Add validation prop'
                  }
                ]
              },
              {
                key      : 'optional',
                htmlClass: 'mb-3'
              },
              {
                key      : 'editable',
                htmlClass: 'mb-3'
              }
            ]
          }
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('step', layoutInfo, layoutStepJsfDefinition);
