import { JsfLayoutOnClickInterface, JsfStyles, JsfUnknownLayout } from '../index';
import { EditorInterfaceSchemaFactory }                           from '../../editor/helpers/editor-factory/editor-interface-schema-factory';
import { EditorInterfaceLayoutFactory }                           from '../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { CodeEditorKeyIconType }                                  from '../../editor/helpers/editor-factory/layout/code-editor-key';

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
    type   : 'array',
    title  : 'Mode',
    handler: {
      type: 'common/chip-list'
    },
    items  : {
      type: 'string'
    }
  },
  id                : {
    type: 'string'
  },
  htmlOuterClass    : {
    type: 'string'
  },
  htmlClass         : {
    type: 'string'
  },
  visibleIf         : {
    type      : 'object',
    properties: {
      ...EditorInterfaceSchemaFactory.createEvalPropertyWithDependenciesAndLayoutDependencies()
    }
  },
  buildIf           : {
    title     : 'Build if',
    type      : 'object',
    properties: {
      ...EditorInterfaceSchemaFactory.createEvalProperty()
    }
  },
  translatableFields: {
    type   : 'array',
    handler: {
      type: 'common/chip-list'
    },
    items  : {
      type: 'string'
    }
  },
  tooltip           : {
    type      : 'object',
    title     : 'Tooltip',
    properties: {
      title                  : {
        type: 'string'
      },
      templateData           : {
        type      : 'object',
        title     : 'Template data',
        properties: {
          ...EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
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
              value: 'before',
              label: 'Before'
            },
            {
              value: 'after',
              label: 'After'
            }
          ]
        },
        default: 'Above'
      },
      displayAsTitleAttribute: {
        type   : 'boolean',
        title  : 'Display as title attribute',
        default: false
      }
    }
  },
  // TODO
  onClick           : {
    title: 'On click',
    type : 'string'
  }
};

export const jsfAbstractLayoutJsfDefinitionLayoutItems = [{
  type : 'div',
  items: [
    ...EditorInterfaceLayoutFactory.createPanel('Common', [
      ...EditorInterfaceLayoutFactory.outputKey('htmlClass', 'HTML class'),
      ...EditorInterfaceLayoutFactory.outputKey('htmlOuterClass', 'HTML outer class'),
    ]),
    ...EditorInterfaceLayoutFactory.createPanel('Visibility', [
      ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('visibleIf.$eval', 'Visibility condition', CodeEditorKeyIconType.Eval),
      ...EditorInterfaceLayoutFactory.outputKey('visibleIf.dependencies', 'Dependencies'),
      ...EditorInterfaceLayoutFactory.outputKey('visibleIf.layoutDependencies', 'Layout dependencies')
    ]),
    ...EditorInterfaceLayoutFactory.createPanel('Click Actions', [
      // TODO
    ]),
    ...EditorInterfaceLayoutFactory.createPanel('Tooltip', [
      ...EditorInterfaceLayoutFactory.outputKey('tooltip.title', 'Tooltip title'),
      ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('tooltip.templateData.$eval', 'Tooltip template data'),
      ...EditorInterfaceLayoutFactory.outputKey('tooltip.templateData.dependencies', 'Dependencies'),
      ...EditorInterfaceLayoutFactory.outputKey('tooltip.position', 'Position'),
      ...EditorInterfaceLayoutFactory.outputKey('tooltip.displayAsTitleAttribute')
    ]),
    ...EditorInterfaceLayoutFactory.createPanel('Misc', [
      ...EditorInterfaceLayoutFactory.outputKey('$mode', 'Modes'),
      ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('buildIf.$eval', 'Build condition', CodeEditorKeyIconType.Eval),
      ...EditorInterfaceLayoutFactory.outputKey('id', 'Layout ID'),
      ...EditorInterfaceLayoutFactory.outputKey('$comment', 'Developer comments')
    ])
  ]
}];

/**********************************
 * JSF Abstract Special Layout
 **********************************/
export abstract class JsfAbstractSpecialLayout<Type> extends JsfAbstractLayout {
  type: Type;

  items?: never;

  key?: never;
}

export const jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties = jsfAbstractLayoutJsfDefinitionSchemaProperties;
export const jsfAbstractSpecialLayoutJsfDefinitionLayoutItems      = jsfAbstractLayoutJsfDefinitionLayoutItems;

/**********************************
 * JSF Abstract Prop Layout
 **********************************/
export abstract class JsfAbstractPropLayout extends JsfAbstractLayout {
  key: string;

  // FIXME: Does anyone even use this?
  notitle?: boolean;

  placeholder?: string;
}

export const jsfAbstractPropLayoutJsfDefinitionSchemaProperties = jsfAbstractLayoutJsfDefinitionSchemaProperties;
export const jsfAbstractPropLayoutJsfDefinitionLayoutItems      = [{
  type : 'div',
  items: [
    ...EditorInterfaceLayoutFactory.createPanel('Placeholder', [
      ...EditorInterfaceLayoutFactory.outputKey('placeholder', 'Placeholder')
    ]),
    ...jsfAbstractLayoutJsfDefinitionLayoutItems[0].items
  ]
}];

/**********************************
 * JSF Abstract Items Layout
 **********************************/
export abstract class JsfAbstractItemsLayout<Type> extends JsfAbstractLayout {
  key?: never;

  type: Type;

  items: JsfUnknownLayout[];
}

export const jsfAbstractItemsLayoutJsfDefinitionSchemaProperties = jsfAbstractLayoutJsfDefinitionSchemaProperties;
export const jsfAbstractItemsLayoutJsfDefinitionLayoutItems      = jsfAbstractLayoutJsfDefinitionLayoutItems;
