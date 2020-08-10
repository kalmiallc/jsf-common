import { JsfAbstractSpecialLayout }       from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { createDependencyArray } from '../../../jsf-for-jsf/util/dependency-array';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'order-summary-line-item',
  title: 'Order summery line item',
  icon: 'layout-icons/order-summary.svg'
})
@DefLayout({
  type : 'div',
  items: [
    { key: 'label' },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Label template data',
          level: 5
        },
        { key: 'labelTemplateData.$eval' },
         // bogus layout for sensible collapsing & readability
        // ↓↓↓ labelTemplateData.dependencies [] ↓↓↓
        createDependencyArray('labelTemplateData', 'dependencies', 'Label template dependencies')
      ]
    },
    {
      key: 'value'
    },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Value template data',
          level: 5
        },
        { key: 'valueTemplateData.$eval' },
        // bogus layout for sensible collapsing & readability
        // ↓↓↓ valueTemplateData.dependencies [] ↓↓↓
        createDependencyArray('valueTemplateData', 'dependencies', 'Value template dependencies')
      ]
    }
  ]
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Layout')
export class JsfLayoutOrderSummaryLineItem extends JsfAbstractSpecialLayout<'order-summary-line-item'> {

  @DefProp({
    type : 'string',
    title: 'Label',
  })
  label: string;

  @DefProp({
    type      : 'object',
    title     : 'Label template data',
    properties: {
      $eval       : {
        type : 'string',
        title: 'Eval',
        handler: {
          type: 'common/code-editor',
          options: {
            language: 'javascript'
          }
        }
      },
      dependencies: {
        type : 'array',
        title: 'Dependencies',
        items: {
          type: 'string'
        }
      },
    }
  })
  labelTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  @DefProp({
    type : 'string',
    title: 'Value',
  })
  value: string;

  @DefProp({
    type      : 'object',
    title     : 'Value template data',
    properties: {
      $eval       : {
        type : 'string',
        title: 'Eval',
        handler: {
          type: 'common/code-editor',
          options: {
            language: 'javascript'
          }
        }
      },
      dependencies: {
        type : 'array',
        title: 'Dependencies',
        items: {
          type: 'string'
        }
      },
    }
  })
  valueTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  constructor(data: JsfLayoutOrderSummaryLineItem) {
    super();
    Object.assign(this, data);
  }
}
