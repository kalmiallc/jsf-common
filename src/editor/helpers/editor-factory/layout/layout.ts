export function divider() {
  return [
    {
      type     : 'hr',
      htmlClass: 'my-1'
    }
  ];
}

export function verticalSpacer(items: any[]) {
  return [
    {
      type     : 'div',
      htmlClass: 'mt-4',
      items
    }
  ];
}
