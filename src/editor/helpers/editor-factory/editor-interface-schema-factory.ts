import { evalProperty, evalPropertyWithDependencies, evalPropertyWithDependenciesAndLayoutDependencies } from './schema/eval';

export abstract class EditorInterfaceSchemaFactory {

  /**
   * Eval property generators.
   */
  static createEvalProperty                                      = evalProperty;
  static createEvalPropertyWithDependencies                      = evalPropertyWithDependencies;
  static createEvalPropertyWithDependenciesAndLayoutDependencies = evalPropertyWithDependenciesAndLayoutDependencies;

}
