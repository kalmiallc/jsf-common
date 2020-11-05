import { editorPropName } from '../editor-interface-utils';

export interface DynamicSwitchablePropInterface {
  typeKey: string;
  typeName: string;

  propDefinition: any;
}

export function dynamicSwitchableProperty(basePath: string, propName: string, definitions: DynamicSwitchablePropInterface[], keyExtraSchemaProperties?: any) {
  const typeSwitcherPropName = `${ editorPropName(propName) }_type`;
  const typeValuePropName    = `${ editorPropName(propName) }_value`;

  const autoFixConditions = definitions.map(def => {
    switch (def.propDefinition.type) {
      case 'object': {
        const firstLevelProperties = Object.keys(def.propDefinition.properties);
        return `if (_.isPlainObject(AUTOFIX_VALUE) && Object.keys(AUTOFIX_VALUE).filter(x => [${ firstLevelProperties.map(x => `'${ x }'`).join(', ') } ].indexOf(x) > -1).length >= 1) {
          AUTOFIX_KEY = '${ def.typeKey }';
        }
        firstObjectTypeKey = firstObjectTypeKey || '${ def.typeKey }'`;
      }
      case 'array': {
        return `if (_.isArray(AUTOFIX_VALUE)) {
          AUTOFIX_KEY = '${ def.typeKey }';
        }`;
      }
      case 'string': {
        return `if (typeof AUTOFIX_VALUE === 'string') {
          AUTOFIX_KEY = '${ def.typeKey }';
        }`;
      }
      case 'number':
      case 'integer': {
        return `if (typeof AUTOFIX_VALUE === 'number') {
          AUTOFIX_KEY = '${ def.typeKey }';
        }`;
      }
      case 'boolean': {
        return `if (typeof AUTOFIX_VALUE === 'boolean') {
          AUTOFIX_KEY = '${ def.typeKey }';
        }`;
      }
      default: {
        throw new Error(`Unsupported switchable prop type "${ def.propDefinition.type }"`);
      }
    }
  });

  const output = {
    // Output prop with dynamic value
    [propName]            : {
      type               : 'object',
      properties         : {},
      handler            : {
        type: 'any'
      },
      propertyOrderWeight: 3,
      get                : {
        $eval: `const selectedType = $valueOf('${ basePath ? basePath + '.' : '' }${ typeSwitcherPropName }');
          if (!selectedType) {
            return null;
          }
          return $valueOf('${ basePath ? basePath + '.' : '' }${ typeValuePropName }.' + selectedType)`
      },
      set                : {
        $eval: `const selectedType = $prop.parentProp.getControlByPath('${ typeSwitcherPropName }').getJsonValue();
                const selectedTypeValue = selectedType && $prop.parentProp.getControlByPath('${ typeValuePropName }.' + selectedType).getJsonValue();
                
                // console.log('propName', '${ propName }');
                // console.log('selectedType', selectedType);
                // console.log('selectedTypeValue', selectedTypeValue);

                const AUTOFIX_VALUE = $args.value
                
                // console.log('AUTOFIX_VALUE', AUTOFIX_VALUE);
        
                if (AUTOFIX_VALUE !== undefined) {
                  if (!selectedType || !selectedTypeValue || !_.isEqual(selectedTypeValue, AUTOFIX_VALUE)) {
                    
                    let AUTOFIX_KEY;
                    let firstObjectTypeKey;
                    
                    ${ autoFixConditions.join('\n') }
                    
                    // Additional check for an object in case no properties were matched.
                    if (_.isPlainObject(AUTOFIX_VALUE) && !AUTOFIX_KEY && firstObjectTypeKey) {
                      AUTOFIX_KEY = firstObjectTypeKey;
                    }
                    if (AUTOFIX_VALUE === null || !AUTOFIX_KEY) {
                      // We can't really determine the type in this case, so just pick the first one since all prop types can handle null in some way.
                      // This is also the fallback option in case nothing else was matched above.
                      AUTOFIX_KEY = '${ definitions[0].typeKey }';
                    }
                    
                    // console.log('AUTOFIX_KEY', AUTOFIX_KEY);
        
                    $prop.parentProp.getControlByPath('${ typeSwitcherPropName }').setJsonValue(AUTOFIX_KEY);
                    $prop.parentProp.getControlByPath('${ typeValuePropName }.' + AUTOFIX_KEY).setJsonValue(AUTOFIX_VALUE);
                    
                    console.log('[AutoFix]', 'Assuming value', AUTOFIX_VALUE, 'is of dynamic key type "' + AUTOFIX_KEY + '"'); 
                  }
                }
                
                return AUTOFIX_VALUE;`
      },
      ...(keyExtraSchemaProperties || {})
    },
    // Type switcher
    [typeSwitcherPropName]: {
      type               : 'string',
      required           : true,
      propertyOrderWeight: 2,
      handler            : {
        type  : 'common/radio',
        values: definitions.map(x => ({ value: x.typeKey, label: x.typeName }))
      },
      // Using  a default here will break the autofix logic because in case of a missing value the default will be set, so we can't check
      // if an autofix is required.
      default            : definitions[0].typeKey
    },
    // Values
    [typeValuePropName]   : {
      type               : 'object',
      propertyOrderWeight: 1,
      properties         : {
        ...definitions.reduce((acc, x) => {
          return {
            ...acc,
            [x.typeKey]: x.propDefinition
          };
        }, {})
      }
    }
  };

  return JSON.parse(
    JSON.stringify(output)
      .replace(/@@BASE_PATH/g, basePath ? `${ basePath }.${ typeValuePropName }.` : `${ typeValuePropName }.`)
  );
}
