import { panel, panelGroup }                    from './layout/panels';
import { codeEditorKey, CodeEditorKeyIconType } from './layout/code-editor-key';
import { contentHeading, label as createLabel } from './layout/labels';
import { arrayCardListKey }                     from './layout/array-card-list-key';
import { key, keyWithItems }                    from './layout/key';
import { divider, verticalSpacer }              from './layout/layout';
import { dynamicSwitchablePropKey }             from './layout/dynamic-switchable-prop-key';
import { editorPropName }                       from './editor-interface-utils';

export abstract class EditorInterfaceLayoutFactory {

  /**
   * Creates a group for basic panels.
   */
  static createPanelGroup               = panelGroup;
  /**
   * Creates a basic panel for grouping elements together.
   */
  static createPanel                    = panel;
  /**
   * Creates a simple label.
   */
  static createLabel                    = createLabel;
  /**
   * Creates a heading useful for separating items within a panel.
   */
  static createContentHeading           = contentHeading;
  /**
   * Outputs a key with an optional label above it.
   * @param key
   * @param label
   */
  static outputKey                      = key;
  /**
   * Outputs a key with with items with an optional label above it.
   * @param key
   * @param label
   */
  static outputKeyWithItems             = keyWithItems;
  /**
   * Outputs a key with an optional label above it.
   * @param key
   * @param label
   */
  static outputDynamicSwitchablePropKey = dynamicSwitchablePropKey;
  /**
   * Outputs a key attached with a code editor handler, with a label and icon.
   */
  static outputKeyWithCodeEditor        = codeEditorKey;
  /**
   * Outputs an array key as a list of cards with an included add and remove buttons.
   */
  static outputArrayCardListKey         = arrayCardListKey;

  /**
   * Creates a divider.
   */
  static createDivider = divider;

  /**
   * Creates a div that spaces out the content inside from the top
   * @param items
   */
  static createVerticalSpacer = verticalSpacer;


