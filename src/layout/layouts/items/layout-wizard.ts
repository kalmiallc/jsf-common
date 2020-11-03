import { LayoutInfoInterface }                                 from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfUnknownLayout
}                                                              from '../../../layout';
import { JsfRegister }                                         from '../../../register';
import {
  EditorInterfaceLayoutFactory,
  wrapKeyDynamic
}                                                              from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { CodeEditorKeyIconType, EditorInterfaceSchemaFactory } from '../../../editor/helpers/editor-factory';

const layoutInfo: LayoutInfoInterface = {
  type        : 'wizard',
  title       : 'Wizard',
  category    : 'Layout',
  icon        : 'layout-icons/div.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export interface JsfWizardStep {
  id: string;
  title?: string;
  analyticsStepIndex?: number;
}

export class JsfLayoutWizard extends JsfAbstractItemsLayout<'wizard'> {
  items: JsfUnknownLayout[];

  steps: JsfWizardStep[] | {
    $eval: string;
    dependencies: string[]
  };

  primary?: boolean;
  linear?: boolean;

  initialStep?: string | {
    $eval: string;
  };

  breakpoints?: {
    desktopLayout?: string;
  };

  // Event - step change
  onStepChange?: {
    $eval: string;
  };

  constructor(data: JsfLayoutWizard) {
    super();
    Object.assign(this, data);
  }
}

export const layoutWizardJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      ...EditorInterfaceSchemaFactory.createDynamicSwitchableProperty('', 'steps', [
        {
          typeKey       : 'basic',
          typeName      : 'Basic',
          propDefinition: {
            type : 'array',
            items: {
              type      : 'object',
              properties: {
                id                : {
                  type: 'string'
                },
                title             : {
                  type: 'string'
                },
                analyticsStepIndex: {
                  type: 'number'
                }
              }
            }
          }
        },
        {
          typeKey       : 'eval',
          typeName      : 'Eval',
          propDefinition: {
            type      : 'object',
            properties: {
              ...EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
            }
          }
        }
      ]),

      linear: {
        type : 'boolean',
        title: 'Linear'
      },

      primary: {
        type : 'boolean',
        title: 'Primary'
      },

      initialStep: {
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

      breakpoints: {
        type      : 'object',
        properties: {
          desktopLayout: {
            type: 'string'
          }
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Wizard', [
          ...EditorInterfaceLayoutFactory.outputDynamicSwitchablePropKey('', 'steps', 'Steps', [
            {
              typeKey         : 'basic',
              layoutDefinition: {
                type : 'div',
                items: [
                  ...EditorInterfaceLayoutFactory.outputArrayCardListKey(wrapKeyDynamic('basic'),
                    { $eval: `return { value: 'Step' }`, dependencies: [] },
                    [
                      ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('basic[].id'), 'ID'),
                      ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('basic[].title'), 'Title'),
                      ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('basic[].analyticsStepIndex'), 'Analytics step index')
                    ])
                ]
              }
            },

            {
              typeKey         : 'eval',
              layoutDefinition: {
                type : 'div',
                items: [
                  ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(wrapKeyDynamic('eval.$eval'), 'Steps'),
                  ...EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('eval.dependencies'), 'Dependencies')
                ]
              }
            }
          ]),

          ...EditorInterfaceLayoutFactory.outputKey('linear'),
          ...EditorInterfaceLayoutFactory.outputKey('primary'),

          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('initialStep', 'Initial step'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('onStepChange.$eval', 'Event: Step change', CodeEditorKeyIconType.EventCallback),

          ...EditorInterfaceLayoutFactory.outputKey('breakpoints.desktopLayout', 'Breakpoint: Desktop layout')

        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('wizard', layoutInfo, layoutWizardJsfDefinition);
