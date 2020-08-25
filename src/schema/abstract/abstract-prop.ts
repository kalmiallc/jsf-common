import { JsfProp, JsfPropTypes }          from '../index';
import { DefExtends, DefLayout, DefProp, DefCategory } from '../../jsf-for-jsf/decorators';
import { JsfProviderExecutorInterface }   from '../../providers';
import { JsfValueOptionsInterface } from '../../layout/interfaces/value-options.type';

export type JsfUnknownProp = JsfAbstractBareProp<JsfPropTypes, any>;

@DefLayout({
  type : 'div',
  items: [
    {
      key: '$comment'
    },
    {
      key: '$group'
    },
    {
      key: 'virtual'
    },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Enabled if',
          level: 5
        },
        {
          key: 'enabledIf.$eval',
          handler: {
            type: 'common/code-editor',
            options: {
              language: 'javascript'
            }
          }
        },
        {
          key: 'enabledIf.dependencies'
        }
      ]
    },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'On value change',
          level: 5
        },
        {
          key: 'onValueChange.noEmit'
        },
        {
          type: 'div',
          htmlClass: 'ml-2 mt-3',
          items: [
            {
              type: 'heading',
              title: 'Update dependency value',
              level: 5
            },
            {
              key: 'onValueChange.updateDependencyValue.mode'
            },
            {
              key: 'onValueChange.updateDependencyValue.key'
            },
            {
              key: 'onValueChange.updateDependencyValue.onLinked'
            },
            {
              type: 'div',
              htmlClass: 'ml-2 mt-3',
              items: [
                {
                  type: 'heading',
                  title: 'Condition',
                  level: 5
                },
                {
                  key: 'onValueChange.updateDependencyValue.condition.onLinked'
                },
                {
                  key: 'onValueChange.updateDependencyValue.condition.$eval'
                }
              ]
            },
            {
              type: 'div',
              htmlClass: 'ml-2 mt-3',
              items: [
                {
                  type: 'heading',
                  title: 'Value',
                  level: 5
                },
                {
                  key: 'onValueChange.updateDependencyValue.value.onLinked'
                },
                {
                  key: 'onValueChange.updateDependencyValue.value.$eval'
                },
                {
                  key: 'onValueChange.updateDependencyValue.value.default'
                }
              ]
            },
          ]
        }
      ]
    }


  ]
})
export abstract class JsfAbstractBareProp<TypeString, Handlers> {

  /**
   * @ignore
   */
  id?: string;

  /**
   * Intended for notes to schema maintainers, as opposed to "description" which is suitable for display to end users.
   */
  @DefProp({
    type : 'string',
    title: 'Comment'
  })
  $comment?: string;

  /**
   * Intended for grouping props together.
   */
  @DefProp([
    {
      type : 'string',
      title: 'Group'
    },
    {
      type : 'array',
      title: 'Group',
      items: [
        {
          type: 'string'
        }
      ]
    }
  ])
  $group?: string | string[];

  /**
   * Overwrites default behaviour.
   */
  @DefProp('Handlers')
  handler?: Handlers;

  /**
   * If provider is set then it will be used to provide the value for this prop.
   */
  @DefProp('JsfProviderExecutorInterface')
  provider?: JsfProviderExecutorInterface;

  /**
   * If true, API will ignore this field. Only similar behaviour is with JsfObject source property.
   */
  @DefProp({
    type : 'boolean',
    title: 'Virtual'
  })
  virtual?: boolean;

  /**
   * Intended for grouping props together.
   */
  @DefProp({
    type : 'object',
    properties: {
      type: { type: 'string'}
    }
  })
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
  @DefProp('TypeString')
  type: TypeString;

