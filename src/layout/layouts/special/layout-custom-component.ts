import { JsfAbstractSpecialLayout }       from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'custom-component',
  title: 'Custom component',
  icon: 'layout-icons/custom-component.svg'
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Layout')
@DefLayout({
  type: 'div',
  items: [{
    type: 'div',
    htmlClass: 'ml-2 mt-3',
    items: [
      {
        type: 'heading',
        title: 'Component',
        level: 5,
      },
      { key: 'component.$eval' }
    ]
  }, {
    type: 'div',
    htmlClass: 'ml-2 mt-3',
    items: [
      {
        type: 'heading',
        title: 'Configuration',
        level: 5,
      },
      { key: 'config.$eval' }
    ]
  }]
})
export class JsfLayoutCustomComponent extends JsfAbstractSpecialLayout<'custom-component'> {

  /**
   * Inline component or remote url to load.
   */
  @DefProp({
    type: 'object',
    title: 'Component',
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
      }
    }
  })
  component: {
     $eval: string,
   } | string; // ignore string for the time being in DefProp. TODO: fix this.

  /**
   * Optional config to be passed to the component factory.
   */
  @DefProp({
    type: 'object',
    title: 'Config',
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
      }
    }
  })
  config?: {
    $eval: string,
  } | any; // ignore any for DefProp (for the time being. TODO?)

  constructor(data: JsfLayoutCustomComponent) {
    super();
    Object.assign(this, data);
  }
}
