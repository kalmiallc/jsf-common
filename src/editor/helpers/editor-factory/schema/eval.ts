import { JsfAbstractPropEditor }           from '../../../abstract';
import { JsfAbstractProp, JsfUnknownProp } from '../../../../schema/abstract';

export function evalProperty(codeEditorLanguage = 'javascript') {
  return {
    $eval: {
      type: 'string',
      handler: {
        type: 'common/code-editor',
        options: {
          language: codeEditorLanguage
        }
      }
    }
  };
}
