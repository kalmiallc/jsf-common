import { JsfProp, JsfPropTypes }        from '../index';
import { JsfProviderExecutorInterface } from '../../providers';
import { JsfValueOptionsInterface }     from '../../layout/interfaces/value-options.type';

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
}

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

  virtual?: boolean;

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
