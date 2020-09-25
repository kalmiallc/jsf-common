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
  type        : 'app-breadcrumbs',
  title       : 'Breadcrumbs',
  category    : 'Navigation',
  icon        : 'layout-icons/app-breadcrumbs.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutAppBreadcrumbs extends JsfAbstractSpecialLayout<'app-breadcrumbs'> {

  separator?: string;

  constructor(data: JsfLayoutAppBreadcrumbs) {
    super();
    Object.assign(this, data);
  }

}

export const layoutAppBreadcrumbsJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      separator: {
        type : 'string',
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('App Breadcrumbs', [
          ... EditorInterfaceLayoutFactory.outputKey('separator', 'Separator')
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('app-breadcrumbs', layoutInfo, layoutAppBreadcrumbsJsfDefinition);