  /**
   * Eval string.
   *
   * Special props:
   * - $val
   * - $form
   * Expected output boolean.
   */
  @DefProp([
    {
      type      : 'object',
      title     : 'Enabled if',
      properties: {
        $eval       : {
          type : 'string',
          title: 'Eval',
          handler: {
            type: 'common/code-editor',
            options: {
              language: 'javascript'
            }
          }
        },
        dependencies: {
          type : 'array',
          title: 'Dependencies',
          items: {
            type: 'string'
          }
        }
      }
    },
    {
      type : 'string',
      title: 'Enabled if'
    }
  ])
  enabledIf ? : string | {
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
   * Change other prop value when this value changes
   */
  @DefProp({
    type      : 'object',
    title     : 'On value change',
    properties: {
      noEmit               : {
        type : 'boolean',
        title: 'No emit'
      },
      updateDependencyValue: {
        type      : 'object',
        title     : 'Update dependency value',
        properties: {
          mode     : {
            type       : 'string',
            title      : 'Mode',
            description: 'Choose set or patch'
          },
          key      : {
            type : 'string',
            title: 'Key'
          },
          onLinked : {
            type : 'boolean',
            title: 'On linked'
          },
          condition: {
            type      : 'object',
            title     : 'Condition',
            properties: {
              onLinked: {
                type : 'boolean',
                title: 'On linked'
              },
              $eval   : {
                type : 'string',
                title: 'Eval',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              },
            }
          },
          value    : {
            type      : 'object',
            title     : 'Condition',
            properties: {
              onLinked: {
                type : 'boolean',
                title: 'On linked'
              },
              $eval   : {
                type : 'string',
                title: 'Eval',
                handler: {
                  type: 'common/code-editor',
                  options: {
                    language: 'javascript'
                  }
                }
              },
              default : {
                type : 'boolean',
                title: 'Default',
                const: true
              }
            }
          }
        }
      }
    }
  })
  onValueChange ? : {
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
}

@DefLayout({
  type : 'div',
  items: [
    {
      key: 'title'
    },
    {
      key: 'default',
    },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Searchable',
          level: 5
        },
        {
          key: 'searchable.title'
        },
        {
          type: 'div',
          htmlClass: 'ml-2 mt-3',
          items: [
            {
              type: 'heading',
              title: 'By user',
              level: 5
            },
            {
              key: 'searchable.byUser.$mode'
            },
            {
              key: 'searchable.byUser.enabled'
            }
          ]
        },
      ]
    },

    {
      key: 'description'
    },
    {
      key: 'readOnly'
    },
    {
      key: 'writeOnly'
    },
    {
      // EVAL VALIDATORS
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Eval validators',
          level: 5
        },
        // ERROR CODES
        {
          type: 'div',
          htmlClass: 'ml-2 mt-3',
          items: [
            {
              type: 'heading',
              title: 'Error codes',
              level: 5
            },
            {
              type: 'array',
              key: 'evalValidators.errorCodes',
              items: [
                {
                  type: 'expansion-panel-content',
                  items: [
                    {
                      type: 'hr'
                    },
                    {
                      type: 'div',
                      htmlClass: 'd-flex justify-content-between',
                      items: [
                        {
                          type: 'div',
                        },
                        {
                          type: 'button',
                          icon: 'delete',
                          color: 'accent',
                          preferences: {
                            variant: 'icon'
                          },
                          onClick: [
                            {
                              arrayItemRemove: {
                                path: 'evalValidators.errorCodes',
                                index: {
                                  $eval: `return $getItemIndex('evalValidators.errorCodes[]')`
                                }
                              }
                            }
                          ]
                        }
                      ]
                    },
                    {
                      key: 'evalValidators.errorCodes[].code'
                    },
                    {
                      key: 'evalValidators.errorCodes[].message'
                    }
                  ]
                }
              ]
            },
            {
              type: 'div',
              visibleIf: {
                $eval: `return !$val.evalValidators.errorCodes.length`,
                dependencies: ['evalValidators']
              },
              items: [
                {
                  type: 'span',
                  htmlClass: 'd-block py-4 text-center',
                  title: 'No error codes yet.'
                }
              ]
            },
            {
              type: 'row',
              horizontalAlign: 'center',
              htmlClass: 'mt-2',
              items: [
                {
                  type: 'button',
                  title: 'Add error code',
                  // htmlClass: 't-3',
                  onClick: {
                    arrayItemAdd: {
                      path: 'evalValidators.errorCodes',
                    }
                  }
                },
              ]
            }
          ]
        },
        // EVALS
        {
          type: 'div',
          htmlClass: 'ml-2 mt-3',
          items: [
            {
              type: 'heading',
              title: 'Evals',
              level: 5
            },
            {
              type: 'array',
              key: 'evalValidators.$evals',
              items: [
                {
                  type: 'expansion-panel-content',
                  items: [
                    {
                      type: 'hr'
                    },
                    {
                      type: 'div',
                      htmlClass: 'd-flex justify-content-between',
                      items: [
                        {
                          type: 'div',
                        },
                        {
                          type: 'button',
                          icon: 'delete',
                          color: 'accent',
                          preferences: {
                            variant: 'icon'
                          },
                          onClick: [
                            {
                              arrayItemRemove: {
                                path: 'evalValidators.$evals',
                                index: {
                                  $eval: `return $getItemIndex('evalValidators.$evals[]')`
                                }
                              }
                            }
                          ]
                        }
                      ]
                    },
                    {
                      key: 'evalValidators.$evals[]',
                      handler: {
                        type: 'common/code-editor',
                        options: {
                          language: 'javascript'
                        }
                      }
                    },
                  ]
                }
              ]
            },
            {
              type: 'div',
              visibleIf: {
                $eval: `return !$val.evalValidators.$evals.length`,
                dependencies: ['evalValidators']
              },
              items: [
                {
                  type: 'span',
                  htmlClass: 'd-block py-4 text-center',
                  title: 'No evals yet.'
                }
              ]
            },
            {
              type: 'row',
              horizontalAlign: 'center',
              htmlClass: 'mt-2',
              items: [
                {
                  type: 'button',
                  title: 'Add validator eval',
                  // htmlClass: 't-3',
                  onClick: {
                    arrayItemAdd: {
                      path: 'evalValidators.$evals',
                    }
                  }
                },
              ]
            }
          ]
        },
        // Dependencies
        {
          type: 'div',
          htmlClass: 'ml-2 mt-3',
          items: [
            {
              type: 'heading',
              title: 'Dependencies',
              level: 5
            },
            {
              type: 'array',
              key: 'evalValidators.dependencies',
              items: [
                {
                  type: 'expansion-panel-content',
                  items: [
                    {
                      type: 'hr'
                    },
                    {
                      type: 'div',
                      htmlClass: 'd-flex justify-content-between',
                      items: [
                        {
                          type: 'div',
                        },
                        {
                          type: 'button',
                          icon: 'delete',
                          color: 'accent',
                          preferences: {
                            variant: 'icon'
                          },
                          onClick: [
                            {
                              arrayItemRemove: {
                                path: 'evalValidators.dependencies',
                                index: {
                                  $eval: `return $getItemIndex('evalValidators.dependencies[]')`
                                }
                              }
                            }
                          ]
                        }
                      ]
                    },
                    {
                      key: 'evalValidators.dependencies[]'
                    },
                  ]
                }
              ]
            },
            {
              type: 'div',
              visibleIf: {
                $eval: `return !$val.evalValidators.dependencies.length`,
                dependencies: ['evalValidators']
              },
              items: [
                {
                  type: 'span',
                  htmlClass: 'd-block py-4 text-center',
                  title: 'No dependencies yet.'
                }
              ]
            },
            {
              type: 'row',
              horizontalAlign: 'center',
              htmlClass: 'mt-2',
              items: [
                {
                  type: 'button',
                  title: 'Add dependency',
                  // htmlClass: 't-3',
                  onClick: {
                    arrayItemAdd: {
                      path: 'evalValidators.dependencies',
                    }
                  }
                },
              ]
            }
          ]
        },
      ]
    }
  ]
})

