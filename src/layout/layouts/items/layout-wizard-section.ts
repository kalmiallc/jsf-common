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
  type        : 'wizard-section',
  title       : 'Wizard section',
  category    : 'Layout',
  icon        : 'layout-icons/div.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};


export class JsfLayoutWizardSection extends JsfAbstractItemsLayout<'wizard-section'> {
  items: JsfUnknownLayout[];

  sectionType: 'header' | 'content' | 'sidebar' | 'footer';

  sectionOptions?: {
    noStyles: boolean;
  };

  constructor(data: JsfLayoutWizardSection) {
    super();
    Object.assign(this, data);
  }
}

export const layoutWizardSectionJsfDefinition = {
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
        ...EditorInterfaceLayoutFactory.createPanel('Wizard section', [
          // TODO
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('wizard-section', layoutInfo, layoutWizardSectionJsfDefinition);
