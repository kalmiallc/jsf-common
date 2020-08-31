import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type             : 'html',
  title            : 'Html',
  category         : 'Text',
  icon             : 'layout-icons/html.svg',
  defaultDefinition: {
    type: 'html',
    html: '<span>Custom HTML here</span>'
  }
};

export class JsfLayoutHtml extends JsfAbstractSpecialLayout<'html'> {

  html: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutHtml) {
    super();
    Object.assign(this, data);
  }
}

export const layoutHtmlJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      html        : {
        type : 'string',
        title: 'Html'
      },
      templateData: {
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
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('HTML', [
          {
            type : 'div',
            items: [
              {
                key: 'html'
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Template data',
                    level: 5
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
                                          path : 'templateData.dependencies',
                                          index: {
                                            $eval: 'return $getItemIndex(\'templateData.dependencies[]\')'
                                          }
                                        }
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                key: 'templateData.dependencies[]'
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
                        type           : 'row',
                        horizontalAlign: 'center',
                        htmlClass      : 'mt-2',
                        items          : [
                          {
                            type   : 'button',
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

JsfRegister.layout('html', layoutInfo, layoutHtmlJsfDefinition);

