export function createLayoutButtonLayout(ancestorKey = 'preferences', title = 'Preferences') {
  return {
    type: 'div',
    htmlClass: 'ml-2 mt-3',
    items: [
      {
        type: 'heading',
        title: title,
        level: 5,
      },
      { key: `${ancestorKey}.color` },
      { key: `${ancestorKey}.variant` },
      { key: `${ancestorKey}.size` },
      { key: `${ancestorKey}.disableRipple` },
    ]
  }
}

export function createLayoutButtonProp() {
  return {
    type: 'object',
    title: 'Preferences',
    properties: {
      color: {
        type: 'string',
        title: 'color',
        handler: {
          type: 'common/dropdown',
          values: [
            {value: 'none', label: 'No color'},
            {value: 'primary', label: 'Primary'},
            {value: 'accent', label: 'Accent'}
          ]
        }
      },
      variant: {
        type: 'string',
        title: 'color',
        handler: {
          type: 'common/dropdown',
          values: [
            {value: 'basic', label: 'Basic'},
            {value: 'raised', label: 'Raised'},
            {value: 'flat', label: 'Flat'},
            {value: 'stroke', label: 'Stroked'},
            {value: 'icon', label: 'Icon'},
            {value: 'fab', label: 'Fab'},
            {value: 'mini-fab', label: 'Mini fab'},
          ]
        }
      },
      size: {
        type: 'string',
        title: 'Size',
        handler: {
          type: 'common/dropdown',
          values: [
            {value: 'large', label: 'Large'},
            {value: 'normal', label: 'Normal'},
            {value: 'small', label: 'Small'}
          ]
        }
      },
      disableRipple: {
        type: 'boolean',
        title: 'Disable ripple'
      }
    }
  }
}
