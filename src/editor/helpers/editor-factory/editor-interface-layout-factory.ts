import { panel }         from './layout/panel';
import { codeEditorKey } from './layout/code-editor-key';

export abstract class EditorInterfaceLayoutFactory {

  /**
   * Creates a basic panel for grouping elements together.
   */
  static createPanel             = panel;
  /**
   * Outputs a key attached with a code editor handler, with a label and icon.
   */
  static outputKeyWithCodeEditor = codeEditorKey;

  /**
   * Creates a div that spaces out the content inside from the top
   * @param items
   */
  static createVerticalSpacer(items: any[]) {
    return [
      {
        type: 'div',
        htmlClass: 'mt-4',
        items
      }
    ]
  }

  /**
   * Outputs a key with an optional label above it.
   * @param key
   * @param label
   */
  static outputKey = (key: string, label?: string) => {
    return [
      ... (label ? [ { type: 'span', title: label }] : []),
      {
        key
      }
    ]
  };



}
