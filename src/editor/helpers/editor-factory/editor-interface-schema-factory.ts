import { evalProperty, evalPropertyWithDependencies, evalPropertyWithDependenciesAndLayoutDependencies } from './schema/eval';
import { dynamicSwitchableProperty }                                                                     from './schema/dynamic-switchable-property';

export abstract class EditorInterfaceSchemaFactory {

  /**
   * Eval property generators.
   */
  static createEvalProperty                                      = evalProperty;
  static createEvalPropertyWithDependencies                      = evalPropertyWithDependencies;
  static createEvalPropertyWithDependenciesAndLayoutDependencies = evalPropertyWithDependenciesAndLayoutDependencies;

  /**
   * Dynamic prop generators.
   */
  static createDynamicSwitchableProperty = dynamicSwitchableProperty;

  /**
   * Compound generators.
   */
  static createJsfValueOptionsProperty = (basePath: string, propName: string) => {
    return EditorInterfaceSchemaFactory.createDynamicSwitchableProperty(basePath, propName, [
      {
        typeKey: 'key',
        typeName: 'Key',
        propDefinition: {
          type: 'string'
        }
      },
      {
        typeKey: 'const',
        typeName: 'Constant',
        propDefinition: {
          type: '@@PROP_TYPE'
        }
      },
      {
        typeKey: 'eval',
        typeName: 'Eval',
        propDefinition: {
          type: 'object',
          properties: {
            ... EditorInterfaceSchemaFactory.createEvalProperty()
          }
        }
      },
      {
        typeKey: 'paste',
        typeName: 'Paste',
        propDefinition: {
          type: 'string'
        }
      }
    ]);
  }
}

class JsfValueOptionsInterface {
  /**
   * From other prop.
   */
  key?: string;

  const?: any;
  $eval?: string;

  /**
   * You should use $eval, this file dis auto generated.
   * @ignore
   */
  $evalTranspiled?: string;

  paste?: string;

  // PROPOSAL:
  // /**
  //  * Set from query URL
  //  */
  // query?: string;
  // /**
  //  * Set from local storage
  //  */
  // localStorage?: string;
}
