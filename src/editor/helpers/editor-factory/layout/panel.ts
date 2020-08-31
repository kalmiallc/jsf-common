export function panel(title: string, panelItems: any[]) {
  return [
    {
      type : 'div',
      htmlClass: 'p-1 border rounded-sm mb-3 __shadow-float--black',
      items: [
        {
          type : 'div',
          htmlClass: '__background-color--grey-light-50 rounded-sm px-2 py-2 mt-n1 mx-n1 mb-1',
          items: [
            {
              type : 'heading',
              level: 6,
              htmlClass: 'my-0 __color--primary',
              title
            }
          ]
        },
        ...panelItems
      ]
    }
  ];
}
