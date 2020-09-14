import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'chartjs',
  title       : 'Chart',
  category    : 'Layout',
  icon        : 'layout-icons/chartjs.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutChartJS extends JsfAbstractSpecialLayout<'chartjs'> {

  width?: string;

  height?: string;

  /**
   * ChartJS config object.
   */
  config: {
            $eval: string,
            dependencies: string[]
          } | any;

  constructor(data: JsfLayoutChartJS) {
    super();
    Object.assign(this, data);
  }
}

export const layoutChartJSJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      width : {
        type : 'string',
        title: 'Width'
      },
      height: {
        type : 'string',
        title: 'Height'
      },
      config: {
        type      : 'object',
        title     : 'Configuration',
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
        ...EditorInterfaceLayoutFactory.createPanel('ChartJS', [
          {
            type : 'div',
            items: [
              {
                key: 'width'
              },
              {
                key: 'height'
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Configuration',
                    level: 5
                  },
                  {
                    key: 'config.$eval'
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
                        key  : 'config.dependencies',
                        items: [
                          {
                            type : 'row',
                            items: [
                              {
                                type : 'col',
                                xs   : 'auto',
                                items: [
                                  {
                                    key: 'config.dependencies[]'
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
                                          path : 'config.dependencies',
                                          index: {
                                            $eval: 'return $getItemIndex(\'config.dependencies[]\')'
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
                          $eval       : 'return !$val.config.dependencies.length',
                          dependencies: [
                            'config'
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
                            path: 'config.dependencies'
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

JsfRegister.layout('chartjs', layoutInfo, layoutChartJSJsfDefinition);
