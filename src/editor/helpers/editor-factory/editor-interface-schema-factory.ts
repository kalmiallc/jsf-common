import { evalProperty, evalPropertyWithDependencies, evalPropertyWithDependenciesAndLayoutDependencies } from './schema/eval';
import { dynamicSwitchableProperty }                                                                     from './schema/dynamic-switchable-property';
import { editorPropName }                                                                                from './editor-interface-utils';

export abstract class EditorInterfaceSchemaFactory {

  /**
   * Eval property generators.
   */
  static createEvalProperty                                      = evalProperty;
  static createEvalPropertyWithDependencies                      = evalPropertyWithDependencies;
  static createEvalPropertyWithDependenciesAndLayoutDependencies = evalPropertyWithDependenciesAndLayoutDependencies;

  /**
   * Dynamic prop generators.
   */
  static createDynamicSwitchableProperty = dynamicSwitchableProperty;

  /**
   * Compound generators.
   */
  static createJsfValueOptionsProperty = (basePath: string, propName: string, propType: 'dynamic' | 'any', keyExtraSchemaProperties?: any) => {
    return EditorInterfaceSchemaFactory.createDynamicSwitchableProperty(basePath, propName, [
      {
        typeKey       : 'key',
        typeName      : 'Key',
        propDefinition: {
          type: 'string'
        }
      },
      {
        typeKey       : 'const',
        typeName      : 'Constant',
        propDefinition: propType === 'any'
          ? {
            type      : 'object',
            properties: {},
            handler   : {
              type: 'any'
            }
          }
          : {
            type: '@@PROP_TYPE'
          }
      },
      {
        typeKey       : 'eval',
        typeName      : 'Eval',
        propDefinition: {
          type      : 'object',
          properties: {
            ...EditorInterfaceSchemaFactory.createEvalProperty()
          }
        }
      },
      {
        typeKey       : 'paste',
        typeName      : 'Paste',
        propDefinition: {
          type: 'string'
        }
      }
    ], keyExtraSchemaProperties);
  };

