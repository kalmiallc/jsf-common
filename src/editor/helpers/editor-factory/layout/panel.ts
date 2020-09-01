export function panel(title: string, panelItems: any[]) {
  return !panelItems.length ? [] : [
    {
      type : 'expansion-panel-standalone-panel',
      items: [
        {
          type : 'expansion-panel-standalone-header',
          items: [
            {
              type     : 'badge',
              htmlClass: 'my-0 font-weight-bold',
              title,
              color    : 'primary'
            }
          ]
        },
        {
          type : 'expansion-panel-standalone-content',
          items: [
            {
              type     : 'div',
              htmlClass: 'pb-4',
              items    : [
                ...panelItems
              ]
            }
          ]
        }
      ]
    }
  ];
}
