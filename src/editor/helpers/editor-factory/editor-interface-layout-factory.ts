import { panel, panelGroup }                    from './layout/panels';
import { codeEditorKey }                        from './layout/code-editor-key';
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
          ...EditorInterfaceLayoutFactory.outputKey(editorPropFullPath, 'Action'),
          // Abort
          {
            type: 'div',
            visibleIf: {
              $eval: `return $getItemValue('${ editorPropFullPath }') === 'abort'`,
              dependencies: [editorPropFullPath]
            },
            items: [
              ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }[].abort.$eval`, 'Abort condition'),
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
              ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }[].$eval`, 'Eval'),
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
              ...EditorInterfaceLayoutFactory.outputKey(`${ propFullPath }[].emit.onLinked`),
            ]
          },
          // Condition
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(`${ propFullPath }[].condition.$eval`, 'Condition')
        ])
    ];
  };
}

export function wrapKeyDynamic(x: string) {
  return `@@BASE_PATH${ x }`;
}