  static createOnClickProperty = (basePath: string, propName: string) => {
    const propFullPath       = `${ basePath ? basePath + '.' : '' }${ propName }`;
    const editorPropFullPath = `${ basePath ? basePath + '.' : '' }${ propName }[].${ editorPropName(propName) }`;

    return {
      [propName]: {
        type : 'array',
        items: {
          type      : 'object',
          properties: {
            // Type switcher
            [editorPropName(propName)]: {
              type    : 'string',
              required: true,
              default : '$eval',
              handler : {
                type  : 'common/dropdown',
                values: {
                  $eval: `return [
                    { label: 'Run eval', value: '$eval' },
                    { label: 'Abort', value: 'abort' },
                    { label: 'Emit event', value: 'emit' },
                    { label: 'Set value', value: 'setValue' },
                    { label: 'Patch value', value: 'patchValue' },
                    ... ($isMode('full') ? [{ label: 'Validate', value: 'validate' }] : []),
                    ... ($isMode('full') ? [{ label: 'Submit', value: 'submit' }] : []),
                    { label: 'Add item to array', value: 'arrayItemAdd' },
                    { label: 'Remove item from array', value: 'arrayItemRemove' },
                    { label: 'Navigate to', value: 'navigateTo' },
                    ... ($isMode('full') ? [{ label: 'DFF action', value: 'dff' }] : []),
                    { label: 'Show dialog', value: 'showDialog' },
                    { label: 'Hide dialog', value: 'hideDialog' },
                    ... ($isMode('full') ? [{ label: 'Open form dialog', value: 'openFormDialog' }] : []),
                    ... ($isMode('full') ? [{ label: 'Close form dialog', value: 'closeFormDialog' }] : []),
                    ... ($isMode('full') ? [{ label: 'Show loading indicator', value: 'showLoadingIndicator' }] : []),
                    ... ($isMode('full') ? [{ label: 'Hide loading indicator', value: 'hideLoadingIndicator' }] : []),
                    { label: 'Stepper next', value: 'stepperNext' },
                    { label: 'Stepper previous', value: 'stepperPrevious' },
                    { label: 'Clipboard', value: 'clipboard' },
                    { label: 'Show notification', value: 'showNotification' },
                    ... ($isMode('full') ? [{ label: 'Run service action', value: 'runServiceAction' }] : []),
                    { label: 'Data source reload', value: 'dataSourceReload' },
                  ]`
                }
              }
            },

            // Condition (always available)
            condition: {
              type      : 'object',
              properties: {
                ...EditorInterfaceSchemaFactory.createEvalProperty()
              }
            },

            // Abort
            abort: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'abort'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                ...EditorInterfaceSchemaFactory.createEvalProperty()
              }
            },

            // Eval
            ...{
              $eval: {
                ...EditorInterfaceSchemaFactory.createEvalProperty().$eval,
                enabledIf: {
                  $eval       : `return $getPropValue('${ editorPropFullPath }') === '$eval'`,
                  dependencies: [editorPropFullPath]
                }
              }
            },

            // Emit
            emit: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'emit'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                onLinked: {
                  type : 'boolean',
                  title: 'Run this action on linked form'
                },
                event   : {
                  type: 'string'
                },
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].emit`, 'value', 'any')
              }
            },

            // Set value
            setValue: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'setValue'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                onLinked     : {
                  type : 'boolean',
                  title: 'Run this action on linked form'
                },
                path         : {
                  type       : 'string',
                  description: 'Optional. If not provided, the value will be set on root.'
                },
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].setValue`, 'value', 'any'),
                noResolve    : {
                  type : 'boolean',
                  title: 'No resolve'
                },
                noValueChange: {
                  type : 'boolean',
                  title: 'No value change'
                }
              }
            },

            // Set value
            patchValue: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'patchValue'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                onLinked     : {
                  type : 'boolean',
                  title: 'Run this action on linked form'
                },
                path         : {
                  type       : 'string',
                  description: 'Optional. If not provided, the value will be set on root.'
                },
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].patchValue`, 'value', 'any'),
                noResolve    : {
                  type : 'boolean',
                  title: 'No resolve'
                },
                noValueChange: {
                  type : 'boolean',
                  title: 'No value change'
                }
              }
            },

            // Validate
            validate: {
              type     : 'boolean',
              title    : 'Validate',
              enabledIf: {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'validate'`,
                dependencies: [editorPropFullPath]
              },
              const    : true
            },

            // Submit
            ...EditorInterfaceSchemaFactory.createDynamicSwitchableProperty(`${ propFullPath }[]`, 'submit', [
              {
                typeName      : 'Basic',
                typeKey       : 'basic',
                propDefinition: {
                  type     : 'boolean',
                  title    : 'Submit',
                  const    : true,
                  enabledIf: {
                    $eval       : `return $getPropValue('${ editorPropFullPath }') === 'submit'`,
                    dependencies: [editorPropFullPath]
                  }
                }
              },
              {
                typeName      : 'Advanced',
                typeKey       : 'advanced',
                propDefinition: {
                  type      : 'object',
                  enabledIf : {
                    $eval       : `return $getPropValue('${ editorPropFullPath }') === 'submit'`,
                    dependencies: [editorPropFullPath]
                  },
                  properties: {
                    onLinked       : {
                      type : 'boolean',
                      title: 'Run this action on linked form'
                    },
                    createRevision : {
                      type : 'boolean',
                      title: 'Create revision'
                    },
                    createFork     : {
                      type : 'boolean',
                      title: 'Create fork'
                    },
                    mapResponseData: {
                      type      : 'object',
                      properties: {
                        ...EditorInterfaceSchemaFactory.createEvalProperty()
                      }
                    }
                  }
                }
              }
            ]),

            // Array item add
            arrayItemAdd: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'arrayItemAdd'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                onLinked: {
                  type : 'boolean',
                  title: 'Run this action on linked form'
                },
                path    : {
                  type: 'string'
                },
                mode    : {
                  type   : 'string',
                  handler: {
                    type  : 'common/dropdown',
                    values: [
                      { label: 'Set', value: 'set' },
                      { label: 'Eval', value: 'eval' }
                    ]
                  },
                  default: 'set'
                },
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].arrayItemAdd`, 'value', 'any')
              }
            },

            // Array item add
            arrayItemRemove: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'arrayItemRemove'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                onLinked: {
                  type : 'boolean',
                  title: 'Run this action on linked form'
                },
                path    : {
                  type: 'string'
                },
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].arrayItemRemove`, 'index', 'any')
              }
            },

            // Navigate to
            navigateTo: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'navigateTo'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                reload             : {
                  type : 'boolean',
                  title: 'Reload page'
                },
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].navigateTo`, 'path', 'any'),
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].navigateTo`, 'query', 'any'),
                queryParamsHandling: {
                  type   : 'string',
                  handler: {
                    type  : 'common/dropdown',
                    values: [
                      { label: 'Merge', value: 'merge' },
                      { label: 'Preserve', value: 'preserve' }
                    ]
                  }
                },
                relative           : {
                  type : 'boolean',
                  title: 'Relative to current page'
                },
                openInNewWindow    : {
                  type : 'boolean',
                  title: 'Open in new window'
                },
                transferFormValue  : {
                  type      : 'object',
                  properties: {
                    path: {
                      type: 'string'
                    },
                    ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].navigateTo.transferFormValue`, 'value', 'any')
                  }
                }
              }
            },

            // DFF
            dff: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'dff'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                onLinked: {
                  type : 'boolean',
                  title: 'Run this action on linked form'
                },
                action  : {
                  type   : 'string',
                  handler: {
                    type  : 'common/dropdown',
                    values: [
                      { label: 'Load', value: 'load' },
                      { label: 'Save', value: 'save' },
                      { label: 'Delete', value: 'delete' },
                      { label: 'Retry', value: 'retry' },
                      { label: 'Run custom event', value: 'runCustomEvent' },
                      { label: 'Run virtual event', value: 'runVirtualEvent' }
                    ]
                  }
                },
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].dff`, 'value', 'any'),

                mapResponseData: {
                  type      : 'object',
                  properties: {
                    ...EditorInterfaceSchemaFactory.createEvalProperty()
                  }
                }
              }
            },

            // Show dialog
            showDialog: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'showDialog'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                key: {
                  type: 'string'
                },
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].showDialog`, 'data', 'any')
              }
            },

            // Hide dialog
            hideDialog: {
              type     : 'boolean',
              enabledIf: {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'hideDialog'`,
                dependencies: [editorPropFullPath]
              },
              title    : 'Hide dialog',
              const    : true
            },

            // Open form dialog
            openFormDialog: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'openFormDialog'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].openFormDialog`, 'dffKey', 'any'),
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].openFormDialog`, 'documentId', 'any'),
                transferFormValue: {
                  type      : 'object',
                  properties: {
                    path: {
                      type: 'string'
                    },
                    ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].openFormDialog.transferFormValue`, 'value', 'any')
                  }
                },
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].openFormDialog`, 'abortOnDismiss', 'any'),
                proxy            : {
                  type : 'boolean',
                  title: 'Proxy'
                },
                mapResponseData  : {
                  type      : 'object',
                  properties: {
                    ...EditorInterfaceSchemaFactory.createEvalProperty()
                  }
                }
              }
            },

            // Close form dialog
            ...EditorInterfaceSchemaFactory.createDynamicSwitchableProperty(`${ propFullPath }[]`, 'closeFormDialog', [
              {
                typeName      : 'Basic',
                typeKey       : 'basic',
                propDefinition: {
                  type     : 'boolean',
                  title    : 'Close form dialog',
                  const    : true,
                  enabledIf: {
                    $eval       : `return $getPropValue('${ editorPropFullPath }') === 'closeFormDialog'`,
                    dependencies: [editorPropFullPath]
                  }
                }
              },
              {
                typeName      : 'Advanced',
                typeKey       : 'advanced',
                propDefinition: {
                  type      : 'object',
                  enabledIf : {
                    $eval       : `return $getPropValue('${ editorPropFullPath }') === 'closeFormDialog'`,
                    dependencies: [editorPropFullPath]
                  },
                  properties: {
                    dismiss: {
                      type : 'boolean',
                      title: 'Dismiss'
                    }
                  }
                }
              }
            ]),

            // Show loading indicator
            showLoadingIndicator: {
              type     : 'boolean',
              title    : 'Show loading indicator',
              const    : true,
              enabledIf: {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'showLoadingIndicator'`,
                dependencies: [editorPropFullPath]
              }
            },

            // Hide loading indicator
            hideLoadingIndicator: {
              type     : 'boolean',
              title    : 'Hide loading indicator',
              const    : true,
              enabledIf: {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'hideLoadingIndicator'`,
                dependencies: [editorPropFullPath]
              }
            },

            // Stepper next
            stepperNext: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'stepperNext'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                id: {
                  type: 'string'
                }
              }
            },

            // Stepper next
            stepperPrevious: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'stepperPrevious'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                id: {
                  type: 'string'
                }
              }
            },

            // Clipboard
            clipboard: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'clipboard'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                clear: {
                  type   : 'array',
                  handler: {
                    type: 'common/chip-list'
                  },
                  items  : {
                    type: 'string'
                  }
                },
                copy : {
                  type      : 'object',
                  properties: {
                    ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].clipboard.copy`, 'key', 'any'),
                    ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].clipboard.copy`, 'value', 'any')
                  }
                }
              }
            },

            // Show notification
            showNotification: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'showNotification'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].showNotification`, 'message', 'any'),
                level: {
                  type   : 'string',
                  handler: {
                    type  : 'common/dropdown',
                    values: [
                      { label: 'Info', value: 'info' },
                      { label: 'Success', value: 'success' },
                      { label: 'Warn', value: 'warn' },
                      { label: 'Error', value: 'error' }
                    ]
                  },
                  default: 'info'
                }
              }
            },

            // Run service action
            runServiceAction: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'runServiceAction'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                onLinked: {
                  type : 'boolean',
                  title: 'Run this action on linked form'
                },
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].runServiceAction`, 'service', 'any'),
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].runServiceAction`, 'action', 'any'),
                ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty(`${ propFullPath }[].runServiceAction`, 'data', 'any')
              }
            },

            // Run service action
            dataSourceReload: {
              type      : 'object',
              enabledIf : {
                $eval       : `return $getPropValue('${ editorPropFullPath }') === 'dataSourceReload'`,
                dependencies: [editorPropFullPath]
              },
              properties: {
                force        : {
                  type : 'boolean',
                  title: 'Force'
                },
                dataSourceKey: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    };
  };

  static createJsfProviderExecutorProperty = (basePath: string, propName: string) => {
    const propFullPath = `${ basePath ? basePath + '.' : '' }${ propName }`;

    return {
      [propFullPath]: {
        type      : 'object',
        properties: {
          key: {
            type: 'string'
          },

          dependencies: {
            type   : 'array',
            handler: {
              type: 'common/chip-list'
            },
            items  : {
              type: 'string'
            }
          },

          mode: {
            type   : 'string',
            handler: {
              type  : 'common/radio',
              values: [
                { label: 'Set', value: 'set' },
                { label: 'Patch', value: 'patch' }
              ]
            }
          },

          hooks: {
            type      : 'object',
            properties: {
              onIdle   : {
                type      : 'object',
                properties: {
                  ...EditorInterfaceSchemaFactory.createEvalProperty()
                }
              },
              onPending: {
                type      : 'object',
                properties: {
                  ...EditorInterfaceSchemaFactory.createEvalProperty()
                }
              },
              onFailed : {
                type      : 'object',
                properties: {
                  ...EditorInterfaceSchemaFactory.createEvalProperty()
                }
              }
            }
          },

          debounce: {
            type : 'boolean',
            title: 'Debounce'
          },

          async: {
            type : 'boolean',
            title: 'Async'
          },

          condition: {
            type      : 'object',
            properties: {
              ...EditorInterfaceSchemaFactory.createEvalProperty()
            }
          },

          providerRequestData: {
            type      : 'object',
            properties: {
              ...EditorInterfaceSchemaFactory.createEvalProperty()
            }
          },

          mapResponseData: {
            type      : 'object',
            properties: {
              ...EditorInterfaceSchemaFactory.createEvalProperty()
            }
          },

          customTriggers: {
            type : 'array',
            items: {
              type      : 'object',
              properties: {
                type    : {
                  type   : 'string',
                  handler: {
                    type  : 'common/radio',
                    values: [
                      { label: 'Interval', value: 'interval' }
                    ]
                  },
                  default: 'interval'
                },
                interval: {
                  type     : 'number',
                  enabledIf: {
                    $eval       : `return $getPropValue('${ propFullPath }.customTriggers[].type') === 'interval'`,
                    dependencies: [`${ propFullPath }.customTriggers[].type`]
                  }
                }
              }
            }
          }
        }
      }
    };
  };
}

