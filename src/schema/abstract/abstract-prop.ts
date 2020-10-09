import { JsfProp, JsfPropTypes }        from '../index';
import { JsfProviderExecutorInterface } from '../../providers';
import { JsfValueOptionsInterface }     from '../../layout/interfaces/value-options.type';
import { EditorInterfaceLayoutFactory } from '../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { EditorInterfaceSchemaFactory } from '../../editor/helpers/editor-factory/editor-interface-schema-factory';
import { CodeEditorKeyIconType }        from '../../editor/helpers/editor-factory/layout/code-editor-key';

export type JsfUnknownProp = JsfAbstractBareProp<JsfPropTypes, any>;

export abstract class JsfAbstractBareProp<TypeString, Handlers> {

  /**
   * @ignore
   */
  id?: string;

  /**
   * Intended for notes to schema maintainers, as opposed to "description" which is suitable for display to end users.
   */
  $comment?: string;

  /**
   * Intended for grouping props together.
   */
  $group?: string | string[];

  /**
   * Overwrites default behaviour.
   */
  handler?: Handlers;

  /**
   * If provider is set then it will be used to provide the value for this prop.
   */
  provider?: JsfProviderExecutorInterface;

  /**
   * If true, API will ignore this field. Only similar behaviour is with JsfObject source property.
   */
  virtual?: boolean;

  /**
   * Intended for grouping props together.
   */
  onInit?: (
    /**
     * Sets default value. More advanced than 'default' field following JSON Schema  since it can set dynamic value.
     */
    {
      type: 'set',
      value: JsfValueOptionsInterface
    } |
    {
      type: 'eval',
      $eval: string
    }
    )[];

  /**
   * The "definitions" keywords provides a standardized location for schema authors to inline re-usable JSON Schemas
   * into a more general schema. The keyword does not directly affect the validation result.
   *
   * This keyword's value MUST be an object. Each member value of this object MUST be a valid JSON Schema.
   */
  definitions?: { [definitionKey: string]: JsfProp };

  /**
   * The value of this keyword MUST be either a string or an array. If it is an array, elements of the array MUST be
   * strings and MUST be unique.
   *
   * String values MUST be one of the six primitive types ("null", "boolean", "object", "array", "number", "date" or
   * "string"), or
   * "integer" which matches any number with a zero fractional part.
   *
   * An instance validates if and only if the instance is in any of the sets listed for this keyword.
   */
  type: TypeString;

  /**
   * Eval string.
   *
   * Special props:
   * - $val
   * - $form
   * Expected output boolean.
   */
  enabledIf ?: string | {
    /**
     * Eval function body
     */
    $eval: string;

    /**
     * Form value dependencies. You can put asterisk at the end.
     * Example:
     *  - a.b.c
     *  - a.b.c.d.f.g.h
     *  - a.d[]
     *  - a.d[].r.t[].d
     *
     *  If you need * support ask for it.
     */
    dependencies: string[];
  };

  /**
   * Called whenever the user changes the prop value.
   */
  onUserValueChange?: {
    $eval: string;
  };

  /**
   * Change other prop value when this value changes
   */
  onValueChange ?: {
    /**
     * Prevents all value change emits, meaning that you also effectively excluded this field from
     * dirty list ($dirtyList).
     *
     * This can also serve as replacement for removed negation support.
     */
    noEmit?: boolean,

    /**
     * Patch or set value to some other prop
     */
    updateDependencyValue?: {
      mode?: 'set' | 'patch'
      key: string | {
        $eval: string
      },
      /**
       * Set/patch action
       */
      onLinked?: boolean;

      condition?: {
        onLinked?: boolean;
        $eval: string
      },
      value: {
        onLinked?: boolean;
        $eval?: string
        const?: any
        default?: true
      }
    }[]
  };

  /**
   * Value setter
   */
  set?: {
    $eval?: string;

    // Could be supported if needed.
    // key?: string;
  };

  /**
   * Value getter
   */
  get?: JsfValueOptionsInterface;
}

