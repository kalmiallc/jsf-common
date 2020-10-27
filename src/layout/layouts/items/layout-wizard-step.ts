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
import { EditorInterfaceSchemaFactory } from '../../../editor/helpers/editor-factory/editor-interface-schema-factory';
import { CodeEditorKeyIconType }        from '../../../editor/helpers/editor-factory/layout/code-editor-key';

const layoutInfo: LayoutInfoInterface = {
  type        : 'wizard-step',
  title       : 'Wizard step',
  category    : 'Layout',
  icon        : 'layout-icons/div.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};


export class JsfLayoutWizardStep extends JsfAbstractItemsLayout<'wizard-step'> {
  items: JsfUnknownLayout[];

  stepId: string;

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

      // TODO
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Wizard step', [
          // TODO
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('wizard-step', layoutInfo, layoutWizardStepJsfDefinition);
