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
  type        : 'custom-component',
  title       : 'Custom component',
  category    : 'Layout',
  icon        : 'layout-icons/custom-component.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutCustomComponent extends JsfAbstractSpecialLayout<'custom-component'> {

  /**
   * Inline component or remote url to load.
   */
  component: {
               $eval: string,
             } | string;

  /**
   * Optional config to be passed to the component factory.
   */
  config?: {
             $eval: string,
           } | any;

  constructor(data: JsfLayoutCustomComponent) {
    super();
    Object.assign(this, data);
  }
}

export const layoutCustomComponentJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      component: {
        type      : 'object',
        title     : 'Component',
        properties: {
          $eval: {
            type   : 'string',
            title  : 'Eval',
            handler: {
              type   : 'common/code-editor',
              options: {
                language: 'javascript'
              }
            }
          }
        }
      },
      config   : {
        type      : 'object',
        title     : 'Config',
        properties: {
          $eval: {
            type   : 'string',
            title  : 'Eval',
            handler: {
              type   : 'common/code-editor',
              options: {
                language: 'javascript'
              }
            }
          }
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Custom Component', [
          {
            type : 'div',
            items: [
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Component',
                    level: 5
                  },
                  {
                    key: 'component.$eval'
                  }
                ]
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Configuration',
                    level: 5
                  },
                  {
                    key: 'config.$eval'
                  }
                ]
              }
            ]
          }
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('custom-component', layoutInfo, layoutCustomComponentJsfDefinition);
