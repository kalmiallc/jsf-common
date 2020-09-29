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
  type        : 'chartjs',
  title       : 'Chart',
  category    : 'Layout',
  icon        : 'layout-icons/chartjs.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutChartJS extends JsfAbstractSpecialLayout<'chartjs'> {

  width?: string;

  height?: string;

  /**
   * ChartJS config object.
   */
  config: {
            $eval: string,
            dependencies: string[]
          } | any;

  constructor(data: JsfLayoutChartJS) {
    super();
    Object.assign(this, data);
  }
}

export const layoutChartJSJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      width : {
        type : 'string',
      },
      height: {
        type : 'string',
      },

      config: {
        type      : 'object',
        handler: {
          type: 'any'
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('ChartJS', [
          ...EditorInterfaceLayoutFactory.outputKey('width', 'Width'),
          ...EditorInterfaceLayoutFactory.outputKey('height', 'Height'),
          ...EditorInterfaceLayoutFactory.outputKey('config', 'Config'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('chartjs', layoutInfo, layoutChartJSJsfDefinition);
