export interface LayoutBuilderInfoInterface {
  /**
   * Type of layout.
   */
  type: string;

  /**
   * Nice title for builder UI. If not set type will be used.
   */
  title?: string;

  /**
   * Used in builder when creating new layout if not set it's automatically constructed.
   */
  defaultDefinition?: any,

  formControl?: {
    /**
     * If this layout supports `key` property.
     *
     * Interaction with form (schema) props.
     */
    enabled: boolean;

    /**
     * Limit compatibility of supported prop types.
     *
     * @example For example table can only be added on array prop.
     */
    allowedTypes?: string[];
  };

  items?: {
    /**
     * If items are supported.
     */
    enabled: boolean;

    /**
     * When creating new layout, what should be default items.
     */
    default?: string[];

    /**
     * Only listed items are allowed in exact order in number. `defaultItems` is ignored.
     *
     * Note: 'fixed' and 'allowedTypes' are exclusive.
     *
     * @example For expansion-panel children would be
     *  fixedItems: [ 'expansion-panel-header', 'expansion-panel-content' ]
     */
    fixed?: string[];

    /**
     * Limit what types of items can be added.
     *
     * Note: 'fixed' and 'allowedTypes' are exclusive.
     */
    allowedTypes?: string[];
  };

  /**
   * Information about this layout's parent.
   */
  parent?: {
    /**
     * Limit what type of parent this layout can be attached to.
     */
    allowedTypes?: string[];
  }

  /**
   * Icon for builder UI (toolbox).
   * @example layout-icons/span.svg
   */
  icon?: string;
}

//// DEV DRAFT 0.1 EXAMPLES
// filter: ['expansion-panel-header', 'expansion-panel-content'];
// filter: ['*'];
// filter: ['{expansion-panel-header, expansion-panel-content}*'];
/*
const row = {
  type: 'row',

  supportsItems: true,
  defaultItems: ['col'],
  allowedItems: ['col']
}

const expansionPanel = {
  type: 'expansion-panel',

  supportsItems: true,
  fixedItems: ['expansion-panel-header', 'expansion-panel-content'],
}

const stepper = {
  type: 'stepper',

  supportsItems: true,
  defaultItems: ['step', 'step', 'step'],
  allowedItems: ['step']
}

const step = {
  type: 'step',
  supportsItems: true
}
*/
