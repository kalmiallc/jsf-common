import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractPropLayout,
  jsfAbstractPropLayoutJsfDefinitionLayoutItems,
  jsfAbstractPropLayoutJsfDefinitionSchemaProperties,
  JsfUnknownLayout
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'table',
  title       : 'Table',
  category    : 'List',
  icon        : 'layout-icons/table.svg',
  formControl : {
    enabled: true
  },
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutPropTable extends JsfAbstractPropLayout {
  type: 'table';

  headers: JsfUnknownLayout[];

  items: JsfUnknownLayout[];

  preferences?: JsfLayoutPropTablePreferences;

  constructor(data: JsfLayoutPropTable) {
    super();
    Object.assign(this, data);
  }
}


export interface JsfLayoutPropTablePreferences {
  /**
   * Breakpoints for controlling column widths.
   */
  columnWidthBreakpoints: {
    xs?: { [headerLayoutId: string]: number },
    sm?: { [headerLayoutId: string]: number },
    md?: { [headerLayoutId: string]: number },
    lg?: { [headerLayoutId: string]: number },
    xl?: { [headerLayoutId: string]: number },
  };

}

export const layoutTableJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropLayoutJsfDefinitionSchemaProperties,

      preferences : {
        type      : 'object',
        handler   : {
          type: 'any'
        },
        properties: {
          columnWidthBreakpoints: {
            type         : 'object',
            handler      : {
              type: 'any'
            },
            properties   : {},
            onValueChange: {
              updateDependencyValue: [
                {
                  mode : 'set',
                  key  : 'preferences',
                  value: {
                    $eval: '\n                  return $val._properties;\n                '
                  }
                }
              ]
            }
          }
        }
      },
      _preferences: {
        type      : 'object',
        properties: {
          columnWidthBreakpoints: {
            type      : 'object',
            properties: {
              xs: {
                type         : 'array',
                items        : {
                  type      : 'object',
                  properties: {
                    key  : { type: 'string' },
                    value: { type: 'number' }
                  }
                },
                onValueChange: {
                  updateDependencyValue: {
                    mode : 'set',
                    key  : 'preferences.columnWidthBreakpoints.xs',
                    value: {
                      $eval: `
                    console.log("hello world!", $val._preferences)
                    const prefs = {};
                    for (const item of $val._preferences.columnWidthBreakpoints.xs) {
                      prefs[item.key] = value;
                    }
                    return prefs;
                  `
                    }
                  }
                }
              },
              sm: {
                type         : 'array',
                items        : {
                  type      : 'object',
                  properties: {
                    key  : { type: 'string' },
                    value: { type: 'number' }
                  }
                },
                onValueChange: {
                  updateDependencyValue: {
                    mode : 'set',
                    key  : 'preferences.columnWidthBreakpoints.sm',
                    value: {
                      $eval: `
                    const prefs = {};
                    for (const item of $val._preferences.columnWidthBreakpoints.sm) {
                      prefs[item.key] = value;
                    }
                    return prefs;
                  `
                    }
                  }
                }
              },
              md: {
                type         : 'array',
                items        : {
                  type      : 'object',
                  properties: {
                    key  : { type: 'string' },
                    value: { type: 'number' }
                  }
                },
                onValueChange: {
                  updateDependencyValue: {
                    mode : 'set',
                    key  : 'preferences.columnWidthBreakpoints.md',
                    value: {
                      $eval: `
                    const prefs = {};
                    for (const item of $val._preferences.columnWidthBreakpoints.md) {
                      prefs[item.key] = value;
                    }
                    return prefs;
                  `
                    }
                  }
                }
              },
              lg: {
                type         : 'array',
                items        : {
                  type      : 'object',
                  properties: {
                    key  : { type: 'string' },
                    value: { type: 'number' }
                  }
                },
                onValueChange: {
                  updateDependencyValue: {
                    mode : 'set',
                    key  : 'preferences.columnWidthBreakpoints.lg',
                    value: {
                      $eval: `
                    const prefs = {};
                    for (const item of $val._preferences.columnWidthBreakpoints.lg) {
                      prefs[item.key] = value;
                    }
                    return prefs;
                  `
                    }
                  }
                }
              },
              xl: {
                type         : 'array',
                items        : {
                  type      : 'object',
                  properties: {
                    key  : { type: 'string' },
                    value: { type: 'number' }
                  }
                },
                onValueChange: {
                  updateDependencyValue: {
                    mode : 'set',
                    key  : 'preferences.columnWidthBreakpoints.xl',
                    value: {
                      $eval: `
                    const prefs = {};
                    for (const item of $val._preferences.columnWidthBreakpoints.xl) {
                      prefs[item.key] = value;
                    }
                    return prefs;
                  `
                    }
                  }
                }
              }
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
        ...EditorInterfaceLayoutFactory.createPanel('Table', [
          {
            type : 'div',
            items: [
              {
                type : 'div',
                items: [
                  {
                    type : 'heading',
                    title: 'Preferences',
                    level: 5
                  },
                  {
                    type : 'span',
                    title: 'Breakpoints for controlling column widths'
                  },
                  {
                    type : 'div',
                    items: [
                      {
                        type : 'div',
                        items: [
                          {
                            type : 'heading',
                            title: 'Mobile (xs)',
                            level: 6
                          },
                          {
                            type : 'array',
                            key  : '_preferences.columnWidthBreakpoints.xs',
                            items: [
                              {
                                type : 'row',
                                items: [
                                  {
                                    type : 'col',
                                    xs   : 'auto',
                                    items: [
                                      {
                                        key: '_preferences.columnWidthBreakpoints.xs[].key'
                                      },
                                      {
                                        key: '_preferences.columnWidthBreakpoints.xs[].value'
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
                                              path : '_preferences.columnWidthBreakpoints.xs',
                                              index: {
                                                $eval: 'return $getItemIndex(\'_preferences.columnWidthBreakpoints.xs[]\')'
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
                              $eval       : 'return !$val._preferences.columnWidthBreakpoints.xs.length',
                              dependencies: [
                                '_preferences.columnWidthBreakpoints'
                              ]
                            },
                            items    : [
                              {
                                type     : 'span',
                                htmlClass: 'd-block py-4 text-center',
                                title    : 'No breakpoints yet'
                              }
                            ]
                          },
                          {
                            type   : 'button',
                            icon   : 'add',
                            title  : 'Add breakpoint',
                            onClick: {
                              arrayItemAdd: {
                                path: '_preferences.columnWidthBreakpoints.xs'
                              }
                            }
                          }
                        ]
                      },
                      {
                        type : 'div',
                        items: [
                          {
                            type : 'heading',
                            title: 'Small (sm)',
                            level: 6
                          },
                          {
                            type : 'array',
                            key  : '_preferences.columnWidthBreakpoints.sm',
                            items: [
                              {
                                type : 'row',
                                items: [
                                  {
                                    type : 'col',
                                    xs   : 'auto',
                                    items: [
                                      {
                                        key: '_preferences.columnWidthBreakpoints.sm[].key'
                                      },
                                      {
                                        key: '_preferences.columnWidthBreakpoints.sm[].value'
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
                                              path : '_preferences.columnWidthBreakpoints.sm',
                                              index: {
                                                $eval: 'return $getItemIndex(\'_preferences.columnWidthBreakpoints.sm[]\')'
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
                              $eval       : 'return !$val._preferences.columnWidthBreakpoints.sm.length',
                              dependencies: [
                                '_preferences.columnWidthBreakpoints'
                              ]
                            },
                            items    : [
                              {
                                type     : 'span',
                                htmlClass: 'd-block py-4 text-center',
                                title    : 'No breakpoints yet'
                              }
                            ]
                          },
                          {
                            type   : 'button',
                            icon   : 'add',
                            title  : 'Add breakpoint',
                            onClick: {
                              arrayItemAdd: {
                                path: '_preferences.columnWidthBreakpoints.sm'
                              }
                            }
                          }
                        ]
                      },
                      {
                        type : 'div',
                        items: [
                          {
                            type : 'heading',
                            title: 'Medium (md)',
                            level: 6
                          },
                          {
                            type : 'array',
                            key  : '_preferences.columnWidthBreakpoints.md',
                            items: [
                              {
                                type : 'row',
                                items: [
                                  {
                                    type : 'col',
                                    xs   : 'auto',
                                    items: [
                                      {
                                        key: '_preferences.columnWidthBreakpoints.md[].key'
                                      },
                                      {
                                        key: '_preferences.columnWidthBreakpoints.md[].value'
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
                                              path : '_preferences.columnWidthBreakpoints.md',
                                              index: {
                                                $eval: 'return $getItemIndex(\'_preferences.columnWidthBreakpoints.md[]\')'
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
                              $eval       : 'return !$val._preferences.columnWidthBreakpoints.md.length',
                              dependencies: [
                                '_preferences.columnWidthBreakpoints'
                              ]
                            },
                            items    : [
                              {
                                type     : 'span',
                                htmlClass: 'd-block py-4 text-center',
                                title    : 'No breakpoints yet'
                              }
                            ]
                          },
                          {
                            type   : 'button',
                            icon   : 'add',
                            title  : 'Add breakpoint',
                            onClick: {
                              arrayItemAdd: {
                                path: '_preferences.columnWidthBreakpoints.md'
                              }
                            }
                          }
                        ]
                      },
                      {
                        type : 'div',
                        items: [
                          {
                            type : 'heading',
                            title: 'Large (lg)',
                            level: 6
                          },
                          {
                            type : 'array',
                            key  : '_preferences.columnWidthBreakpoints.lg',
                            items: [
                              {
                                type : 'row',
                                items: [
                                  {
                                    type : 'col',
                                    xs   : 'auto',
                                    items: [
                                      {
                                        key: '_preferences.columnWidthBreakpoints.lg[].key'
                                      },
                                      {
                                        key: '_preferences.columnWidthBreakpoints.lg[].value'
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
                                              path : '_preferences.columnWidthBreakpoints.lg',
                                              index: {
                                                $eval: 'return $getItemIndex(\'_preferences.columnWidthBreakpoints.lg[]\')'
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
                              $eval       : 'return !$val._preferences.columnWidthBreakpoints.lg.length',
                              dependencies: [
                                '_preferences.columnWidthBreakpoints'
                              ]
                            },
                            items    : [
                              {
                                type     : 'span',
                                htmlClass: 'd-block py-4 text-center',
                                title    : 'No breakpoints yet'
                              }
                            ]
                          },
                          {
                            type   : 'button',
                            icon   : 'add',
                            title  : 'Add breakpoint',
                            onClick: {
                              arrayItemAdd: {
                                path: '_preferences.columnWidthBreakpoints.lg'
                              }
                            }
                          }
                        ]
                      },
                      {
                        type : 'div',
                        items: [
                          {
                            type : 'heading',
                            title: 'Very large (xl)',
                            level: 6
                          },
                          {
                            type : 'array',
                            key  : '_preferences.columnWidthBreakpoints.xl',
                            items: [
                              {
                                type : 'row',
                                items: [
                                  {
                                    type : 'col',
                                    xs   : 'auto',
                                    items: [
                                      {
                                        key: '_preferences.columnWidthBreakpoints.xl[].key'
                                      },
                                      {
                                        key: '_preferences.columnWidthBreakpoints.xl[].value'
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
                                              path : '_preferences.columnWidthBreakpoints.xl',
                                              index: {
                                                $eval: 'return $getItemIndex(\'_preferences.columnWidthBreakpoints.xl[]\')'
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
                              $eval       : 'return !$val._preferences.columnWidthBreakpoints.xl.length',
                              dependencies: [
                                '_preferences.columnWidthBreakpoints'
                              ]
                            },
                            items    : [
                              {
                                type     : 'span',
                                htmlClass: 'd-block py-4 text-center',
                                title    : 'No breakpoints yet'
                              }
                            ]
                          },
                          {
                            type   : 'button',
                            icon   : 'add',
                            title  : 'Add breakpoint',
                            onClick: {
                              arrayItemAdd: {
                                path: '_preferences.columnWidthBreakpoints.xl'
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

        ...jsfAbstractPropLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('table', layoutInfo, layoutTableJsfDefinition);
