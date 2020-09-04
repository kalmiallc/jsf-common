export function key(key: string, label?: string) {
  return [
    ...(label ? [{ type: 'span', title: label }] : []),
    {
      key
    }
  ];
}

export function keyWithItems(key: string, items: any[], label?: string) {
  return [
    ...(label ? [{ type: 'span', title: label }] : []),
    {
      key,
      items
    }
  ];
}
