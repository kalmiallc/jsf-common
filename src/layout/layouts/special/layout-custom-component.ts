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
        properties: {},
        handler: {
          type: 'any'
        }
      },
      config   : {
        type      : 'object',
        properties: {},
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
        ...EditorInterfaceLayoutFactory.createPanel('Custom Component', [
          ... EditorInterfaceLayoutFactory.outputKey('component', 'Component'),
          ... EditorInterfaceLayoutFactory.outputKey('config', 'Config'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('custom-component', layoutInfo, layoutCustomComponentJsfDefinition);
