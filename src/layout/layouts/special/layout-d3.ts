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
  type        : 'd3',
  title       : 'Chart library',
  category    : 'Layout',
  icon        : 'layout-icons/d3.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutD3 extends JsfAbstractSpecialLayout<'d3'> {

  chartType: string;

  chartOptions: any;

  dataSets: any[][];

  height?: number;

  constructor(data: JsfLayoutD3) {
    super();
    Object.assign(this, data);
  }
}

export const layoutD3JsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      chartType   : {
        type : 'string',
      },

      chartOptions: {
        type   : 'object',
        handler: {
          type: 'any'
        }
      },

      dataSets    : {
        type   : 'object',
        handler: {
          type: 'any'
        }
      },

      height      : {
        type : 'number',
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('D3', [
          ... EditorInterfaceLayoutFactory.outputKey('chartType', 'Chart type'),
          ... EditorInterfaceLayoutFactory.outputKey('chartOptions', 'Chart options'),
          ... EditorInterfaceLayoutFactory.outputKey('dataSets', 'Data sets'),
          ... EditorInterfaceLayoutFactory.outputKey('height', 'Height'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('d3', layoutInfo, layoutD3JsfDefinition);