export const jsfAbstractBarePropJsfDefinitionSchemaProperties      = {
  $comment: {
    type     : 'string',
    multiline: 3
  },
  $group  : {
    type   : 'array',
    handler: {
      type: 'common/chip-list'
    },
    items  : {
      type: 'string'
    }
  },
  virtual : {
    type : 'boolean',
    title: 'Virtual'
  },
  onInit  : {
    type : 'array',
    items: {
      type      : 'object',
      properties: {
        type: {
          type   : 'string',
          handler: {
            type  : 'common/dropdown',
            values: [
              { label: 'Set', value: 'set' },
              { label: 'Eval', value: 'eval' }
            ]
          },
          default: 'set'
        },
        ...EditorInterfaceSchemaFactory.createJsfValueOptionsProperty('onInit[]', 'value', 'dynamic'),
        ...EditorInterfaceSchemaFactory.createEvalProperty()
      }
    }
  },

  ...EditorInterfaceSchemaFactory.createJsfProviderExecutorProperty('', 'provider'),

  enabledIf    : {
    type      : 'object',
    title     : 'Enabled if',
    properties: {
      $eval       : {
        type   : 'string',
        title  : 'Eval',
        handler: {
          type   : 'common/code-editor',
          options: {
            language: 'javascript'
          }
        }
      },
      dependencies: {
        type   : 'array',
        title  : 'Dependencies',
        handler: {
          type: 'common/chip-list'
        },
        items  : {
          type: 'string'
        }
      }
    }
  },
  onValueChange: {
    type      : 'object',
    title     : 'On value change',
    properties: {
      noEmit               : {
        type : 'boolean',
        title: 'Do not emit value change events'
      },
      updateDependencyValue: {
        type : 'array',
        items: {
          type      : 'object',
          properties: {
            mode     : {
              type   : 'string',
              handler: {
                type  : 'common/dropdown',
                values: [
                  { value: 'set', label: 'Set' },
                  { value: 'patch', label: 'Patch' }
                ]
              },
              default: 'set'
            },
            key      : {
              type: 'string'
            },
            onLinked : {
              type : 'boolean',
              title: 'Update value on linked builder'
            },
            condition: {
              type      : 'object',
              properties: {
                onLinked: {
                  type : 'boolean',
                  title: 'Check condition on linked builder'
                },
                $eval   : {
                  type   : 'string',
                  handler: {
                    type   : 'common/code-editor',
                    options: {
                      language: 'javascript'
                    }
                  }
                }
              }
            },
            value    : {
              type      : 'object',
              properties: {
                onLinked: {
                  type : 'boolean',
                  title: 'Get value on linked builder'
                },
                $eval   : {
                  type   : 'string',
                  handler: {
                    type   : 'common/code-editor',
                    options: {
                      language: 'javascript'
                    }
                  }
                },
                default : {
                  type : 'boolean',
                  title: 'Reset to default'
                }
              }
            }
          }
        }
      }
    }
  }
};
export const jsfAbstractBarePropJsfDefinitionValidationLayoutItems = [];

export const jsfAbstractBarePropJsfDefinitionLayoutItems = [
  ...EditorInterfaceLayoutFactory.createPanel('Enabled', [
    ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('enabledIf.$eval', 'Enabled condition'),
    ...EditorInterfaceLayoutFactory.outputKey('enabledIf.dependencies', 'Dependencies')
  ]),

  ...EditorInterfaceLayoutFactory.createPanel('On init', [
    ...EditorInterfaceLayoutFactory.outputArrayCardListKey('onInit',
      { $eval: `return { value: 'On prop init' }`, dependencies: [] },
      [
        ...EditorInterfaceLayoutFactory.outputKey('onInit[].type', 'Type'),
        {
          type     : 'div',
          visibleIf: {
            $eval       : `return $getItemValue('onInit[].type') === 'set'`,
            dependencies: ['onInit[].type']
          },
          items    : [
            ...EditorInterfaceLayoutFactory.outputJsfValueOptionsProperty('onInit[]', 'value', 'Set value')
          ]
        },
        {
          type     : 'div',
          visibleIf: {
            $eval       : `return $getItemValue('onInit[].type') === 'eval'`,
            dependencies: ['onInit[].type']
          },
          items    : [
            ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('onInit[].$eval', 'Eval')
          ]
        }
      ])
  ]),

  ...EditorInterfaceLayoutFactory.createPanel('On value change', [
    ...EditorInterfaceLayoutFactory.outputKey('onValueChange.noEmit'),
    ...EditorInterfaceLayoutFactory.createLabel('Update dependency values'),
    ...EditorInterfaceLayoutFactory.outputArrayCardListKey('onValueChange.updateDependencyValue',
      { $eval: `return { value: 'Update dependency value' }`, dependencies: [] },
      [
        ...EditorInterfaceLayoutFactory.outputKey('onValueChange.updateDependencyValue[].mode', 'Mode'),
        ...EditorInterfaceLayoutFactory.outputKey('onValueChange.updateDependencyValue[].key', 'Key'),
        ...EditorInterfaceLayoutFactory.outputKey('onValueChange.updateDependencyValue[].onLinked'),
        ...EditorInterfaceLayoutFactory.createDivider(),
        ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('onValueChange.updateDependencyValue[].condition.$eval', 'Condition eval'),
        ...EditorInterfaceLayoutFactory.outputKey('onValueChange.updateDependencyValue[].condition.onLinked'),
        ...EditorInterfaceLayoutFactory.createDivider(),
        ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('onValueChange.updateDependencyValue[].value.$eval', 'Value eval'),
        ...EditorInterfaceLayoutFactory.outputKey('onValueChange.updateDependencyValue[].value.onLinked'),
        ...EditorInterfaceLayoutFactory.outputKey('onValueChange.updateDependencyValue[].value.default')
      ]
    )
  ]),

  ...EditorInterfaceLayoutFactory.createPanel('Provider', [
    ...EditorInterfaceLayoutFactory.outputJsfProviderExecutorProperty('', 'provider')
  ]),

  ...EditorInterfaceLayoutFactory.createPanel('Other', [
    // ...EditorInterfaceLayoutFactory.outputKey('$group', 'Groups'),
    ...EditorInterfaceLayoutFactory.outputKey('$comment', 'Developer comments')
  ])
];

