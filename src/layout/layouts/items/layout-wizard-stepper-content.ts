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
    enabled: true
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
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties

      // TODO
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Wizard stepper content', [
          // TODO
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('wizard-stepper-content', layoutInfo, layoutWizardStepperContentJsfDefinition);
