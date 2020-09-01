export function label(title: string) {
  return [
    {
      type: 'span',
      htmlClass: 'd-block',
      title
    }
  ]
}

export function contentHeading(title: string) {
  return [
    {
      type : 'heading',
      level: 6,
      htmlClass: 'my-0 d-block',
      title
    }
  ];
}
