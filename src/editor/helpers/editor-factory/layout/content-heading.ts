export function contentHeading(title: string) {
  return [
    {
      type : 'heading',
      level: 6,
      htmlClass: 'mt-4',
      title
    }
  ];
}
