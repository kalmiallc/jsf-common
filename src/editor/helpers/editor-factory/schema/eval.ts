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

export function evalPropertyWithDependencies(codeEditorLanguage = 'javascript') {
  return {
    $eval: {
      type: 'string',
      handler: {
        type: 'common/code-editor',
        options: {
          language: codeEditorLanguage
        }
      }
    },
    dependencies: {
      type: 'array',
      handler: {
        type: 'common/chip-list'
      },
      items: {
        type: 'string'
      }
    }
  };
}

export function evalPropertyWithDependenciesAndLayoutDependencies(codeEditorLanguage = 'javascript') {
  return {
    $eval: {
      type: 'string',
      handler: {
        type: 'common/code-editor',
        options: {
          language: codeEditorLanguage
        }
      }
    },
    dependencies: {
      type: 'array',
      handler: {
        type: 'common/chip-list'
      },
      items: {
        type: 'string'
      }
    },
    layoutDependencies: {
      type: 'array',
      handler: {
        type: 'common/chip-list'
      },
      items: {
        type: 'string'
      }
    }
  };
}
