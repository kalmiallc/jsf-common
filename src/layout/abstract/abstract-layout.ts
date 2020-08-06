import { JsfStyles, JsfUnknownLayout } from '../index';
import { JsfLayoutOnClickInterface }   from '../interfaces/layout-on-click.interface';
import { DefLayout, DefProp, DefExtends, DefSpecialProp }          from '../../jsf-for-jsf/decorators';
import { createDependencyArray } from '../../jsf-for-jsf/util/dependency-array';

@DefLayout({
  type: 'div',
  items: [
    { key: '$comment' }, // string
    // { key: '$mode' },    // string | string[] | {}
    // MODE (object) ↓
    {
      // $mode (object)
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Mode',
          level: 5,
        },
        // {$ eval:}
        { key: '$mode.$eval' }
      ]
    },
    { key: 'id' },       // string
    { key: 'htmlClass' },       // string
    { key: 'htmlOuterClass' },  // string
    // { key: 'preferences' },     // any
    // { key: 'handlerPreferences' },

    // VISIBLE IF ↓
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Visible if',
          level: '5',
        },
        { key: 'visibleIf.$eval' },
        createDependencyArray('visibleIf'),
        createDependencyArray('visibleIf', 'layoutDependencies', 'Layout dependencies')
      ]
    },
    // BUILD IF
    {
      // buildIf (object)
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Build if',
          level: 5,
        },
        { key: 'buildIf.$eval' }
      ]
    },
    // TRANSLATABLE FIELDS ↓
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Translatable fields',
          level: 5
        },
        {
          type: 'array',
          key: 'translatableFields',
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
                            path: 'translatableFields',
                            index: {
                              $eval: `return $getItemIndex('translatableFields[]')`
                            }
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  key: 'translatableFields[]'
                },
              ]
            }
          ]
        },
        {
          type: 'div',
          visibleIf: {
            $eval: `return !$val.translatableFields.length`,
            dependencies: ['translatableFields']
          },
          items: [
            {
              type: 'span',
              htmlClass: 'd-block py-4 text-center',
              title: 'No translatable fields yet.'
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
              title: 'Add translatable field',
              // htmlClass: 't-3',
              onClick: {
                arrayItemAdd: {
                  path: 'translatableFields',
                }
              }
            },
          ]
        }
      ]
    },
    { key: 'onClick' },
    // TOOLTIP ↓
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Tooltip',
          level: 5
        },
        { key: 'tooltip.title' },
        { key: 'tooltip.displayAsTitleAttribute' },
        { key: 'tooltip.position' },
        {
          type: 'heading',
          title: 'Tooltip template eval',
          level: 6,
        },
        {
          key: 'tooltip.templateData.$eval',
        },
        createDependencyArray('tooltip.templateData')
      ]
    },
    // ANALYTICS ↓
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Analytics',
          level: 5
        },
        { key: 'analytics.category' },
        createDependencyArray('analytics', 'track', 'Track events', 'No events yet', 'Add event', ['event', 'as'])
      ]
    }
  ]
})

export abstract class JsfAbstractLayout {

  /**
   * @ignore
   */
  __uuid?: string;

  /**
   * Intended for notes to schema maintainers, as opposed to "description" which is suitable for display to end users
   */
  @DefProp({
    type : 'string',
    title: 'Comment'
  })
  $comment?: string;

  /**
   * Will be rendered only if proper mode exists in doc.$modes.
   * You can use ! to negate.
   *
   * Examples:
   * - ["!new", "role-user"]
   * - "new"
   */
  @DefProp({
      type      : 'object',
      title     : 'Mode',
      properties: {
        $eval       : {
          type : 'string',
          title: 'Eval',
          handler: {
            type: 'common/code-editor',
            options: {
              language: 'javascript',
            }
          }
        },
        dependencies: {
          type : 'string',
          title: 'Dependencies',
        }
      }
    }
  )
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
  @DefProp({
    type : 'string',
    title: 'ID'
  })
  id?: string;

  /**
   * Class applied on the layout router element.
   */
  @DefProp({
    type : 'string',
    title: 'HTML outer class'
  })
  htmlOuterClass?: string;
  /**
   * Class applied on the inner element.
   */
  @DefProp({
    type : 'string',
    title: 'HTML class'
  })
  htmlClass?: string;

