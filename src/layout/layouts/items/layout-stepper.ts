import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfLayoutStep
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'stepper',
  title       : 'Stepper',
  category    : 'Layout',
  icon        : 'layout-icons/stepper.svg',
  items       : {
    enabled     : true,
    default     : ['step', 'step', 'step'],
    allowedTypes: ['step']
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutStepper extends JsfAbstractItemsLayout<'stepper'> {

  items: JsfLayoutStep[];

  variant?: 'horizontal' | 'vertical';

  linear?: boolean;

  primary?: boolean;

  preferences?: JsfLayoutStepperPreferences;

  initialStep?: number | {
    $eval: string;
  };

  // Event - step change
  onStepChange?: {
    $eval: string;
  };

  constructor(data: JsfLayoutStepper) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutStepperPreferences {
  /**
   * Stepper variant.
   */
  appearance: 'standard' | 'compact';
  /**
   * Define the position of the labels.
   * Only available for horizontal-type stepper.
   */
  labelPosition?: 'end' | 'bottom';
  /**
   * Define the position of the step header.
   */
  stepHeaderPosition: 'start' | 'end';
  /**
   * Name of a material icon to use as the edit icon.
   * See https://material.io/tools/icons/
   */
  editIcon: string;
  /**
   * Name of a material icon to use as the done icon.
   * See https://material.io/tools/icons/
   */
  doneIcon: string;
}

export const layoutStepperJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      variant     : {
        type       : 'string',
        title      : 'Variant',
        description: 'Choose stepper to be horizontal or vertical.',
        handler    : {
          type  : 'common/button-toggle',
          values: [
            {
              label: 'Horizontal',
              value: 'horizontal'
            },
            {
              label: 'Vertical',
              value: 'vertical'
            }
          ]
        },
        required   : true,
        'default'  : 'horizontal'
      },
      linear      : {
        type: 'boolean'
      },
      primary     : {
        type: 'boolean'
      },
      initialStep : {
        type      : 'object',
        handler   : {
          type: 'any'
        },
        properties: {}
      },
      onStepChange: {
        type      : 'object',
        title     : 'On step change',
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
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Stepper', [
          {
            type : 'div',
            items: [
              {
                type : 'heading',
                level: 5,
                title: 'Orientation'
              },
              {
                key      : 'variant',
                htmlClass: 'mb-3'
              },
              {
                type     : 'row',
                htmlClass: 'mb-3',
                items    : [
                  {
                    type : 'col',
                    xs   : 6,
                    items: [
                      {
                        type : 'heading',
                        level: 5,
                        title: 'Linear'
                      },
                      {
                        key        : 'linear',
                        htmlClass  : 'h5',
                        preferences: {
                          variant: 'slider'
                        }
                      }
                    ]
                  },
                  {
                    type : 'col',
                    xs   : 6,
                    items: [
                      {
                        type : 'heading',
                        level: 5,
                        title: 'Primary'
                      },
                      {
                        key        : 'primary',
                        htmlClass  : 'h5',
                        preferences: {
                          variant: 'slider'
                        }
                      }
                    ]
                  }
                ]
              },
              {
                type     : 'div',
                htmlClass: 'mb-3',
                items    : [
                  {
                    type : 'heading',
                    level: 5,
                    title: 'Step to initialize on'
                  },
                  {
                    type : 'span',
                    title: 'Determine on:'
                  },
                  {
                    key: '_initialStep.initStepType'
                  },
                  {
                    key      : '_initialStep.initStepNumber',
                    htmlClass: 'mt-1',
                    visibleIf: {
                      $eval       : 'return ($val._initialStep.initStepType == \'number\');',
                      dependencies: [
                        '_initialStep.initStepType'
                      ]
                    }
                  },
                  {
                    key      : '_initialStep.initStepCustom.$eval',
                    visibleIf: {
                      $eval       : 'return ($val._initialStep.initStepType == \'custom\');',
                      dependencies: [
                        '_initialStep.initStepType'
                      ]
                    }
                  }
                ]
              },
              {
                type     : 'div',
                htmlClass: '',
                items    : [
                  {
                    type : 'heading',
                    title: 'On step change',
                    level: 5
                  },
                  {
                    key: 'onStepChange.$eval'
                  }
                ]
              }
            ]
          }
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('stepper', layoutInfo, layoutStepperJsfDefinition);
