export function panel(title: string, panelItems: any[]) {
  return [
    {
      type : 'div',
      htmlClass: 'p-1 border rounded-sm',
      items: [
        {
          type : 'div',
          htmlClass: '__background-color--grey-light-50 rounded-sm px-2 py-2 mb-2',
          items: [
            {
              type : 'heading',
              level: 6,
              htmlClass: 'my-0',
              title
            }
          ]
        },
        ...panelItems
      ]
    }
  ];
}
