import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type             : 'button',
  title            : 'Button',
  category         : 'Buttons & Indicators',
  icon             : 'layout-icons/button.svg',
  defaultDefinition: {
    type : 'button',
    title: 'Button'
  }
};

export class JsfLayoutButton extends JsfAbstractSpecialLayout<'button'> {

  title?: string;

  titleTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  icon?: string;

  /**
   * @deprecated Use onClick `submit` option instead.
   */
  submit?: boolean;

  scrollToTop?: boolean; // TODO move this under click event options

  disabled?: {
               $eval: string;
               dependencies: string[];
             } | boolean;

  preferences?: JsfLayoutButtonPreferences;

  constructor(data: JsfLayoutButton) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutButtonPreferences {
  /**
   * Color of the selection highlight.
   * Default is 'none'.
   */
  color?: 'none' | 'primary' | 'accent';
  /**
   * Button variant.
   * Default is 'basic'.
   */
  variant: 'basic' | 'raised' | 'flat' | 'stroked' | 'icon' | 'fab' | 'mini-fab';
  /**
   * Button size.
   */
  size: 'normal' | 'large' | 'small';
  /**
   * Whether ripples are disabled.
   * Default is False.
   */
  disableRipple?: boolean;
}

export const layoutButtonJsfDefinition = {
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
      icon             : {
        type : 'string',
        title: 'Icon'
      },
      submit           : {
        type : 'boolean',
        title: 'Submit'
      },
      scrollToTop      : {
        type : 'boolean',
        title: 'Scroll to top'
      },
      disabled         : {
        type      : 'object',
        title     : 'Disabled',
        properties: {
          $eval       : {
            type : 'string',
            title: 'Eval'
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
      preferences      : {
        type      : 'object',
        title     : 'Preferences',
        properties: {
          color        : {
            type   : 'string',
            title  : 'color',
            handler: {
              type  : 'common/dropdown',
              values: [
                {
                  value: 'none',
                  label: 'No color'
                },
                {
                  value: 'primary',
                  label: 'Primary'
                },
                {
                  value: 'accent',
                  label: 'Accent'
                }
              ]
            }
          },
          variant      : {
            type   : 'string',
            title  : 'color',
            handler: {
              type  : 'common/dropdown',
              values: [
                {
                  value: 'basic',
                  label: 'Basic'
                },
                {
                  value: 'raised',
                  label: 'Raised'
                },
                {
                  value: 'flat',
                  label: 'Flat'
                },
                {
                  value: 'stroke',
                  label: 'Stroked'
                },
                {
                  value: 'icon',
                  label: 'Icon'
                },
                {
                  value: 'fab',
                  label: 'Fab'
                },
                {
                  value: 'mini-fab',
                  label: 'Mini fab'
                }
              ]
            }
          },
          size         : {
            type   : 'string',
            title  : 'Size',
            handler: {
              type  : 'common/dropdown',
              values: [
                {
                  value: 'large',
                  label: 'Large'
                },
                {
                  value: 'normal',
                  label: 'Normal'
                },
                {
                  value: 'small',
                  label: 'Small'
                }
              ]
            }
          },
          disableRipple: {
            type : 'boolean',
            title: 'Disable ripple'
          }
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Button', [
          {
            type : 'div',
            items: [
              {
                key: 'title'
              },
              {
                key: 'icon'
              },
              {
                key: 'submit'
              },
              {
                key: 'scrollToTop'
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Disabled',
                    level: 5
                  },
                  {
                    key: 'disabled.$eval'
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
                        key  : 'disabled.dependencies',
                        items: [
                          {
                            type : 'row',
                            items: [
                              {
                                type : 'col',
                                xs   : 'auto',
                                items: [
                                  {
                                    key: 'disabled.dependencies[]'
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
                                          path : 'disabled.dependencies',
                                          index: {
                                            $eval: 'return $getItemIndex(\'disabled.dependencies[]\')'
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
                          $eval       : 'return !$val.disabled.dependencies.length',
                          dependencies: [
                            'disabled'
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
                            path: 'disabled.dependencies'
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Preferences',
                    level: 5
                  },
                  {
                    key: 'preferences.color'
                  },
                  {
                    key: 'preferences.variant'
                  },
                  {
                    key: 'preferences.size'
                  },
                  {
                    key: 'preferences.disableRipple'
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

JsfRegister.layout('button', layoutInfo, layoutButtonJsfDefinition);
