import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type    : 'order-summary-line-item',
  title   : 'Order summery line item',
  category: 'Layout',
  icon    : 'layout-icons/order-summary.svg'
};

export class JsfLayoutOrderSummaryLineItem extends JsfAbstractSpecialLayout<'order-summary-line-item'> {

  label: string;

  labelTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  value: string;

  valueTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  constructor(data: JsfLayoutOrderSummaryLineItem) {
    super();
    Object.assign(this, data);
  }
}

export const layoutOrderSummaryLineItemJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      label            : {
        type : 'string',
        title: 'Label'
      },
      labelTemplateData: {
        type      : 'object',
        title     : 'Label template data',
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
      value            : {
        type : 'string',
        title: 'Value'
      },
      valueTemplateData: {
        type      : 'object',
        title     : 'Value template data',
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
        ...EditorInterfaceLayoutFactory.createPanel('Order Summary Line Item', [
          {
            type : 'div',
            items: [
              {
                key: 'label'
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Label template data',
                    level: 5
                  },
                  {
                    key: 'labelTemplateData.$eval'
                  },
                  {
                    type : 'div',
                    items: [
                      {
                        type : 'heading',
                        title: 'Label template dependencies',
                        level: 6
                      },
                      {
                        type : 'array',
                        key  : 'labelTemplateData.dependencies',
                        items: [
                          {
                            type : 'row',
                            items: [
                              {
                                type : 'col',
                                xs   : 'auto',
                                items: [
                                  {
                                    key: 'labelTemplateData.dependencies[]'
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
                                          path : 'labelTemplateData.dependencies',
                                          index: {
                                            $eval: 'return $getItemIndex(\'labelTemplateData.dependencies[]\')'
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
                          $eval       : 'return !$val.labelTemplateData.dependencies.length',
                          dependencies: [
                            'labelTemplateData'
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
                            path: 'labelTemplateData.dependencies'
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              {
                key: 'value'
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Value template data',
                    level: 5
                  },
                  {
                    key: 'valueTemplateData.$eval'
                  },
                  {
                    type : 'div',
                    items: [
                      {
                        type : 'heading',
                        title: 'Value template dependencies',
                        level: 6
                      },
                      {
                        type : 'array',
                        key  : 'valueTemplateData.dependencies',
                        items: [
                          {
                            type : 'row',
                            items: [
                              {
                                type : 'col',
                                xs   : 'auto',
                                items: [
                                  {
                                    key: 'valueTemplateData.dependencies[]'
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
                                          path : 'valueTemplateData.dependencies',
                                          index: {
                                            $eval: 'return $getItemIndex(\'valueTemplateData.dependencies[]\')'
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
                          $eval       : 'return !$val.valueTemplateData.dependencies.length',
                          dependencies: [
                            'valueTemplateData'
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
                            path: 'valueTemplateData.dependencies'
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

JsfRegister.layout('order-summary-line-item', layoutInfo, layoutOrderSummaryLineItemJsfDefinition);
