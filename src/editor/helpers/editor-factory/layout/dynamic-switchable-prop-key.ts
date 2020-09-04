import { editorPropName } from '../editor-interface-utils';

export interface DynamicSwitchablePropKeyInterface {
  typeKey: string;

  layoutDefinition: any;
}

export function dynamicSwitchablePropKey(basePath: string, propName: string, label: string, definitions: DynamicSwitchablePropKeyInterface[]) {
  const typeSwitcherPropName = `${ editorPropName(propName) }_type`;
  const typeValuePropName    = `${ editorPropName(propName) }_value`;

  const output = [
    {
      type : 'div',
      htmlClass: 'border rounded-sm p-1 my-1',
      items: [
        ...(label ? [{ type: 'span', title: label }] : []),
        // Type switcher
        {
          key: `${ basePath ? basePath + '.' : '' }${ typeSwitcherPropName }`,
          handlerPreferences: {
            layout: 'inline'
          }
        },
        // Values
        ...definitions.map(x => {
          return {
            ... x.layoutDefinition,
            visibleIf: {
              $eval: `return $getItemValue('${ basePath ? basePath + '.' : ''}${ typeSwitcherPropName }') === '${ x.typeKey }'`,
              dependencies: [`${ basePath ? basePath + '.' : ''}${ typeSwitcherPropName }`]
            }
          };
        })
      ]
    }
  ];

  return JSON.parse(
    JSON.stringify(output)
      .replace(/@@BASE_PATH/g, basePath ? `${ basePath }.${ typeValuePropName }.` : `${ typeValuePropName }.`)
  );
}
