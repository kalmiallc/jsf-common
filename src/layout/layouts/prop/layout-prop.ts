import { JsfAbstractPropLayout }                                       from '../../abstract/abstract-layout';
import { DefExtends, DefProp, DefLayout, DefCategory, DefSpecialProp, DefTransform } from '../../../jsf-for-jsf';
import { JsfLayoutDiv, JsfUnknownLayout }                              from '../../index';
import { createLayoutPropPreferencesLayout }                           from '../../../jsf-for-jsf/util/jsf-layout-prop-layout';
import { DefLayoutInfo }                                               from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'prop',
  title: 'Form control',
  icon: 'layout-icons/prop.svg',
  formControl: {
    enabled: true
  }
})
@DefLayout({
  type : 'div',
  items: [
    { key: '_typeSelect'},
    { key: 'type' },
    // tw: copypasta
    // STRING PREFERENCES ↓↓
    {
      type: 'div',
      items: [
        { key: '_stringPreferences.color' },
        { key: '_stringPreferences.appearance' },
        { key: '_stringPreferences.variant' },
        { key: '_stringPreferences.clearable' },
        { key: '_stringPreferences.prefixIcon' },
        { key: '_stringPreferences.suffixIcon' },
        { key: '_stringPreferences.prefixLabel' },
        { key: '_stringPreferences.suffixLabel' },
      ],
      visibleIf: {
        $eval: `return $val._typeSelect === 'string'`,
        dependencies: ['_typeSelect']
      }
    },
    // NUMBER PREFERENCES ↓↓
    {
      type: 'div',
      items: [
        { key: '_numberPreferences.color' },
        { key: '_numberPreferences.appearance' },
        { key: '_numberPreferences.variant' },
        { key: '_numberPreferences.clearable' },
        { key: '_numberPreferences.stepperButtons' },
        { key: '_numberPreferences.step' },
        { key: '_numberPreferences.prefixIcon' },
        { key: '_numberPreferences.suffixIcon' },
        { key: '_numberPreferences.prefixLabel' },
        { key: '_numberPreferences.suffixLabel' },
      ],
      visibleIf: {
        $eval: `return $val._typeSelect === 'number'`,
        dependencies: ['_typeSelect']
      }
    },
    // BOOLEAN PREFERENCES ↓↓
    {
      type: 'div',
      items: [
        { key: '_booleanPreferences.variant' },
        { key: '_booleanPreferences.color' },
        {
          type: 'div',
          items: [
            { key: '_booleanPreferences.labelPositionCheckbox' }
          ],
          visibleIf: {
            $eval: `return $val._booleanPreferences.variant === 'checkbox'`,
            dependencies: ['_booleanPreferences']
          }
        },
        {
          type: 'div',
          items: [
            {key: '_booleanPreferences.labelPositionSlider' }
          ],
          visibleIf: {
            $eval: `return $val._booleanPreferences.variant === 'slider'`,
            dependencies: ['_booleanPreferences']
          }
        },
      ],
      visibleIf: {
        $eval: `return $val._typeSelect === 'boolean'`,
        dependencies: ['_typeSelect']
      }
    },
    // { key: 'items'},  // todo: uncomment when @DefSpecialProp decorator is implemented
  ]
} as JsfLayoutDiv)
@DefTransform((x: any) => {

  // TODO — delete this function. It's currently used for debug purposes
  const generateOnValueChanged = (key) => {
    return {
      updateDependencyValue: [
        {
          mode: 'set',
          key: 'preferences',
          value: {
            $eval: `
              console.log("hello world — inner object");
              return $val.${key};
            `
          }
        }
      ]
    }
  };

  const stringProp = {
    type: 'object',
    properties: {
      color: {
        type: 'string',
        title: 'Color',
        handler: {
          type: 'common/button-toggle',
          // type: 'common/dropdown',
          values: [
            { value: 'primary', label: 'Primary' },
            { value: 'accent', label: 'Accent' }
          ]
        },
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
            { value: 'outline', label: 'Outline' }
          ]
        }
      },
      variant: {
        type: 'string',
        title: 'Variant',
        handler: {
          type: 'common/button-toggle',
          // type: 'common/dropdown',
          values: [
            { value: 'normal', label: 'Normal' },
            { value: 'small', label: 'Small' }
          ]
        },
      },
      clearable: {
        type: 'boolean',
        title: 'Can be cleared'
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
    },
    onValueChange: {
      updateDependencyValue: [
        {
          mode: 'set',
          key: 'preferences',
          value: {
            $eval: `
              return $val._stringPreferences;
            `,
            dependencies: ['_stringPreferences']
          }
        }
      ]
    }
  }
  const numberProp = {
    type: 'object',
    properties: {
      ...stringProp.properties,
      stepperButtons: {
        type: 'boolean',
        title: 'Stepper buttons',
      },
      step: {
        type: 'number',
        title: 'Step',
      },
    },
    onValueChange: {
      updateDependencyValue: [
        {
          mode: 'set',
          key: 'preferences',
          value: {
            $eval: `
            console.log("hello world");
              return $val._numberPreferences;
            `,
            dependencies: ['_numberPreferences']
          }
        }
      ]
    }
  }

  // integerProp is currently not used, but interface exists.
  const integerProp = {
    type: 'object',
    properties: {
      ...stringProp.properties,
      stepperButtons: {
        type: 'boolean',
        title: 'Stepper buttons'
      },
      step: {
        type: 'number',
        title: 'Step'
      }
    },
    onValueChange: {
      updateDependencyValue: [
        {
          mode: 'set',
          key: 'preferences',
          value: {
            $eval: `
            console.log("hello world");
              return $val._integerPreferences;
            `,
            dependencies: ['_integerPreferences']
          }
        }
      ]
    }
  }

  const booleanProp = {
    type: 'object',
    // NOTE: boolean prop does NOT extend stringProp
    properties: {
      variant: {
        type: 'string',
        title: 'Variant',
        handler:  {
          type: 'common/button-toggle',
          // type: 'common/dropdown',
          values: [
            { value: 'checkbox', label: 'Checkbox' },
            { value: 'slider', label: 'Slider' }
          ]
        },
        // onValueChange: generateOnValueChanged('_booleanPreferences')
      },
      color: {  // color is same as in stringProp, but since interface overrides it we'll be doing it, too
        type: 'string',
        title: 'Color',
        handler: {
          type: 'common/button-toggle',
          // type: 'common/dropdown',
          values: [
            { value: 'primary', label: 'Primary' },
            { value: 'accent', label: 'Accent' }
          ]
        },
        // onValueChange: generateOnValueChanged('_booleanPreferences')
      },
      labelPositionCheckbox: { // NOTE: when doing layout, only one of [slider|label]PositionCheckbox forms should be visible
        type: 'string',
        title: 'Label position',
        handler: {
          type: 'common/button-toggle',
          // type: 'common/dropdown',
          values: [
            { value: 'before', label: 'Before' },
            { value: 'after', label: 'After' }
          ]
        },
        // onValueChange: generateOnValueChanged('_booleanPreferences')
      },
      labelPositionSlider: { // NOTE: when doing layout, only one of [slider|label]PositionCheckbox forms should be visible
        type: 'string',
        title: 'Label position',
        handler: {
          type: 'common/button-toggle',
          // type: 'common/dropdown',
          values: [
            { value: 'before', label: 'Before' },
            { value: 'after', label: 'After' }
          ]
        },
        // onValueChange: generateOnValueChanged('_booleanPreferences')
      }
    },
    onValueChange: {   // FIXME — don't define 'onValueChange' on every property separately
      updateDependencyValue: [
        {
          mode: 'set',
          key: 'preferences',
          value: {
            $eval: `
              console.log("hello world — outer object");

              return $val._booleanPreferences;
            `,
            dependencies: ['_booleanPreferences']
          }
        }
      ]
    }
  }

  x.schema.properties._typeSelect = {
    type: 'string',
    title: 'Prop type',
    handler: {
      type: 'common/dropdown',
      values: [
        { value: 'string', label: 'String' },
        { value: 'number', label: 'Number' },
        { value: 'boolean', label: 'Boolean' }
      ]
    },
    onValueChange: {
      updateDependencyValue: [
        {
          mode: 'set',
          key: 'preferences',
          value: {
            $eval: `
              if ($val._typeSelect === 'string') {
                return $val._stringPreferences;
              }
              if ($val._typeSelect === 'number') {
                return $val._numberPreferences;
              }
              if ($val._typeSelect === 'boolean') {
                return $val._booleanPreferences;
              }

              return {};
            `,
            dependencies: [
              '_stringPreferences',
              '_numberPreferences',
              '_booleanPreferences',
              '_typeSelect'
            ]
          }
        }
      ]
    }
  }

  x.schema.properties._stringPreferences = stringProp;
  x.schema.properties._numberPreferences = numberProp;
  x.schema.properties._booleanPreferences = booleanProp;

  return x;
})
@DefExtends('JsfAbstractPropLayout')
@DefCategory('Layout')
export class JsfLayoutProp extends JsfAbstractPropLayout {
  @DefProp({
    type : 'null',
    title: 'Type'
  })
  type?: never;

