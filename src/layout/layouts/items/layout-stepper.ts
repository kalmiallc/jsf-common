import { LayoutInfoInterface }                                 from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfLayoutStep
}                                                              from '../../../layout';
import { EditorInterfaceLayoutFactory }                        from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                                         from '../../../register';
import { CodeEditorKeyIconType, EditorInterfaceSchemaFactory } from '../../../editor/helpers/editor-factory';

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
        default: 'horizontal'
      },

      linear      : {
        type: 'boolean',
        title: 'Linear',
      },

      primary     : {
        type: 'boolean',
        title: 'Primary'
      },

      initialStep : {
        type      : 'object',
        properties: {
          ...EditorInterfaceSchemaFactory.createEvalProperty()
        }
      },

      onStepChange: {
        type      : 'object',
        properties: {
          ...EditorInterfaceSchemaFactory.createEvalProperty()
        }
      },

      preferences: {
        type: 'object',
        properties: {
          appearance: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                {
                  value: 'standard',
                  label: 'Standard'
                },
                {
                  value: 'compact',
                  label: 'Compact'
                }
              ]
            }
          },

          labelPosition: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                {
                  value: 'end',
                  label: 'End'
                },
                {
                  value: 'bottom',
                  label: 'Bottom'
                }
              ]
            }
          },

          stepHeaderPosition: {
            type: 'string',
            handler: {
              type: 'common/dropdown',
              values: [
                {
                  value: 'start',
                  label: 'Start'
                },
                {
                  value: 'end',
                  label: 'End'
                }
              ]
            }
          },

          editIcon: {
            type: 'string'
          },

          doneIcon: {
            type: 'string'
          },
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Stepper', [
          ...EditorInterfaceLayoutFactory.outputKey('variant', 'Variant'),
          ...EditorInterfaceLayoutFactory.outputKey('linear'),
          ...EditorInterfaceLayoutFactory.outputKey('primary'),

          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('initialStep', 'Initial step'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('onStepChange.$eval', 'Event: Step change', CodeEditorKeyIconType.EventCallback),

          ...EditorInterfaceLayoutFactory.createDivider(),

          ...EditorInterfaceLayoutFactory.outputKey('preferences.appearance', 'Appearance'),
          ...EditorInterfaceLayoutFactory.outputKey('preferences.labelPosition', 'Label position'),
          ...EditorInterfaceLayoutFactory.outputKey('preferences.stepHeaderPosition', 'Step header position'),
          ...EditorInterfaceLayoutFactory.outputKey('preferences.editIcon', 'Edit icon'),
          ...EditorInterfaceLayoutFactory.outputKey('preferences.editIcon', 'Done icon'),
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('stepper', layoutInfo, layoutStepperJsfDefinition);
