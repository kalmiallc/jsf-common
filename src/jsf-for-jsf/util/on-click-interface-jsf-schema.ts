/**
 * Usage  --> onClick: ONCLICK_JSF_SCHEMA
 */

export const ONCLICK_JSF_SCHEMA = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      condition: {
        type: 'object',
        properties: {
          $eval: {
            type: 'string',
            handler: {
              type: 'common/code-editor',
              options: {
                language: 'javascript'
              }
            }
          }
        }
      },
      abort: {
        type: 'object',
        properties: {
          $eval: {
            type: 'string',
            handler: {
              type: 'common/code-editor',
              options: {
                language: 'javascript'
              }
            }
          }
        }
      },
      $eval: {
        type: 'string',
        handler: {
          type: 'common/code-editor',
          options: {
            language: 'javascript'
          }
        }
      },
      emit: {
        type: 'object',
        properties: {
          onLinked: {
            type: 'boolean',
            title: 'Run this action on linked form'
          },
          event: {
            type: 'string',
            title: 'Event name',
            description: 'Event name so you know what event is from where.'
          },
          value: {
            type: 'string',
            title: 'Value',
            description: 'Value to add to event.'
          }
        }
      },
      setValue: {
        type: 'object',
        properties: {
          onLinked: {
            type: 'boolean',
            title: 'Run this action on linked form'
          },
          path: {
            type: 'string',
            title: 'Path',
            description: 'If not set it sets to root.'
          },
          value: {
            type: 'string',
            title: 'Value',
            description: 'Value to set.'
          },
          noResolve: {
            type: 'boolean',
            title: 'No resolve'
          },
          noValueChange: {
            type: 'boolean',
            title: 'No value change'
          }
        }
      },
      patchValue: {
        type: 'object',
        properties: {
          onLinked: {
            type: 'boolean',
            title: 'Run this action on linked form'
          },
          path: {
            type: 'string',
            title: 'Path',
            description: 'If not set it sets to root.'
          },
          value: {
            type: 'string',
            title: 'Value',
            description: 'Value to patch.'
          },
          noResolve: {
            type: 'boolean',
            title: 'No resolve'
          },
          noValueChange: {
            type: 'boolean',
            title: 'No value change'
          }
        }
      },
      validate: {
        type: 'boolean',
        title: 'Validate form',
        tooltip: 'This will trigger a full form validation and will then display errors in the entire form. If the form is invalid this will abort the event chain! This does not work with header-type forms in DFF.'
      },
      submit: {
        type: 'boolean',
        title: 'Submit'
      },
      submitToLinked: {
        type: 'boolean',
        title: 'Submit to linked'
      },
      arrayItemAdd: {
        type: 'object',
        properties: {
          onLinked: {
            type: 'boolean',
            title: 'Run this action on linked form'
          },
          path: {
            type: 'string',
            title: 'Path'
          },
          mode: {
            type: 'string',
            handler: {
              type: 'common/button-toggle',
              values: [
                { label: 'set', value: 'set' },
                { label: 'patch', value: 'patch' },
              ]
            },
            default: 'set'
          },
          value: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          }
        }
      },
      arrayItemRemove: {
        type: 'object',
        properties: {
          onLinked: {
            type: 'boolean',
            title: 'Run this action on linked form'
          },
          path: {
            type: 'string',
            title: 'Path'
          },
          index: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          }
        }
      },
      navigateTo: {
        type: 'object',
        properties: {
          reload: {
            type: 'boolean',
            title: 'Page reload'
          },
          path: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          },
          query: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          },
          queryParamsHandling: {
            type: 'string',
            handler: {
              type: 'common/button-toggle',
              values: [
                { label: 'merge', value: 'merge' },
                { label: 'preserve', value: 'preserve' },
              ]
            }
          },
          relative: {
            type: 'boolean',
            title: 'Path relative to the currently activated route'
          },
          openInNewWindow: {
            type: 'boolean',
            title: 'Page open in new window'
          },
          transferFormValue: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                title: 'Path'
              },
              value: {
                type: 'object',
                properties: {
                  $eval: {
                    type: 'string',
                    handler: {
                      type: 'common/code-editor',
                      options: {
                        language: 'javascript'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      dff: {
        type: 'object',
        properties: {
          onLinked: {
            type: 'boolean',
            title: 'Run this action on linked form'
          },
          action: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                { label: 'load', value: 'load' },
                { label: 'save', value: 'save' },
                { label: 'delete', value: 'delete' },
                { label: 'retry', value: 'retry' },
                { label: 'runCustomEvent', value: 'runCustomEvent' },
                { label: 'runVirtualEvent', value: 'runVirtualEvent' },
              ]
            }
          },
          value: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          },
          mapResponseData: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          }
        }
      },
      showDialog: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            title: 'DFF key'
          },
          data: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          }
        }
      },
      hideDialog: {
        type: 'boolean',
        title: 'Hide the currently open dialog'
      },
      openFormDialog: {
        type: 'object',
        properties: {
          dffKey: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          },
          documentId: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          },
          transferFormValue: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                title: 'Path'
              },
              value: {
                type: 'object',
                properties: {
                  $eval: {
                    type: 'string',
                    handler: {
                      type: 'common/code-editor',
                      options: {
                        language: 'javascript'
                      }
                    }
                  }
                }
              }
            }
          },
          abortOnDismiss: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          },
          proxy: {
            type: 'boolean',
            title: 'Form dialog displayed inside proxy document (iframe)'
          },
          mapResponseData: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          }
        }
      },
      closeFormDialog: {
        type: 'boolean',
        title: 'Close the current form if loaded in a dialog'
      },
      showLoadingIndicator: {
        type: 'boolean',
        title: 'Show a generic loading indicator'
      },
      hideLoadingIndicator: {
        type: 'boolean',
        title: 'Hide the loading indicator'
      },
      stepperNext: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            title: 'Stepper id'
          }
        }
      },
      stepperPrevious: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            title: 'Stepper id'
          }
        }
      },
      clipboard: {
        type: 'object',
        properties: {
          clear: {
            type: 'array',
            items: {
              type: 'string',
              title: 'Clipboard key to clear'
            }
          },
          copy: {
            type: 'object',
            properties: {
              key: {
                type: 'string',
                title: 'Key for clipboard'
              },
              value: {
                type: 'string',
                title: 'Value to copy'
              }
            }
          }
        }
      },
      showNotification: {
        type: 'object',
        properties: {
          message: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          },
          level: {
            type: 'object',
            properties: {
              $eval: {
                type: 'string', //EDINE MOŽNOSTI: 'info' | 'success' | 'warn' | 'error'
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              }
            }
          }
        }
      },
      runServiceAction: {
        type: 'object',
        properties: {
          onLinked: {
            type: 'boolean',
            title: 'Run action on linked form'
          },
          service: {
            type: 'string',
            title: 'Service'
          },
          action: {
            type: 'string',
            title: 'Action'
          },
          data: {
            type: 'string',
            title: 'Data'
          },
        }
      }
    }
  }
}

