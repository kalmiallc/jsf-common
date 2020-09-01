export enum CodeEditorKeyIconType {
  Eval = 'functions',
  EventCallback = 'functions',
}

export type CodeEditorLanguage = 'javascript' | 'json' | 'scss' | 'css';

export function codeEditorKey(key: string, label: string, iconType: CodeEditorKeyIconType = CodeEditorKeyIconType.Eval, language: CodeEditorLanguage = 'javascript') {
  return [
    {
      type: 'row',
      items: [
        {
          type: 'col',
          xs: 6,
          items: [
            {
              type: 'icon',
              icon: iconType,
              size: '20px'
            },
            {
              type: 'span',
              title: label,
              htmlClass: 'pl-1'
            },
          ]
        },
        {
          type: 'col',
          xs: 6,
          htmlClass: 'text-right',
          items: [
            {
              type: 'span',
              title: {
                'javascript': 'JS',
                'json': 'JSON',
                'scss': 'SCSS',
                'css': 'CSS',
              }[language],
              htmlClass: 'font-italic'
            }
          ]
        }
      ]
    },
    {
      key,
      htmlClass: 'mb-3',
    }
  ]
}