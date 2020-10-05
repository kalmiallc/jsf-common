import { JsfAbstractPropEditor }           from '../../../abstract';
import { JsfAbstractProp, JsfUnknownProp } from '../../../../schema/abstract';
import { editorPropName }                  from '../editor-interface-utils';

export interface DynamicSwitchablePropInterface {
  typeKey: string;
  typeName: string;

  propDefinition: any;
}

export function dynamicSwitchableProperty(basePath: string, propName: string, definitions: DynamicSwitchablePropInterface[], keyExtraSchemaProperties?: any) {
  const typeSwitcherPropName = `${ editorPropName(propName) }_type`;
  const typeValuePropName = `${ editorPropName(propName) }_value`;

  const output = {
    // Output prop with dynamic value
    [propName]: {
      type: 'object',
      properties: {},
      handler: {
        type: 'any'
      },
      get: {
        $eval: `const selectedType = $valueOf('${ basePath ? basePath + '.' : ''}${ typeSwitcherPropName }');
          if (!selectedType) {
            return null;
          }
          return $valueOf('${ basePath ? basePath + '.' : ''}${ typeValuePropName }.' + selectedType)`
      },
      ... (keyExtraSchemaProperties || {})
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
    },
    // Values
    [typeValuePropName]: {
      type: 'object',
      properties: {
        ... definitions.reduce((acc, x) => {
          return {
            ... acc,
            [x.typeKey]: x.propDefinition
          };
        }, {}),
      }
    },
  };

  return JSON.parse(
    JSON.stringify(output)
      .replace(/@@BASE_PATH/g, basePath ? `${ basePath }.${ typeValuePropName }.` : `${ typeValuePropName }.`)
  );
}
