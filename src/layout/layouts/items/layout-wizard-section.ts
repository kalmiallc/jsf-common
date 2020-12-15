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
  type        : 'wizard-section',
  title       : 'Wizard section',
  category    : 'Layout',
  icon        : 'layout-icons/div.svg',
  items       : {
    enabled: true
  },
  parent      : {
    allowedTypes: ['wizard']
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};


export class JsfLayoutWizardSection extends JsfAbstractItemsLayout<'wizard-section'> {
  items: JsfUnknownLayout[];

  sectionType: 'header' | 'content' | 'sidebar' | 'footer';

  sectionOptions?: {
    stepIds?: string[];
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

      sectionType: {
        type   : 'string',
        handler: {
          type  : 'common/dropdown',
          values: [
            { value: 'header', label: 'Header' },
            { value: 'sidebar', label: 'Sidebar' },
            { value: 'content', label: 'Content' },
            { value: 'footer', label: 'Footer' }
          ]
        }
      },

      sectionOptions: {
        type      : 'object',
        properties: {
          stepIds : {
            type   : 'array',
            items  : {
              type: 'string'
            },
            handler: {
              type: 'common/chip-list'
            }
          },
          noStyles: {
            type : 'boolean',
            title: 'No styles'
          }
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Wizard section', [
          ...EditorInterfaceLayoutFactory.outputKey('sectionType', 'Section type'),
          ...EditorInterfaceLayoutFactory.outputKey('sectionOptions.stepIds', 'Steps ids:'),
          ...EditorInterfaceLayoutFactory.outputKey('sectionOptions.noStyles')
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('wizard-section', layoutInfo, layoutWizardSectionJsfDefinition);
