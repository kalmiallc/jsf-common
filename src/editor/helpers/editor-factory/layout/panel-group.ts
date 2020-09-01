export function panelGroup(panelItems: any[]) {
  return [{
    type : 'expansion-panel-standalone',
    multi: true,
    items: [
      ...panelItems
    ]
  }];
}