@DefExtends('JsfAbstractBareProp')
export abstract class JsfAbstractProp<Type, TypeString, Handlers> extends JsfAbstractBareProp<TypeString, Handlers> {

  /**
   * property serves as label for the input
   */
  @DefProp({
    type : 'string',
    title: 'Title'
  })
  title?: string;

  @DefProp({
    type      : 'object',
    title     : 'Searchable',
    properties: {
      title : {
        type : 'string',
        title: 'Title'
      },
      byUser: {
        type      : 'object',
        title     : 'By user',
        properties: {
          $mode  : {
            type : 'string',
            title: 'Mode'
          },
          enabled: {
            type : 'boolean',
            title: 'Enabled',
            const: true
          }
        }
      }
    }
  })
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
  @DefProp({
    type : 'string',
    title: 'Description'
  })
  description?: string;

  /**
   * Property sets the initial value of a field
   */
  @DefProp({
    type: 'CHANGE_ME' as any, // will be changed in jsf4jsf
    title: 'Default value'
  })
  default?: Type | null;

  advancedDefault?:  {
    /**
     * Used to help builder UI
     */
    type: 'query' | '$eval';

    query: string;
    $eval: string;
  };

  /**
   * The value of this keyword MAY be of any type, including null.
   *
   * An instance validates successfully against this keyword if its value is equal to the value of the keyword.
   */
  @DefProp('Type')
  const?: Type | null;

  /**
   * If "readOnly" has a value of boolean true, it indicates that the value of the instance is managed exclusively by
   * the owning authority, and attempts by an application to modify the value of this property are expected to be
   * ignored or rejected by that owning authority.
   *
   * An instance document that is marked as "readOnly for the entire document MAY be ignored if sent to the owning
   * authority, or MAY result in an error, at the authority's discretion.
   */
  @DefProp([
    {
      type : 'boolean',
      title: 'Read only'
    },
    {
      type      : 'object',
      title     : 'Read only',
      properties: {
        $eval       : {
          type : 'string',
          title: 'Eval',
          handler: {
            type: 'common/code-editor',
            options: {
              language: 'javascript'
            }
          }
        },
        dependencies: {
          type : 'array',
          title: 'Dependencies',
          items: [
            {
              type: 'string'
            }
          ]
        },
      }
    }
  ])
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
  @DefProp({
    type : 'boolean',
    title: 'Write only'
  })
  writeOnly?: boolean;


  /**
   * Option for custom validator. Lambdas are executed in sandbox.
   */
  @DefProp({
    type      : 'object',
    title     : 'Eval validators',
    properties: {
      errorCodes  : {
        type      : 'array',
        title     : 'Error codes',
        items: {
          type: 'object',
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
        title: 'Evals',
        items: {
          type: 'string',
          handler: {
            type: 'common/code-editor',
            language: 'javascript'
          }
        }
      },
      dependencies: {
        type : 'array',
        title: 'Dependencies',
        items:
          {
            type: 'string'
          }

      }
    }
  })
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
