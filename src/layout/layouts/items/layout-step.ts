import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfUnknownLayout
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';
import { EditorInterfaceSchemaFactory } from '../../../editor/helpers/editor-factory';

const layoutInfo: LayoutInfoInterface = {
  type        : 'step',
  title       : 'Step',
  category    : 'Layout',
  icon        : 'unknown.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title']
  }
};

export class JsfLayoutStep extends JsfAbstractItemsLayout<'step'> {
  items: JsfUnknownLayout[];

  title?: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  /**
   * Array of prop paths which will be checked to determine if this step is valid
   * @deprecated This is now done automatically
   */
  linearValidationProps?: string[];

  optional?: boolean;

  editable?: boolean;

  preferences?: JsfLayoutStepPreferences;

  constructor(data: JsfLayoutStep) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutStepPreferences {
}

export const layoutStepJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      title       : {
        type: 'string'
      },
      templateData: {
        type      : 'object',
        properties: {
          ...EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
      optional             : {
        type : 'boolean',
        title: 'Optional'
      },
      editable             : {
        type : 'boolean',
        title: 'Editable'
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Step', [
          ...EditorInterfaceLayoutFactory.outputKey('title', 'Title'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('templateData.$eval', 'Title template data'),
          ...EditorInterfaceLayoutFactory.outputKey('templateData.dependencies', 'Title dependencies'),

          ...EditorInterfaceLayoutFactory.outputKey('optional'),
          ...EditorInterfaceLayoutFactory.outputKey('editable'),
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('step', layoutInfo, layoutStepJsfDefinition);