/**
 * Function that creates jsf layout for onClick interface.
 * @param prependPath Path of the original Jsf schema, to where the function is used. The path will be prepend to the following keys in function.
 */
export function createOnClickJsfLayout(
  prependPath: string
) {
  return {
    type: 'div',
    items: [
      {
        type: 'expansion-panel',
        key: `${prependPath}`,
        items: [
          {
            type: 'expansion-panel-header',
            items: [
              {
                type: 'div',
                htmlClass: 'd-flex justify-content-between',
                items: [
                  {
                    type: 'div',
                  },
                  {
                    type: 'array-item-remove',
                    icon: 'delete',
                    tooltip: 'Remove event',
                    preferences: {
                      variant: 'icon',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'expansion-panel-content',
            items: [
              {
                key: `${prependPath}[].submit`,
                htmlClass: 'mb-3'
              },
              {
                type: 'span',
                title: 'Condition'
              },
              {
                key: `${prependPath}[].condition.$eval`,
                htmlClass: 'mb-3'
              },
              {
                type: 'span',
                title: '$eval'
              },
              {
                key: `${prependPath}[].$eval`,
                htmlClass: 'mb-3'
              },
              {
                type: 'span',
                title: 'Abort'
              },
              {
                key: `${prependPath}[].abort.$eval`,
                htmlClass: 'mb-3'
              },
              {
                type: 'span',
                title: 'Emit'
              },
              {
                type: 'div',
                htmlClass: 'ml-3 mb-3',
                items: [
                  {
                    key: `${prependPath}[].emit.onLinked`
                  },
                  {
                    key: `${prependPath}[].emit.event`
                  },
                  {
                    key: `${prependPath}[].emit.value`
                  }
                ]
              },
              {
                type: 'span',
                title: 'Set Value'
              },
              {
                type: 'div',
                htmlClass: 'ml-3 mb-3',
                items: [
                  {
                    key: `${prependPath}[].setValue.onLinked`
                  },
                  {
                    key: `${prependPath}[].setValue.path`
                  },
                  {
                    key: `${prependPath}[].setValue.value`
                  },
                  {
                    key: `${prependPath}[].setValue.noResolve`
                  },
                  {
                    key: `${prependPath}[].setValue.noValueChange`
                  }
                ]
              },
              {
                type: 'span',
                title: 'Patch Value'
              },
              {
                type: 'div',
                htmlClass: 'ml-3 mb-3',
                items: [
                  {
                    key: `${prependPath}[].patchValue.onLinked`
                  },
                  {
                    key: `${prependPath}[].patchValue.path`
                  },
                  {
                    key: `${prependPath}[].patchValue.value`
                  },
                  {
                    key: `${prependPath}[].patchValue.noResolve`
                  },
                  {
                    key: `${prependPath}[].patchValue.noValueChange`
                  }
                ]
              },
              {
                key: `${prependPath}[].validate`,
                htmlClass: 'mb-3'
              },
              {
                key: `${prependPath}[].submitToLinked`,
                htmlClass: 'mb-3'
              },
              {
                type: 'span',
                title: 'Array Item Add'
              },
              {
                type: 'div',
                htmlClass: 'ml-3 mb-3',
                items: [
                  {
                    key: `${prependPath}[].arrayItemAdd.onLinked`
                  },
                  {
                    key: `${prependPath}[].arrayItemAdd.path`
                  },
                  {
                    key: `${prependPath}[].arrayItemAdd.mode`
                  },
                  {
                    type: 'span',
                    title: 'Value'
                  },
                  {
                    key: `${prependPath}[].arrayItemAdd.value.$eval`
                  }
                ]
              },
              {
                type: 'span',
                title: 'Array Item Remove'
              },
              {
                type: 'div',
                htmlClass: 'ml-3 mb-3',
                items: [
                  {
                    key: `${prependPath}[].arrayItemRemove.onLinked`
                  },
                  {
                    key: `${prependPath}[].arrayItemRemove.path`
                  },
                  {
                    type: 'span',
                    title: 'Index'
                  },
                  {
                    key: `${prependPath}[].arrayItemRemove.index.$eval`
                  }
                ]
              },
              {
                type: 'span',
                title: 'Navigate To'
              },
              {
                type: 'div',
                htmlClass: 'ml-3 mb-3',
                items: [
                  {
                    key: `${prependPath}[].navigateTo.reload`,
                    htmlClass: 'mb-3'
                  },
                  {
                    type: 'span',
                    title: 'Path'
                  },
                  {
                    key: `${prependPath}[].navigateTo.path.$eval`,
                    htmlClass: 'mb-3'
                  },
                  {
                    type: 'span',
                    title: 'Query'
                  },
                  {
                    key: `${prependPath}[].navigateTo.query.$eval`,
                    htmlClass: 'mb-3'
                  },
                  {
                    type: 'span',
                    title: 'How to handle parameters in a router link?'
                  },
                  {
                    key: `${prependPath}[].navigateTo.queryParamsHandling`,
                    htmlClass: 'mb-3'
                  },
                  {
                    key: `${prependPath}[].navigateTo.relative`,
                    htmlClass: 'mb-3'
                  },
                  {
                    key: `${prependPath}[].navigateTo.openInNewWindow`,
                    htmlClass: 'mb-3'
                  },
                  {
                    type: 'span',
                    title: 'Transform Form Value'
                  },
                  {
                    type: 'div',
                    htmlClass: 'ml-3 mb-3',
                    items: [
                      {
                        key: `${prependPath}[].navigateTo.transferFormValue.path`
                      },
                      {
                        type: 'span',
                        title: 'Value'
                      },
                      {
                        key: `${prependPath}[].navigateTo.transferFormValue.value.$eval`
                      }
                    ]
                  }
                ]
              },
              {
                type: 'span',
                title: 'DFF'
              },
              {
                type: 'div',
                htmlClass: 'ml-3 mb-3',
                items: [
                  {
                    key: `${prependPath}[].dff.onLinked`
                  },
                  {
                    type: 'span',
                    title: 'Action'
                  },
                  {
                    key: `${prependPath}[].dff.action`
                  },
                  {
                    type: 'span',
                    title: 'Value'
                  },
                  {
                    key: `${prependPath}[].dff.value.$eval`,
                    htmlClass: 'mb-3'
                  },
                  {
                    type: 'span',
                    title: 'Map Response Data'
                  },
                  {
                    key: `${prependPath}[].dff.mapResponseData.$eval`
                  }
                ]
              },
              {
                type: 'span',
                title: 'Show Dialog'
              },
              {
                type: 'div',
                htmlClass: 'ml-3 mb-3',
                items: [
                  {
                    key: `${prependPath}[].showDialog.key`
                  },
                  {
                    type: 'span',
                    title: 'Data'
                  },
                  {
                    key: `${prependPath}[].showDialog.data.$eval`
                  }
                ]
              },
              {
                key: `${prependPath}[].hideDialog`,
                htmlClass: 'mb-3'
              },
              {
                type: 'span',
                title: 'Open Form Dialog'
              },
              {
                type: 'div',
                htmlClass: 'ml-3 mb-3',
                items: [
                  {
                    type: 'span',
                    title: 'Dff key'
                  },
                  {
                    key: `${prependPath}[].openFormDialog.dffKey.$eval`
                  },
                  {
                    type: 'span',
                    title: 'Document ID'
                  },
                  {
                    key: `${prependPath}[].openFormDialog.documentId.$eval`
                  },
                  {
                    type: 'span',
                    title: 'Transform Form Value'
                  },
                  {
                    type: 'div',
                    htmlClass: 'ml-3 mb-3',
                    items: [
                      {
                        key: `${prependPath}[].openFormDialog.transferFormValue.path`
                      },
                      {
                        type: 'span',
                        title: 'Value'
                      },
                      {
                        key: `${prependPath}[].openFormDialog.transferFormValue.value.$eval`
                      }
                    ]
                  },
                  {
                    type: 'span',
                    title: 'Abort On Dismiss'
                  },
                  {
                    key: `${prependPath}[].openFormDialog.abortOnDismiss.$eval`,
                    htmlClass: 'mb-3'
                  },
                  {
                    key: `${prependPath}[].openFormDialog.proxy`,
                    htmlClass: 'mb-3'
                  },
                  {
                    type: 'span',
                    title: 'Map Response Data'
                  },
                  {
                    key: `${prependPath}[].openFormDialog.mapResponseData.$eval`,
                    htmlClass: 'mb-3'
                  }
                ]
              },
              {
                key: `${prependPath}[].closeFormDialog`,
                htmlClass: 'mb-3'
              },
              {
                key: `${prependPath}[].showLoadingIndicator`,
                htmlClass: 'mb-3'
              },
              {
                key: `${prependPath}[].hideLoadingIndicator`,
                htmlClass: 'mb-3'
              },
              {
                type: 'span',
                title: 'Stepper Next'
              },
              {
                key: `${prependPath}[].stepperNext.id`
              },
              {
                type: 'span',
                title: 'Stepper Previous'
              },
              {
                key: `${prependPath}[].stepperPrevious.id`
              },
              {
                type: 'span',
                title: 'Clipboard'
              },
              {
                type: 'div',
                htmlClass: 'ml-3 mb-3',
                items: [
                  {
                    type: 'span',
                    title: 'Copy'
                  },
                  {
                    key: `${prependPath}[].clipboard.copy.key`
                  },
                  {
                    key: `${prependPath}[].clipboard.copy.value`
                  },
                  {
                    type: 'span',
                    title: 'Clear clipboard'
                  },
                  {
                    type: 'array',
                    key: `${prependPath}[].clipboard.clear`,
                    items: [
                      {
                        type: 'row',
                        items: [
                          {
                            type: 'col',
                            xs: 'auto',
                            items: [
                              {
                                key: `${prependPath}[].clipboard.clear[]`
                              },
                            ]
                          },
                          {
                            type: 'col',
                            xs: 'content',
                            items: [
                              {
                                type: 'array-item-remove',
                                icon: 'delete',
                                tooltip: 'Remove clipboard key',
                                preferences: {
                                  variant: 'icon',
                                }
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'array-item-add',
                    path: `${prependPath}[].clipboard.clear`,
                    icon: 'add',
                    title: 'add',
                    tooltip: 'add key to clear',
                    preferences: {
                      variant: 'basic',
                    }
                  }
                ]
              },
              {
                type: 'span',
                title: 'Show Notification'
              },
              {
                type: 'div',
                htmlClass: 'ml-3 mb-3',
                items: [
                  {
                    type: 'span',
                    title: 'Message:'
                  },
                  {
                    key: `${prependPath}[].showNotification.message.$eval`,
                    htmlClass: 'mb-3'
                  },
                  {
                    type: 'span',
                    title: 'Notification level',
                    tooltip: 'Input should be one of the following options: info, success, warn, error.'
                  },
                  {
                    key: `${prependPath}[].showNotification.level.$eval`
                  }
                ]
              },
              {
                type: 'span',
                title: 'Run Service Action'
              },
              {
                type: 'div',
                htmlClass: 'ml-3 mb-3',
                items: [
                  {
                    key: `${prependPath}[].runServiceAction.onLinked`
                  },
                  {
                    key: `${prependPath}[].runServiceAction.service`
                  },
                  {
                    key: `${prependPath}[].runServiceAction.action`
                  },
                  {
                    key: `${prependPath}[].runServiceAction.data`
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'div',
        visibleIf: {
          $eval: `return !$getItemValue('${prependPath}').length`,
          dependencies: [prependPath]
        },
        items: [
          {
            type: 'span',
            htmlClass: 'd-block py-4 text-center',
            title: 'No events yet.'
          }
        ]
      },
      {
        type: 'div',
        // horizontalAlign: 'center',
        htmlClass: 'mt-2 text-center',
        items: [
          {
            type: 'array-item-add',
            title: 'Add event',
            icon: 'add',
            path: `${prependPath}`,
            // htmlClass: 't-3',
            preferences: {
              variant: 'flat',
              size: 'small',
            },
          },
        ],
      },
    ],
  };
}

