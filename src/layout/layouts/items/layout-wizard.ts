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
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties

      // TODO
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Wizard', [
          // TODO
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('wizard', layoutInfo, layoutWizardJsfDefinition);
