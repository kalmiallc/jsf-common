import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'wizard-stepper-header',
  title       : 'Wizard stepper header',
  icon        : 'layout-icons/icon.svg',
  category    : 'Layout',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutWizardStepperHeader extends JsfAbstractSpecialLayout<'wizard-stepper-header'> {

  breakpoints?: {
    desktopLayout?: string;
  };

  constructor(data: JsfLayoutWizardStepperHeader) {
    super();
    Object.assign(this, data);
  }
}

export const layoutWizardStepperHeaderJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties

      // TODO
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Wizard stepper header', [

          // TODO
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('wizard-stepper-header', layoutInfo, layoutWizardStepperHeaderJsfDefinition);