  @DefSpecialProp('JsfLayoutPropPreferences')
  preferences?: JsfLayoutPropPreferences;

  /**
   * Used only in specific cases like table 2.0, kanban board, ...
   */
  @DefSpecialProp('JsfUnknownLayout[]')
  items?: JsfUnknownLayout[];

  constructor(data: JsfLayoutProp) {
    super();
    Object.assign(this, data);
  }
}

export type JsfLayoutPropPreferences =
  JsfLayoutPropStringPreferences |
  JsfLayoutPropNumberPreferences |
  JsfLayoutPropBooleanPreferences;




export interface JsfLayoutPropStringPreferences {
  /**
   * Prop color palette.
   */
  color?: 'primary' | 'accent';
  /**
   * Set the appearance of input form fields.
   */
  appearance?: 'legacy' | 'standard' | 'fill' | 'outline';
  /**
   * Input variant. Affects appearance of the control as defined in the active theme.
   */
  variant?: 'standard' | 'small';
  /**
   * Whether the prop should have a clear button.
   */
  clearable?: boolean;
  /**
   * Name of a material icon to use as the prefix.
   * See https://material.io/tools/icons/
   */
  prefixIcon?: string;
  /**
   * Name of a material icon to use as the suffix.
   * See https://material.io/tools/icons/
   */
  suffixIcon?: string;
  /**
   * Text to use as the prefix.
   */
  prefixLabel?: string;
  /**
   * Text to use as the suffix.
   */
  suffixLabel?: string;
}

export interface JsfLayoutPropNumberPreferences extends JsfLayoutPropStringPreferences {
  /**
   * Show the increment/decrement buttons on the sides of the input control.
   */
  stepperButtons?: boolean;
  /**
   * Amount to increment/decrement the value when using stepper buttons or arrow keys.
   */
  step?: number;
}

export interface JsfLayoutPropIntegerPreferences extends JsfLayoutPropStringPreferences {
  /**
   * Show the increment/decrement buttons on the sides of the input control.
   */
  stepperButtons?: boolean;
  /**
   * Amount to increment/decrement the value when using stepper buttons or arrow keys.
   */
  step?: number;
}

export interface JsfLayoutPropBooleanPreferences {
  /**
   * Display the control as either a checkbox or a slider.
   */
  variant: 'checkbox' | 'slider';
  /**
   * Prop color palette.
   */
  color?: 'primary' | 'accent';
  /**
   * Set the position of the label in relation to the check box.
   */
  labelPositionCheckbox?: 'before' | 'after';
  /**
   * Set the position of the label in relation to the slider.
   */
  labelPositionSlider?: 'before' | 'after';
}