export abstract class JsfAbstractProp<Type, TypeString, Handlers> extends JsfAbstractBareProp<TypeString, Handlers> {

  /**
   * property serves as label for the input
   */
  title?: string;

  searchable?: {

    title?: string;

    /**
     * If enabled it will be displayed to user under More button, when using advanced search.
     */
    byUser?: {

      /**
       * Only show search field if specific mode is present.
       */
      $mode?: string;
      enabled?: true;
    }
  };


  /**
   * property is displayed next to the input field to guide user input
   */
  description?: string;

  /**
   * Property sets the initial value of a field
   */
  default?: Type | null;

  advancedDefault?: {
    /**
     * Used to help builder UI
     */
    type: 'query' | '$eval';

    query: string;
    $eval: string;
  };

  /**
   * If true value can be null else null will be converted into undefined. If object has only undefined
   * properties whole section will be converted into
   * @default false
   */
  nullable?: boolean;

  /**
   * The value of this keyword MAY be of any type, including null.
   *
   * An instance validates successfully against this keyword if its value is equal to the value of the keyword.
   */
  const?: Type | null;

  /**
   * If "readOnly" has a value of boolean true, it indicates that the value of the instance is managed exclusively by
   * the owning authority, and attempts by an application to modify the value of this property are expected to be
   * ignored or rejected by that owning authority.
   *
   * An instance document that is marked as "readOnly for the entire document MAY be ignored if sent to the owning
   * authority, or MAY result in an error, at the authority's discretion.
   */
  readOnly?: boolean | {
    /**
     * Eval function body
     */
    $eval: string;
    dependencies: string[];
  };


  /**
   * If "writeOnly" has a value of boolean true, it indicates that the value is never present when the instance is
   * retrieved from the owning authority. It can be present when sent to the owning authority to update or create the
   * document (or the resource it represents), but it will not be included in any updated or newly created version of
   * the instance.
   *
   * An instance document that is marked as "writeOnly" for the entire document MAY be returned as a blank document of
   * some sort, or MAY produce an error upon retrieval, or have the retrieval request ignored, at the authority's
   * discretion.
   *
   * For example, "readOnly" would be used to mark a database-generated serial number as read-only, while "writeOnly"
   * would be used to mark a password input field.
   */
  writeOnly?: boolean;


  /**
   * Option for custom validator. Lambdas are executed in sandbox.
   */
  evalValidators?: {
    errorCodes: {
      code: string;
      message: string;
    }[];

    /**
     * Special props:
     * - $val
     * - $error
     * - $form
     *
     * Example:
     *  if (!$val.firstName || $val.firstName.length !== 6) throw [new $error('prop/is-exact-length', { length: 6 })]
     */

    $evals: string[];


    /**
     * Form value dependencies. You can put asterisk at the end.
     * Example:
     *  - a.b.c
     *  - a.b.c.d.f.g.h
     *  - a.d[]
     *  - a.d[].r.t[].d
     *
     *  If you need * support ask for it.
     */
    dependencies?: string[];
  };
}

export const jsfAbstractPropTranslatableProperties = ['title', 'description', 'searchable.title'];

