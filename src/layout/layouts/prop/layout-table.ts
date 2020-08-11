import { JsfAbstractPropLayout }          from '../../abstract/abstract-layout';
import { JsfUnknownLayout }               from '../../index';
import { DefExtends, DefLayout, DefProp, DefCategory, DefSpecialProp, DefTransform } from '../../../jsf-for-jsf';
import { createDependencyArray } from '../../../jsf-for-jsf/util/dependency-array';
import { DefLayoutInfo }                                               from '../../../jsf-register-decorators';


@DefLayoutInfo({
  type: 'table',
  title: 'Table',
  icon: 'layout-icons/table.svg',
  formControl: {
    enabled: true
  },
  items: {
    enabled: true
  }
})
@DefTransform((x: any) => {
  x.schema.properties._preferences = {
    type: 'object',
    properties: {
      columnWidthBreakpoints: {
        type: 'object',
        properties: {
          xs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                key: { type: 'string' },
                value: { type: 'number' }
              }
            },
            onValueChange: {
              updateDependencyValue: {
                mode: 'set',
                key: 'preferences.columnWidthBreakpoints.xs',
                value: {
                  $eval:  `
                    console.log("hello world!", $val._preferences)
                    const prefs = {};
                    for (const item of $val._preferences.columnWidthBreakpoints.xs) {
                      prefs[item.key] = value;
                    }
                    return prefs;
                  `
                }
              }
            }
          },
          sm: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                key: { type: 'string' },
                value: { type: 'number' }
              }
            },
            onValueChange: {
              updateDependencyValue: {
                mode: 'set',
                key: 'preferences.columnWidthBreakpoints.sm',
                value: {
                  $eval:  `
                    const prefs = {};
                    for (const item of $val._preferences.columnWidthBreakpoints.sm) {
                      prefs[item.key] = value;
                    }
                    return prefs;
                  `
                }
              }
            }
          },
          md: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                key: { type: 'string' },
                value: { type: 'number' }
              }
            },
            onValueChange: {
              updateDependencyValue: {
                mode: 'set',
                key: 'preferences.columnWidthBreakpoints.md',
                value: {
                  $eval:  `
                    const prefs = {};
                    for (const item of $val._preferences.columnWidthBreakpoints.md) {
                      prefs[item.key] = value;
                    }
                    return prefs;
                  `
                }
              }
            }
          },
          lg: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                key: { type: 'string' },
                value: { type: 'number' }
              }
            },
            onValueChange: {
              updateDependencyValue: {
                mode: 'set',
                key: 'preferences.columnWidthBreakpoints.lg',
                value: {
                  $eval:  `
                    const prefs = {};
                    for (const item of $val._preferences.columnWidthBreakpoints.lg) {
                      prefs[item.key] = value;
                    }
                    return prefs;
                  `
                }
              }
            }
          },
          xl: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                key: { type: 'string' },
                value: { type: 'number' }
              }
            },
            onValueChange: {
              updateDependencyValue: {
                mode: 'set',
                key: 'preferences.columnWidthBreakpoints.xl',
                value: {
                  $eval:  `
                    const prefs = {};
                    for (const item of $val._preferences.columnWidthBreakpoints.xl) {
                      prefs[item.key] = value;
                    }
                    return prefs;
                  `
                }
              }
            }
          }

        }
      }
    }
  }

  return x;
})
@DefLayout({
  type : 'div',
  items: [
    // { key: 'headers' },
    // { key: 'items' },
    { // preferences level
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Preferences',
          level: 5
        },
        {
          type: 'span',
          title: 'Breakpoints for controlling column widths'
        },
        {
          type: 'div',
          items: [
            createDependencyArray('_preferences.columnWidthBreakpoints', 'xs', 'Mobile (xs)', 'No breakpoints yet', 'Add breakpoint', ['key', 'value']),
            createDependencyArray('_preferences.columnWidthBreakpoints', 'sm', 'Small (sm)', 'No breakpoints yet', 'Add breakpoint', ['key', 'value']),
            createDependencyArray('_preferences.columnWidthBreakpoints', 'md', 'Medium (md)', 'No breakpoints yet', 'Add breakpoint', ['key', 'value']),
            createDependencyArray('_preferences.columnWidthBreakpoints', 'lg', 'Large (lg)', 'No breakpoints yet', 'Add breakpoint', ['key', 'value']),
            createDependencyArray('_preferences.columnWidthBreakpoints', 'xl', 'Very large (xl)', 'No breakpoints yet', 'Add breakpoint', ['key', 'value'])
          ]
        }
      ]
    }
  ]
})
@DefExtends('JsfAbstractPropLayout')
@DefCategory('List')
export class JsfLayoutPropTable extends JsfAbstractPropLayout {
  @DefProp({
    type : 'string',
    const: 'table',
    title: 'Type'
  })
  type: 'table';

  @DefSpecialProp('JsfUnknownLayout[]')
  headers: JsfUnknownLayout[];

  @DefSpecialProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];

  // @DefProp('JsfLayoutPropTablePreferences')
  @DefProp({
    type      : 'object',
    handler   : { type: 'any' },
    properties: {
      columnWidthBreakpoints: {
        type: 'object',
        handler: { type: 'any' },
        properties: { },     // can alledgedly be empty
        onValueChange: {
          updateDependencyValue: [
            {
              mode: 'set',
              key: 'preferences',
              value: {
                $eval: `
                  return $val._properties;
                `,
              },
            }
          ],
        }
      }
    },
  })
  preferences?: JsfLayoutPropTablePreferences;

  constructor(data: JsfLayoutPropTable) {
    super();
    Object.assign(this, data);
  }
}


export interface JsfLayoutPropTablePreferences {
  /**
   * Breakpoints for controlling column widths.
   */
  columnWidthBreakpoints: {
    xs?: { [headerLayoutId: string]: number },
    sm?: { [headerLayoutId: string]: number },
    md?: { [headerLayoutId: string]: number },
    lg?: { [headerLayoutId: string]: number },
    xl?: { [headerLayoutId: string]: number },
  };

}