  /**
   * Compound generators.
   */
  static outputJsfValueOptionsProperty = (basePath: string, propName: string, label: string) => {
    return EditorInterfaceLayoutFactory.outputDynamicSwitchablePropKey(basePath, propName, label, [
      {
        typeKey         : 'key',
        layoutDefinition: {
          type : 'div',
          items: [
            ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('key'), 'Key')
          ]
        }
      },
      {
        typeKey         : 'const',
        layoutDefinition: {
          type : 'div',
          items: [
            ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('const'), 'Constant value')
          ]
        }
      },
      {
        typeKey         : 'eval',
        layoutDefinition: {
          type : 'div',
          items: [
            ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(wrapKeyDynamic('eval.$eval'), 'Eval')
          ]
        }
      },
      {
        typeKey         : 'paste',
        layoutDefinition: {
          type : 'div',
          items: [
            ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('paste'), 'Paste key')
          ]
        }
      }
    ]);
  };

  static outputOnClickProperty = (basePath: string, propName: string) => {
    const propFullPath       = `${ basePath ? basePath + '.' : '' }${ propName }`;
    const editorPropFullPath = `${ basePath ? basePath + '.' : '' }${ propName }[].${ editorPropName(propName) }`;

    return [
      ...EditorInterfaceLayoutFactory.outputArrayCardListKey(propFullPath,
        { $eval: `return { value: 'Action' }`, dependencies: [] },
        [
          // Type switcher
          ...EditorInterfaceLayoutFactory.outputKey(editorPropFullPath, 'Action', {
            handlerPreferences: {
              searchable: true
            }
          }),
          // Abort
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'abort'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }[].abort.$eval`, 'Abort condition')
            ]
          },
          // Eval
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === '$eval'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }[].$eval`, 'Eval')
            ]
          },
          // Emit
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'emit'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].emit.event`, 'Event name'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].emit`, 'value', 'Value'),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].emit.onLinked`)
            ]
          },
          // Set value
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'setValue'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].setValue.path`, 'Path'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].setValue`, 'value', 'Value'),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].setValue.onLinked`),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].setValue.noResolve`),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].setValue.noValueChange`)
            ]
          },
          // Patch value
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'patchValue'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].patchValue.path`, 'Path'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].patchValue`, 'value', 'Value'),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].patchValue.onLinked`),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].patchValue.noResolve`),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].patchValue.noValueChange`)
            ]
          },
          // Validate
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'validate'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].validate`)
            ]
          },
          // Submit
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'submit'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputDynamicSwitchablePropKey(`${ propFullPath }[]`, 'submit', 'Submit', [
                {
                  typeKey         : 'basic',
                  layoutDefinition: {
                    type : 'div',
                    items: [
                      ...EditorInterfaceLayoutFactory.createLabel('Form will be submitted.')
                    ]
                  }
                },
                {
                  typeKey         : 'advanced',
                  layoutDefinition: {
                    type : 'div',
                    items: [
                      ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic(`advanced.createRevision`)),
                      ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic(`advanced.createFork`)),
                      ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic(`advanced.onLinked`)),
                      ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(wrapKeyDynamic(`advanced.mapResponseData`), 'Map response data')
                    ]
                  }
                }
              ])
            ]
          },
          // Array item add
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'arrayItemAdd'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].arrayItemAdd.path`, 'Path'),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].arrayItemAdd.mode`, 'Mode'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].arrayItemAdd`, 'value', 'Value'),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].arrayItemAdd.onLinked`)
            ]
          },
          // Array item remove
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'arrayItemRemove'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].arrayItemRemove.path`, 'Path'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].arrayItemRemove`, 'index', 'Index'),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].arrayItemRemove.onLinked`)
            ]
          },
          // Navigate to
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'navigateTo'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].navigateTo.reload`),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].navigateTo`, 'path', 'Path'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].navigateTo`, 'query', 'Query parameters'),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].navigateTo.queryParamsHandling`, 'Query parameters handling'),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].navigateTo.relative`),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].navigateTo.openInNewWindow`),
              ...EditorInterfaceLayoutFactory.createDivider(),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].navigateTo.transferFormValue.path`, 'Transfer form value path'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].navigateTo.transferFormValue`, 'value', 'Transfer form value data')
            ]
          },
          // DFF
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'dff'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].dff.action`, 'Action'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].dff`, 'value', 'Event value'),
              ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }[].dff.mapResponseData`, 'Map response data'),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].dff.onLinked`)
            ]
          },
          // Show dialog
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'showDialog'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].showDialog.key`, 'Dialog key'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].showDialog`, 'data', 'Dialog data'),
              ...EditorInterfaceLayoutFactory.createDivider(),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].navigateTo.transferFormValue.path`, 'Transfer form value path'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].navigateTo.transferFormValue`, 'value', 'Transfer form value data')

            ]
          },
          // Hide dialog
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'hideDialog'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.createLabel('Dialog will be hidden.')
            ]
          },
          // Open form dialog
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'openFormDialog'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].openFormDialog`, 'dffKey', 'DFF key'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].openFormDialog`, 'documentId', 'Document ID'),
              ...EditorInterfaceLayoutFactory.createDivider(),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].openFormDialog.transferFormValue.path`, 'Transfer form value path'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].openFormDialog.transferFormValue`, 'value', 'Transfer form value data'),
              ...EditorInterfaceLayoutFactory.createDivider(),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].openFormDialog`, 'abortOnDismiss', 'Abort on dismiss'),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].openFormDialog.proxy`),
              ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }[].openFormDialog.mapResponseData`, 'Map response data')
            ]
          },
          // Close form dialog
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'closeFormDialog'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputDynamicSwitchablePropKey(`${ propFullPath }[]`, 'closeFormDialog', 'Close form dialog', [
                {
                  typeKey         : 'basic',
                  layoutDefinition: {
                    type : 'div',
                    items: [
                      ...EditorInterfaceLayoutFactory.createLabel('Form dialog will be closed.')
                    ]
                  }
                },
                {
                  typeKey         : 'advanced',
                  layoutDefinition: {
                    type : 'div',
                    items: [
                      ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic(`advanced.dismiss`))
                    ]
                  }
                }
              ])
            ]
          },
          // Show loading indicator
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'showLoadingIndicator'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.createLabel('Loading indicator will be shown.')
            ]
          },
          // Hide loading indicator
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'hideLoadingIndicator'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.createLabel('Loading indicator will be hidden.')
            ]
          },
          // Stepper next
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'stepperNext'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].stepperNext.id`, 'Stepper layout ID')
            ]
          },
          // Stepper previous
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'stepperPrevious'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].stepperPrevious.id`, 'Stepper layout ID')
            ]
          },
          // Clipboard
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'clipboard'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].clipboard.clear`, 'Clipboard keys to clear'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].clipboard.copy`, 'key', 'Key'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].clipboard.copy`, 'value', 'Value')
            ]
          },
          // Show notification
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'showNotification'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].showNotification`, 'message', 'Message'),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].showNotification.level`, 'Notification level')
            ]
          },
          // Run service action
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'runServiceAction'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].runServiceAction`, 'service', 'Service'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].runServiceAction`, 'action', 'Action'),
              ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty(`${ propFullPath }[].runServiceAction`, 'data', 'Data'),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].runServiceAction.onLinked`)
            ]
          },
          // Data source reload
          {
            type     : 'div',
            visibleIf: {
              $eval       : `return $getItemValue('${ editorPropFullPath }') === 'dataSourceReload'`,
              dependencies: [editorPropFullPath]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].dataSourceReload.force`),
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].dataSourceReload.dataSourceKey`, 'Data source key')
            ]
          },

          // Condition
          ...EditorInterfaceLayoutFactory.createDivider(),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }[].condition.$eval`, 'Condition')
        ])
    ];
  };

  static outputJsfProviderExecutorProperty = (basePath: string, propName: string) => {
    const propFullPath       = `${ basePath ? basePath + '.' : '' }${ propName }`;

    return [
      ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }.key`, `Provider key`),
      ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }.dependencies`, `Dependencies`),
      ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }.mode`, `Value update mode`, {
        handlerPreferences: {
          layout: `inline`
        }
      }),
      ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }.debounce`),
      ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }.async`),
      ...EditorInterfaceLayoutFactory.createDivider(),
      ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }.condition.$eval`, `Run condition`),
      ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }.providerRequestData.$eval`, `Request data`),
      ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }.mapResponseData.$eval`, `Map response data`),
      ...EditorInterfaceLayoutFactory.createDivider(),
      ...EditorInterfaceLayoutFactory.createLabel(`Custom triggers`),
      ...EditorInterfaceLayoutFactory.outputArrayCardListKey(`${ propFullPath }.customTriggers`,
        { $eval: `return { value: 'Trigger' }`, dependencies: [] },
        [
          ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }.customTriggers[].type`),
          {
            type     : `div`,
            visibleIf: {
              $eval       : `return $getItemValue('provider.customTriggers[].type') === 'interval'`,
              dependencies: [`${ propFullPath }.customTriggers[].type`]
            },
            items    : [
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }.customTriggers[].interval`, `Interval (ms)`)
            ]
          }
        ]
      ),
      ...EditorInterfaceLayoutFactory.createDivider(),
      ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }.hooks.onIdle.$eval`, `Event: Idle`, CodeEditorKeyIconType.EventCallback),
      ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }.hooks.onPending.$eval`, `Event: Pending`, CodeEditorKeyIconType.EventCallback),
      ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }.hooks.onFailed.$eval`, `Event: Failed`, CodeEditorKeyIconType.EventCallback)
    ]
  };
}

export function wrapKeyDynamic(x: string) {
  return `@@BASE_PATH${ x }`;
}
