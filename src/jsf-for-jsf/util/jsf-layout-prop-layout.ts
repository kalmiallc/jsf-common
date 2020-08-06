export function createLayoutPropStringPreferencesLayoutItems(ancestorKey = 'preferences') {
  return [
    { key: `${ancestorKey}.color`},
    { key: `${ancestorKey}.appearance`},
    { key: `${ancestorKey}.variant`},
    { key: `${ancestorKey}.clearable`},
    { key: `${ancestorKey}.prefixIcon` },
    { key: `${ancestorKey}.suffixIcon` },
    { key: `${ancestorKey}.prefixLabel` },
    { key: `${ancestorKey}.suffixLabel` },
  ];
}

export function createLayoutPropNumberPreferencesLayoutItems(ancestorKey = 'preferences') {
  return [
    ...createLayoutPropStringPreferencesLayoutItems(ancestorKey),
    { key: `${ancestorKey}.stepperButtons` },
    { key: `${ancestorKey}.increment` },
  ]
}

export function createLayoutPropIntegerPreferencesLayoutItems(ancestorKey = 'preferences') {
  return [
    ...createLayoutPropStringPreferencesLayoutItems(ancestorKey),
    { key: `${ancestorKey}.stepperButtons` },
    { key: `${ancestorKey}.increment` },
  ]
}

export function createLayoutPropBooleanPreferencesLayoutItems(ancestorKey = 'preferences') {
  return [
    ...createLayoutPropStringPreferencesLayoutItems(ancestorKey),
    {
      key: `${ancestorKey}.labelPositionCheckbox`,
      visibleIf: {
        $eval: `return !$val.${ancestorKey}.variant === 'checkbox'`,
        dependencies: [ancestorKey]
      }
    },
    {
      key: `${ancestorKey}.labelPositionSlider`,
      visibleIf: {
        $eval: `return !$val.${ancestorKey}.variant === 'slider'`,
        dependencies: [ancestorKey]
      }
    },
  ]
}

export function createLayoutPropPreferencesLayout(ancestorKey = 'preferences', title = 'Prop preferences') {
  return {
    type: 'div',
    items: [
      {
        type: 'heading',
        title: title,
        level: 5
      },
      { key: `${ancestorKey}.color` },
      { key: `${ancestorKey}.appearance` },
      { key: `${ancestorKey}.variant` },
      { key: `${ancestorKey}.clearable` },
      { key: `${ancestorKey}.prefixIcon` },
      { key: `${ancestorKey}.suffixIcon` },
      { key: `${ancestorKey}.prefixLabel` },
      { key: `${ancestorKey}.suffixLabel` },
      { key: `${ancestorKey}.stepperButtons` },
      { key: `${ancestorKey}.step` },
      { key: `${ancestorKey}.labelPositionCheckbox`},
      { key: `${ancestorKey}.labelPositionSlider`},
    ]
  };
}

const layoutPropStringProperties = {
  color: {
    type: 'string',
    title: 'Color',
    handler: {
      type: 'common/dropdown',
      values: [
        { value: 'primary', label: 'Primary' },
        { value: 'accent', label: 'Accent' }
      ]
    }
  },
  appearance: {
    type: 'string',
    title: 'Appearance',
    handler: {
      type: 'common/dropdown',
      values: [
        { value: 'legacy', label: 'Legacy' },
        { value: 'standard', label: 'Standard' },
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ]
    }
  },
  variant: {
    type: 'Variant',
    handler: {
      type: 'common/dropdown',
      values: [
        { value: 'standard', label: 'Standard' },
        { value: 'small', label: 'Small' },
      ]
    }
  },
  clearable: {
    type: 'boolean',
    title: 'Clearable'
  },
  prefixIcon: {
    type: 'string',
    title: 'Prefix icon'
  },
  suffixIcon: {
    type: 'string',
    title: 'Suffix icon'
  },
  prefixLabel: {
    type: 'string',
    title: 'Prefix label'
  },
  suffixLabel: {
    type: 'string',
    title: 'Suffix label'
  }
}

const layoutPropNumberProperties = {
  ...layoutPropStringProperties,
  stepperButtons: {
    type: 'boolean',
    title: 'Stepper buttons'
  },
  step: {
    type: 'number',
    title: 'Step'
  }
}

const layoutPropIntegerProperties = {
  ...layoutPropStringProperties,
  stepperButtons: {
    type: 'boolean',
    title: 'Stepper buttons'
  },
  step: {
    type: 'number',
    title: 'Step'
  }
}

const layoutPropBooleanProperties = {
  ...layoutPropStringProperties,
  variant: {
    type: 'string',
    title: 'Variant',
    handler: {
      type: 'common/dropdown',
      values: [
        { value: 'checkbox', label: 'Checkbox' },
        { value: 'slider', label: 'Slider' }
      ]
    }
  },
  color: {
    type: 'string',
    title: 'Color',
    handler: {
      type: 'common/dropdown',
      values: [
        { value: 'primary', label: 'Primary' },
        { value: 'accent', label: 'Accent' }
      ]
    }
  },
  labelPositionCheckbox: {
    type: 'string',
    title: 'Color',
    handler: {
      type: 'common/dropdown',
      values: [
        { value: 'before', label: 'Before' },
        { value: 'after', label: 'After' }
      ]
    }
  },
  labelPositionSlider: {
    type: 'string',
    title: 'Color',
    handler: {
      type: 'common/dropdown',
      values: [
        { value: 'before', label: 'Before' },
        { value: 'after', label: 'After' }
      ]
    }
  },
}

export const layoutPropStringPreferences = {
  type: 'object',
  properties: layoutPropStringProperties
}

export const layoutPropNumberPreferences = {
  type: 'object',
  properties: layoutPropNumberProperties
}

export const layoutPropIntegerPreferences = {
  type: 'object',
  properties: layoutPropIntegerProperties
}

export const layoutPropBooleanPreferences = {
  type: 'object',
  properties: layoutPropBooleanProperties
}

export const layoutPropPreferences = {
  type: 'object',
  properties: {
    ...layoutPropStringProperties,
    ...layoutPropNumberProperties,
    ...layoutPropBooleanProperties
  }
}
