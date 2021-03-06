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
  type        : 'wizard-stepper-content',
  title       : 'Wizard stepper content',
  category    : 'Layout',
  icon        : 'layout-icons/div.svg',
  items       : {
    enabled: true,
    allowedTypes: ['wizard-step']
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};


export class JsfLayoutWizardStepperContent extends JsfAbstractItemsLayout<'wizard-stepper-content'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutWizardStepperContent) {
    super();
    Object.assign(this, data);
  }
}

export const layoutWizardStepperContentJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Wizard stepper content', [
          ...EditorInterfaceLayoutFactory.createLabel('No configuration available.')
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('wizard-stepper-content', layoutInfo, layoutWizardStepperContentJsfDefinition);
