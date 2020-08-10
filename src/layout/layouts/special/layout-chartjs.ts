import { JsfAbstractSpecialLayout }       from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { createDependencyArray } from '../../../jsf-for-jsf/util/dependency-array';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'chartjs',
  title: 'Chart',
  icon: 'layout-icons/chartjs.svg'
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Layout')
@DefLayout({
  type: 'div',
  items: [
    { key: 'width' },
    { key: 'height' },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Configuration',
          level: 5
        },
        { key: 'config.$eval' },
        // bogus layout for sensible collapsing & readability
        createDependencyArray('config')
      ]
    }
  ]
})
export class JsfLayoutChartJS extends JsfAbstractSpecialLayout<'chartjs'> {

  @DefProp({
    type: 'string',
    title: 'Width'
  })
  width?: string;

  @DefProp({
    type: 'string',
    title: 'Height'
  })
  height?: string;

  /**
   * ChartJS config object.
   */
  @DefProp({
    type: 'object',
    title: 'Configuration',
    properties: {
      $eval: {
        type: 'string',
        title: 'Eval',
        handler: {
          type: 'common/code-editor',
          options: {
            language: 'javascript'
          }
        }
      },
      dependencies: {
        type: 'array',
        title: 'Dependencies',
        items: {
          type: 'string'
        }
      }
    }
  })
  config: {
    $eval: string,
    dependencies: string[]
  } | any;

  constructor(data: JsfLayoutChartJS) {
    super();
    Object.assign(this, data);
  }
}