  /** @deprecated **/
  @DefProp({
    type : 'string',
    title: 'Label HTML class'
  })
  labelHtmlClass?: string;
  /** @deprecated **/
  @DefProp({
    type : 'string',
    title: 'Field HTML class'
  })
  fieldHtmlClass?: string;

  /**
   * Styles
   * @deprecated
   */
  styles?: JsfStyles;

  /**
   * Theme preferences overrides.
   */
  @DefProp({
    title: 'Theme preferences',
    type: 'object', // FIXME: proper type
    handler: {
      type: 'any'
    },
    properties: {},
    default: {}
  })
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
  @DefProp({
      type      : 'object',
      title     : 'Visible if',
      properties: {
        $eval             : {
          type : 'string',
          title: 'Eval'
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
    }
  )
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

  @DefProp({
    title     : 'Build if',
    type      : 'object',
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
    }
  })
  buildIf?: {
    $eval: string;

    /**
     * @ignore
     */
    $evalTranspiled?: string;
  };

  @DefProp({
    type : 'array',
    title: 'Translatable fields',
    items: {
      type: 'string'
    }
  })
  translatableFields?: string[];

  /**
   * On click trigger. You can also specify an array of actions to run in order.
   */
  @DefProp({  // todo: fixme
    title: 'On click',
    type: 'string'
  })
  onClick?: JsfLayoutOnClickInterface | JsfLayoutOnClickInterface[];

  /**
   * Tooltip message which will be displayed on hover.
   */
  @DefProp({
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
          },
        }
      },
      position               : {
        type       : 'string',
        title      : 'Tooltip position',
        // description: 'Choose above, below, left, right, before or after',
        handler: {
          type: 'common/dropdown',
          values: [
            {value: 'above', label: 'Above'},
            {value: 'below', label: 'Below'},
            {value: 'left', label: 'Left'},
            {value: 'right', label: 'Right'},
            {value: 'above', label: 'Before'},
            {value: 'after', label: 'After'}
          ]
        }
      },
      displayAsTitleAttribute: {
        type : 'boolean',
        title: 'Display as title attribute'
      }
    }
  })
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
  @DefProp({
    title: 'Analytics',
    type: 'object',
    properties: {
      category: {
        type: 'string',
        title: 'Category'
      },
      track: {
        type: 'array',
        title: 'Track',
        items: {
          type: 'object',
          properties: {
            event: {
              type: 'string',
              title: 'Event'
            },
            as: {
              type: 'string',
              title: 'Track as'
            }
          }
        }
      }
    }
  })
  analytics ? : {
    category: string;
    track: Array<string | { event: string, as: string }>
  };
}

@DefLayout({
  type: 'div',
  items: [
  //  { key: 'type' },
    { key: 'items' },
    { key: 'key'}
  ]
})
@DefExtends('JsfAbstractLayout')
export abstract class JsfAbstractSpecialLayout<Type> extends JsfAbstractLayout {
  @DefProp({
    type : 'string',
    title: 'Type',
    const: 'CHANGE_ME'
  })
  type: Type;

  @DefProp({
    type : 'null',
    title: 'Items'
  })
  items?: never;

  @DefProp({
    type : 'null',
    title: 'Key'
  })
  key?: never;
}

@DefLayout({
  type: 'div',
  items: [
    { key: 'key' },
    { key: 'notitle' },
    { key: 'placeholder' }
  ]
})
@DefExtends('JsfAbstractLayout')
export abstract class JsfAbstractPropLayout extends JsfAbstractLayout {
  @DefProp({
    type: 'string',
    title: 'Key'
  })
  key: string;

  @DefProp({
    type: 'boolean',
    title: 'No title?'
  })
  notitle?: boolean;

  @DefProp({
    type: 'string',
    title: 'Placeholder'
  })
  placeholder?: string;
}

@DefLayout({
  type: 'div',
  items: [
    { key: 'items' }
  ]
})
@DefExtends('JsfAbstractLayout')
export abstract class JsfAbstractItemsLayout<Type> extends JsfAbstractLayout {
  @DefProp({
    type : 'null',
    title: 'Key'
  })
  key?: never;

  @DefProp({
    type : 'string',
    title: 'Type',
    const: 'CHANGE_ME' // will be changed in jsf4jsf
  })
  type: Type;

  @DefSpecialProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];
}
