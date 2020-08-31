import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                       from '../../../layout';
import { EditorInterfaceSchemaFactory } from '../../../editor/helpers/editor-factory/editor-interface-schema-factory';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { CodeEditorKeyIconType }        from '../../../editor/helpers/editor-factory/layout/code-editor-key';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type             : 'anchor',
  title            : 'Link',
  category         : 'Text',
  icon             : 'layout-icons/anchor.svg',
  defaultDefinition: {
    type : 'anchor',
    title: 'My link',
    href : 'https://'
  }
};

export class JsfLayoutAnchor extends JsfAbstractSpecialLayout<'anchor'> {

  title: string;

  titleTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  href: string;

  hrefTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  constructor(data: JsfLayoutAnchor) {
    super();
    Object.assign(this, data);
  }
}

export const layoutAnchorJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      title            : {
        type : 'string',
        title: 'Title'
      },
      titleTemplateData: {
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
      href             : {
        type : 'string',
        title: 'Href'
      },
      hrefTemplateData : {
        type      : 'object',
        title     : 'Href template data',
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
        ...EditorInterfaceLayoutFactory.createPanel('Anchor', [
          {
            type : 'div',
            items: [
              {
                key: 'title'
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Title template data',
                    level: 5
                  },
                  {
                    key: 'titleTemplateData.$eval'
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
                        key  : 'titleTemplateData.dependencies',
                        items: [
                          {
                            type : 'row',
                            items: [
                              {
                                type : 'col',
                                xs   : 'auto',
                                items: [
                                  {
                                    key: 'titleTemplateData.dependencies[]'
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
                                          path : 'titleTemplateData.dependencies',
                                          index: {
                                            $eval: 'return $getItemIndex(\'titleTemplateData.dependencies[]\')'
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
                          $eval       : 'return !$val.titleTemplateData.dependencies.length',
                          dependencies: [
                            'titleTemplateData'
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
                            path: 'titleTemplateData.dependencies'
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              {
                key: 'href'
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Href template data',
                    level: 5
                  },
                  {
                    key: 'hrefTemplateData.$eval'
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
                        key  : 'hrefTemplateData.dependencies',
                        items: [
                          {
                            type : 'row',
                            items: [
                              {
                                type : 'col',
                                xs   : 'auto',
                                items: [
                                  {
                                    key: 'hrefTemplateData.dependencies[]'
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
                                          path : 'hrefTemplateData.dependencies',
                                          index: {
                                            $eval: 'return $getItemIndex(\'hrefTemplateData.dependencies[]\')'
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
                          $eval       : 'return !$val.hrefTemplateData.dependencies.length',
                          dependencies: [
                            'hrefTemplateData'
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
                            path: 'hrefTemplateData.dependencies'
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

JsfRegister.layout('anchor', layoutInfo, layoutAnchorJsfDefinition);
