import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfLayoutProgressTrackerStep
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';
import { EditorInterfaceSchemaFactory } from '../../../editor/helpers/editor-factory';

const layoutInfo: LayoutInfoInterface = {
  type        : 'progress-tracker',
  title       : 'Progress tracker',
  category    : 'Layout',
  icon        : 'layout-icons/progress-tracker.svg',
  items       : {
    enabled: true,
    fixed  : ['progress-tracker-step']
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'progressTitle']
  }
};

export class JsfLayoutProgressTracker extends JsfAbstractItemsLayout<'progress-tracker'> {
  items: JsfLayoutProgressTrackerStep[];

  step?: number | {
    $eval: string;
    dependencies: string[]
  }; // Range 0 to n, where n is last step index

  progressTitle: string;

  progressTitleTemplateData: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutProgressTracker) {
    super();
    Object.assign(this, data);
  }
}

export const layoutProgressTrackerJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      progressTitle       : {
        type: 'string'
      },
      progressTitleTemplateData: {
        type      : 'object',
        properties: {
          ...EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },

      step: {
        type      : 'object',
        properties: {
          ...EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Progress Tracker', [
          ...EditorInterfaceLayoutFactory.outputKey('progressTitle', 'Title'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('progressTitleTemplateData.$eval', 'Title template data'),
          ...EditorInterfaceLayoutFactory.outputKey('progressTitleTemplateData.dependencies', 'Title dependencies'),

          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('step.$eval', 'Step eval'),
          ...EditorInterfaceLayoutFactory.outputKey('step.dependencies', 'Step dependencies'),
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('progress-tracker', layoutInfo, layoutProgressTrackerJsfDefinition);
