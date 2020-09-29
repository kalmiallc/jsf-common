import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';
import { EditorInterfaceSchemaFactory } from '../../../editor/helpers/editor-factory';

const layoutInfo: LayoutInfoInterface = {
  type        : 'progress-tracker-step',
  title       : 'Progress tracker step',
  category    : 'Layout',
  icon        : 'layout-icons/progress-tracker.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title', 'description']
  }
};

export class JsfLayoutProgressTrackerStep extends JsfAbstractSpecialLayout<'progress-tracker-step'> {

  title?: string;

  titleTemplateData?: {
    $eval: string,
    dependencies?: string[]
  };

  description?: string;

  descriptionTemplateData?: {
    $eval: string,
    dependencies?: string[]
  };

  icon?: string | {
    $eval: string,
    dependencies?: string[]
  };

  disabled?: boolean | {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutProgressTrackerStep) {
    super();
    Object.assign(this, data);
  }
}

export const layoutProgressTrackerStepJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      title                  : {
        type : 'string',
      },
      titleTemplateData: {
        type      : 'object',
        properties: {
          ... EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
      description            : {
        type : 'string',
      },
      descriptionTemplateData: {
        type      : 'object',
        properties: {
          ... EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
      icon: {
        type      : 'object',
        properties: {
          ... EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
      disabled: {
        type      : 'object',
        properties: {
          ... EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Progress Tracker Step', [
          ...EditorInterfaceLayoutFactory.outputKey('title', 'Title'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('titleTemplateData.$eval', 'Title template data'),
          ...EditorInterfaceLayoutFactory.outputKey('titleTemplateData.dependencies', 'Title dependencies'),

          ...EditorInterfaceLayoutFactory.outputKey('description', 'Description'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('descriptionTemplateData.$eval', 'Description template data'),
          ...EditorInterfaceLayoutFactory.outputKey('descriptionTemplateData.dependencies', 'Description dependencies'),

          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('icon.$eval', 'Icon eval'),
          ...EditorInterfaceLayoutFactory.outputKey('icon.dependencies', 'Icon dependencies'),

          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('disabled.$eval', 'disabled eval'),
          ...EditorInterfaceLayoutFactory.outputKey('disabled.dependencies', 'disabled dependencies'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('progress-tracker-step', layoutInfo, layoutProgressTrackerStepJsfDefinition);