export const jsfAbstractPropJsfDefinitionSchemaProperties = {
  ...jsfAbstractBarePropJsfDefinitionSchemaProperties,

  title          : {
    type: 'string'
  },
  description    : {
    type: 'string'
  },
  nullable       : {
    type : 'boolean',
    title: 'Allow null value'
  },
  readOnly       : {
    type : 'boolean',
    title: 'Read-only'
  },
  writeOnly      : {
    type : 'boolean',
    title: 'Write-only'
  },
  default        : {
    type: '@@PROP_TYPE'
  },
  const          : {
    type: '@@PROP_TYPE'
  },
  advancedDefault: {
    type      : 'object',
    properties: {
      type : {
        type   : 'string',
        handler: {
          type  : 'common/dropdown',
          values: [
            { label: 'Query', value: 'query' },
            { label: 'Eval', value: '$eval' }
          ]
        }
      },
      query: {
        type: 'string'
      },
      ...EditorInterfaceSchemaFactory.createEvalProperty()
    }
  },

  searchable    : {
    type      : 'object',
    title     : 'Searchable',
    properties: {
      title : {
        type: 'string'
      },
      byUser: {
        type      : 'object',
        title     : 'By user',
        properties: {
          $mode  : {
            type: 'string'
          },
          enabled: {
            type : 'boolean',
            title: 'Searchable enabled'
          }
        }
      }
    }
  },
  evalValidators: {
    type      : 'object',
    properties: {
      errorCodes  : {
        type : 'array',
        items: {
          type      : 'object',
          properties: {
            code   : {
              type : 'string',
              title: 'Code'
            },
            message: {
              type : 'string',
              title: 'Message'
            }
          }
        }
      },
      $evals      : {
        type : 'array',
        items: {
          type   : 'string',
          handler: {
            type    : 'common/code-editor',
            options: {
              language: 'javascript'
            }
          }
        }
      },
      dependencies: {
        type   : 'array',
        handler: {
          type: 'common/chip-list'
        },
        items  : {
          type: 'string'
        }
      }
    }
  }
};

export const jsfAbstractPropJsfDefinitionValidationLayoutItems = [

  ...jsfAbstractBarePropJsfDefinitionValidationLayoutItems
];

export const jsfAbstractPropJsfDefinitionLayoutItems = [
  ...EditorInterfaceLayoutFactory.createPanel('Form Property', [
    ...EditorInterfaceLayoutFactory.outputKey('title', 'Title'),
    ...EditorInterfaceLayoutFactory.outputKey('description', 'Description'),
    {
      type : 'row',
      items: [
        {
          type : 'col',
          xs   : 6,
          items: [
            ...EditorInterfaceLayoutFactory.outputKey('nullable'),
            ...EditorInterfaceLayoutFactory.outputKey('virtual')
          ]
        },
        {
          type : 'col',
          xs   : 6,
          items: [
            ...EditorInterfaceLayoutFactory.outputKey('readOnly'),
            ...EditorInterfaceLayoutFactory.outputKey('writeOnly')
          ]
        }
      ]
    },
    ...EditorInterfaceLayoutFactory.outputKey('default', 'Default value'),
    ...EditorInterfaceLayoutFactory.outputKey('const', 'Constant value'),
    ...EditorInterfaceLayoutFactory.outputKey('searchable.byUser.enabled', null, {
      $mode: ['full']
    }),
    ...EditorInterfaceLayoutFactory.outputKey('searchable.title', 'Searchable title', {
      $mode: ['full']
    }),
    ...EditorInterfaceLayoutFactory.outputKey('searchable.byUser.$mode', 'Searchable mode', {
      $mode: ['full']
    })
  ]),

  ...EditorInterfaceLayoutFactory.createPanel('Advanced default', [
    ...EditorInterfaceLayoutFactory.outputKey('advancedDefault.type', 'Type'),
    {
      type     : 'div',
      visibleIf: {
        $eval       : `return $getItemValue('advancedDefault.type') === 'query'`,
        dependencies: ['advancedDefault.type']
      },
      items    : [
        ...EditorInterfaceLayoutFactory.outputKey('advancedDefault.query', 'Query parameter name')
      ]
    },
    {
      type     : 'div',
      visibleIf: {
        $eval       : `return $getItemValue('advancedDefault.type') === '$eval'`,
        dependencies: ['advancedDefault.type']
      },
      items    : [
        ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('advancedDefault.$eval', 'Eval')
      ]
    }
  ]),

  ...EditorInterfaceLayoutFactory.createPanel('Custom validation', [
    ...EditorInterfaceLayoutFactory.createLabel('Error codes'),
    ...EditorInterfaceLayoutFactory.outputArrayCardListKey(
      'evalValidators.errorCodes',
      { $eval: `return { value: 'Code' }`, dependencies: [] },
      [
        ...EditorInterfaceLayoutFactory.outputKey('evalValidators.errorCodes[].code', 'Code'),
        ...EditorInterfaceLayoutFactory.outputKey('evalValidators.errorCodes[].message', 'Message')
      ]
    ),
    ...EditorInterfaceLayoutFactory.createLabel('Evals'),
    ...EditorInterfaceLayoutFactory.outputArrayCardListKey(
      'evalValidators.$evals',
      { $eval: `return { value: 'Eval' }`, dependencies: [] },
      [
        ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('evalValidators.$evals[]', 'Eval')
      ]
    ),
    ...EditorInterfaceLayoutFactory.outputKey('evalValidators.dependencies', 'Dependencies')
  ]),

  ...jsfAbstractBarePropJsfDefinitionLayoutItems
];
