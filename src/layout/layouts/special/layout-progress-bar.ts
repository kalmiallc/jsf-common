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
  type        : 'progress-bar',
  title       : 'Progress bar',
  category    : 'Buttons & Indicators',
  icon        : 'layout-icons/progress-bar.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutProgressBar extends JsfAbstractSpecialLayout<'progress-bar'> {

  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';

  color?: 'primary' | 'accent' | 'warn';

  progress?: number | {
    $eval: string;
    dependencies: string[]
  }; // Range 0 to 100

  constructor(data: JsfLayoutProgressBar) {
    super();
    Object.assign(this, data);
  }
}

export const layoutProgressBarJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      mode    : {
        type       : 'string',
        handler    : {
          type  : 'common/dropdown',
          values: [
            {
              label: 'Determinate',
              value: 'determinate'
            },
            {
              label: 'Indeterminate',
              value: 'indeterminate'
            },
            {
              label: 'Buffer',
              value: 'buffer'
            },
            {
              label: 'Query',
              value: 'query'
            }
          ]
        },
      },

      color   : {
        type       : 'string',
        handler    : {
          type  : 'common/dropdown',
          values: [
            {
              label: 'Primary',
              value: 'primary'
            },
            {
              label: 'Accent',
              value: 'accent'
            },
            {
              label: 'Warn',
              value: 'warn'
            }
          ]
        }
      },

      progress: {
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
        ...EditorInterfaceLayoutFactory.createPanel('Progress Bar', [
          ...EditorInterfaceLayoutFactory.outputKey('mode', 'Mode'),
          ...EditorInterfaceLayoutFactory.outputKey('color', 'Color'),

          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('progress.$eval', 'Progress eval'),
          ...EditorInterfaceLayoutFactory.outputKey('progress.dependencies', 'Progress dependencies'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('progress-bar', layoutInfo, layoutProgressBarJsfDefinition);
