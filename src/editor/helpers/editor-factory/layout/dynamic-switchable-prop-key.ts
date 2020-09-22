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
      type: 'div',
      htmlClass: 'border rounded-sm py-1 px-2 mt-1 mb-2',
      items: [
        // Type switcher
        {
          type: 'div',
          items: [
            ...(label ? [{ type: 'span', title: label }] : []),
            {
              key: `${ basePath ? basePath + '.' : '' }${ typeSwitcherPropName }`,
              handlerPreferences: {
                layout: 'inline'
              }
            },
          ]
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
