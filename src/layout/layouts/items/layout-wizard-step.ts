import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfUnknownLayout
}                                       from '../../../layout';
import { JsfRegister }                  from '../../../register';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';

const layoutInfo: LayoutInfoInterface = {
  type        : 'wizard-step',
  title       : 'Wizard step',
  category    : 'Layout',
  icon        : 'layout-icons/div.svg',
  items       : {
    enabled: true
  },
  parent      : {
    allowedTypes: ['wizard-stepper-content']
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};


export class JsfLayoutWizardStep extends JsfAbstractItemsLayout<'wizard-step'> {
  items: JsfUnknownLayout[];

  stepIds: string[];

  constructor(data: JsfLayoutWizardStep) {
    super();
    Object.assign(this, data);
  }
}

export const layoutWizardStepJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      stepIds: {
        type: 'array',
        items: {
          type: 'string'
        },
        handler: {
          type: 'common/chip-list'
        }
      },
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Wizard step', [
          ...EditorInterfaceLayoutFactory.outputKey('stepIds', 'Steps ids:'),
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('wizard-step', layoutInfo, layoutWizardStepJsfDefinition);
