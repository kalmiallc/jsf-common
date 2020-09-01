import { panel }                                from './layout/panel';
import { codeEditorKey }                        from './layout/code-editor-key';
import { panelGroup }                           from './layout/panel-group';
import { contentHeading, label as createLabel } from './layout/labels';
import { arrayCardListKey }                     from './layout/array-card-list-key';

export abstract class EditorInterfaceLayoutFactory {

  /**
   * Creates a group for basic panels.
   */
  static createPanelGroup        = panelGroup;
  /**
   * Creates a basic panel for grouping elements together.
   */
  static createPanel             = panel;
  /**
   * Creates a simple label.
   */
  static createLabel             = createLabel;
  /**
   * Creates a heading useful for separating items within a panel.
   */
  static createContentHeading    = contentHeading;
  /**
   * Outputs a key attached with a code editor handler, with a label and icon.
   */
  static outputKeyWithCodeEditor = codeEditorKey;
  /**
   * Outputs an array key as a list of cards with an included add and remove buttons.
   */
  static outputArrayCardListKey  = arrayCardListKey;

  /**
   * Outputs a key with an optional label above it.
   * @param key
   * @param label
   */
  static outputKey = (key: string, label?: string) => {
    return [
      ...(label ? [{ type: 'span', title: label }] : []),
      {
        key
      }
    ];
  };

  /**
   * Creates a divider.
   */
  static createDivider() {
    return [
      {
        type     : 'hr',
        htmlClass: 'my-1'
      }
    ];
  }

  /**
   * Creates a div that spaces out the content inside from the top
   * @param items
   */
  static createVerticalSpacer(items: any[]) {
    return [
      {
        type     : 'div',
        htmlClass: 'mt-4',
        items
      }
    ];
  }
}
