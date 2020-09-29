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
  type        : 'order-summary-line-item',
  title       : 'Order summery line item',
  category    : 'Layout',
  icon        : 'layout-icons/order-summary.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'label', 'value']
  }
};

export class JsfLayoutOrderSummaryLineItem extends JsfAbstractSpecialLayout<'order-summary-line-item'> {

  label: string;

  labelTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  value: string;

  valueTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  constructor(data: JsfLayoutOrderSummaryLineItem) {
    super();
    Object.assign(this, data);
  }
}

export const layoutOrderSummaryLineItemJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      label            : {
        type : 'string',
      },
      labelTemplateData: {
        type      : 'object',
        properties: {
          ... EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
      value            : {
        type : 'string',
      },
      valueTemplateData: {
        type      : 'object',
        properties: {
          ... EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Order Summary Line Item', [
          ...EditorInterfaceLayoutFactory.outputKey('label', 'Label'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('labelTemplateData.$eval', 'Label template data'),
          ...EditorInterfaceLayoutFactory.outputKey('labelTemplateData.dependencies', 'Label dependencies'),

          ...EditorInterfaceLayoutFactory.outputKey('value', 'Value'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('valueTemplateData.$eval', 'Value template data'),
          ...EditorInterfaceLayoutFactory.outputKey('valueTemplateData.dependencies', 'Value dependencies'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('order-summary-line-item', layoutInfo, layoutOrderSummaryLineItemJsfDefinition);
