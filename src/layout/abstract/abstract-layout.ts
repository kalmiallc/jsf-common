import { JsfLayoutOnClickInterface, JsfStyles, JsfUnknownLayout } from '../index';

/**********************************
 * JSF Abstract Layout
 **********************************/
export abstract class JsfAbstractLayout {

  /**
   * Intended for notes to schema maintainers, as opposed to "description" which is suitable for display to end users
   */
  $comment?: string;

  /**
   * Will be rendered only if proper mode exists in doc.$modes.
   * You can use ! to negate.
   *
   * Examples:
   * - ["!new", "role-user"]
   * - "new"
   */
  $mode?: string | string[] | {
    /**
     * Return true or false, only input available is $modes (list of modes).
     * Example: `return $modes.indexOf('public') > -1 && $modes.indexOf('new') === -1`
     */
    $eval: string;
    $evalTranspiled?: string;
  };

  /**
   * ID for this layout element. Similar to HTML id selector.
   */
  id?: string;

  /**
   * Class applied on the layout router element.
   */
  htmlOuterClass?: string;
  /**
   * Class applied on the inner element.
   */
  htmlClass?: string;

  /** @deprecated **/
  labelHtmlClass?: string;
  /** @deprecated **/
  fieldHtmlClass?: string;

  /**
   * Styles
   * @deprecated
   */
  styles?: JsfStyles;

  /**
   * Theme preferences overrides.
   */
  preferences?: any;

  /**
   * Handler preferences overrides.
   */
  // @DefProp({
  //   title: 'Handler preferences',
  //   type: 'object', // FIXME: proper type
  //   handler: {
  //     type: 'any'
  //   }
  // })
  handlerPreferences?: any;


  /**
   * Eval string.
   *
   * Special props:
   * - $val
   * - $form
   * Expected output boolean.
   */
  visibleIf?: string | {
    /**ay
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

    /**
     * Id of layout.
     */
    layoutDependencies: string[];
  };

  buildIf?: {
    $eval: string;

    /**
     * @ignore
     */
    $evalTranspiled?: string;
  };

  translatableFields?: string[];

  /**
   * On click trigger. You can also specify an array of actions to run in order.
   */
  onClick?: JsfLayoutOnClickInterface | JsfLayoutOnClickInterface[];

  /**
   * Tooltip message which will be displayed on hover.
   */
  tooltip?: string | {
    /**
     * Tooltip text
     */
    title: string;
    /**
     * Template data for `text` property
     */
    templateData?: {
      $eval: string;
      dependencies?: string[]
    };
    /**
     * Position of the tooltip
     */
    position?: 'above' | 'below' | 'left' | 'right' | 'before' | 'after';
    /**
     * Flag indicating whether the tooltip should be displayed as the html `title` attribute
     */
    displayAsTitleAttribute: boolean;
  };

  /**
   * Analytics events to track.
   *
   * `category` is the name/description of the layout item.
   * `track` can be either names of the layout item's events, or an object containing
   * the event name you wish to track and a more user-friendly name to use when sending it
   * to the analytics vendor.
   */
  analytics ?: {
    category: string;
    track: Array<string | { event: string, as: string }>
  };
}
export const jsfAbstractLayoutJsfDefinitionSchemaProperties = {
  $comment          : {
    type     : 'string',
    multiline: 3
  },
  $mode             : {
    type : 'array',
    title: 'Mode',
    items: {
      type: 'string'
    }
  },
  id                : {
    type : 'string',
    title: 'ID'
  },
  htmlOuterClass    : {
    type : 'string',
    title: 'HTML outer class'
  },
  htmlClass         : {
    type : 'string',
    title: 'HTML class'
  },
  labelHtmlClass    : {
    type : 'string',
    title: 'Label HTML class'
  },
  fieldHtmlClass    : {
    type : 'string',
    title: 'Field HTML class'
  },
  preferences       : {
    title     : 'Theme preferences',
    type      : 'object',
    handler   : {
      type: 'any'
    },
    properties: {},
    'default' : {}
  },
  visibleIf         : {
    type      : 'object',
    title     : 'Visible if',
    properties: {
      $eval             : {
        type   : 'string',
        title  : 'Eval',
        handler: {
          type       : 'common/code-editor',
          preferences: {
            language: 'javascript'
          }
        }
      },
      dependencies      : {
        type : 'array',
        title: 'Dependencies',
        items: {
          type: 'string'
        }
      },
      layoutDependencies: {
        type : 'array',
        title: 'Layout dependencies',
        items: {
          type: 'string'
        }
      }
    }
  },
  buildIf           : {
    title     : 'Build if',
    type      : 'object',
    properties: {
      $eval: {
        type   : 'string',
        title  : 'Eval',
        handler: {
          type   : 'common/code-editor',
          options: {
            language: 'javascript'
          }
        }
      }
    }
  },
  translatableFields: {
    type : 'array',
    title: 'Translatable fields',
    items: {
      type: 'string'
    }
  },
  onClick           : {
    title: 'On click',
    type : 'string'
  },
  tooltip           : {
    type      : 'object',
    title     : 'Tooltip',
    properties: {
      title                  : {
        type : 'string',
        title: 'Title'
      },
      templateData           : {
        type      : 'object',
        title     : 'Template data',
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
            type : 'array',
            title: 'Dependencies',
            items: {
              type: 'string'
            }
          }
        }
      },
      position               : {
        type   : 'string',
        title  : 'Tooltip position',
        handler: {
          type  : 'common/dropdown',
          values: [
            {
              value: 'above',
              label: 'Above'
            },
            {
              value: 'below',
              label: 'Below'
            },
            {
              value: 'left',
              label: 'Left'
            },
            {
              value: 'right',
              label: 'Right'
            },
            {
              value: 'above',
              label: 'Before'
            },
            {
              value: 'after',
              label: 'After'
            }
          ]
        }
      },
      displayAsTitleAttribute: {
        type : 'boolean',
        title: 'Display as title attribute'
      }
    }
  },
  analytics         : {
    title     : 'Analytics',
    type      : 'object',
    properties: {
      category: {
        type : 'string',
        title: 'Category'
      },
      track   : {
        type : 'array',
        title: 'Track',
        items: {
          type      : 'object',
          properties: {
            event: {
              type : 'string',
              title: 'Event'
            },
            'as' : {
              type : 'string',
              title: 'Track as'
            }
          }
        }
      }
    }
  }
};


/**********************************
 * JSF Abstract Special Layout
 **********************************/
export abstract class JsfAbstractSpecialLayout<Type> extends JsfAbstractLayout {
  type: Type;

  items?: never;

  key?: never;
}

/**********************************
 * JSF Abstract Prop Layout
 **********************************/
export abstract class JsfAbstractPropLayout extends JsfAbstractLayout {
  key: string;

  notitle?: boolean;

  placeholder?: string;
}

/**********************************
 * JSF Abstract Items Layout
 **********************************/
export abstract class JsfAbstractItemsLayout<Type> extends JsfAbstractLayout {
  key?: never;

  type: Type;

  items: JsfUnknownLayout[];
}
export const jsfAbstractItemsLayoutJsfDefinitionSchemaProperties = {
};
export const jsfAbstractItemsLayoutJsfDefinitionLayoutItems = [];
