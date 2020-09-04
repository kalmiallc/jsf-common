import { JsfAbstractPropEditor }           from '../../../abstract';
import { JsfAbstractProp, JsfUnknownProp } from '../../../../schema/abstract';
import { editorPropName }                  from '../editor-interface-utils';

export interface DynamicSwitchablePropInterface {
  typeKey: string;
  typeName: string;

  propDefinition: any;
}

export function dynamicSwitchableProperty(basePath: string, propName: string, definitions: DynamicSwitchablePropInterface[]) {
  const typeSwitcherPropName = `${ editorPropName(propName) }_type`;
  const typeValuePropName = `${ editorPropName(propName) }_value`;

  return {
    // Output prop with dynamic value
    [propName]: {
      type: 'object',
      properties: {},
      handler: {
        type: 'any'
      }
    },
    // Type switcher
    [typeSwitcherPropName]: {
      type: 'string',
      required: true,
      handler: {
        type: 'common/radio',
        values: definitions.map(x => ({ value: x.typeKey, label: x.typeName })),
      },
      default: definitions[0].typeKey,
      onValueChange: {
        updateDependencyValue: [
          {
            mode: 'set',
            key: `${ basePath ? basePath + '.' : ''}${ propName }`,
            condition: {
              $eval: 'return !!$propVal'
            },
            value: {
              $eval: `console.log("Switched - Setting to", $getPropValue('${ basePath ? basePath + '.' : ''}${ typeValuePropName }.' + $propVal)); return $getPropValue('${ basePath ? basePath + '.' : ''}${ typeValuePropName }.' + $propVal);`
            }
          }
        ]
      }
    },
    // Values
    [typeValuePropName]: {
      type: 'object',
      properties: {
        ... definitions.reduce((acc, x) => {
          return {
            ... acc,
            [x.typeKey]: {
              ... x.propDefinition,
              onValueChange: {
                updateDependencyValue: [
                  {
                    mode: 'set',
                    key: `${ basePath ? basePath + '.' : ''}${ propName }`,
                    value: {
                      $eval: 'console.log("Prop - Setting from", $oldValue, "to", $propVal, "ready:", $form.ready); return $propVal'
                    }
                  }
                ]
              }
            }
          };
        }, {}),
      }
    },
  }
}

