export enum CodeEditorKeyIconType {
  Eval = 'code',
  EventCallback = 'slideshow',
}

export function codeEditorKey(key: string, label: string, iconType: CodeEditorKeyIconType = CodeEditorKeyIconType.Eval) {
  return [
    {
      type: 'icon',
      icon: iconType
    },
    {
      type: 'span',
      title: label,
      htmlClass: 'pl-1'
    },
    {
      key,
      htmlClass: 'mb-3',
    }
  ]
}
