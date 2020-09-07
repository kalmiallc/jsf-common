export function key(key: string, label?: string, keyExtraLayoutProperties?: any) {
  return [
    ...(label ? [{ type: 'span', title: label }] : []),
    {
      key,
      ... (keyExtraLayoutProperties || {})
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
