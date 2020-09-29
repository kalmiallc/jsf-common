import { LayoutInfoInterface }                                          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfLayoutButtonPreferences,
  JsfLayoutMenuItem
}                                                                       from '../../../layout';
import { layoutButtonPreferencesLayout, layoutButtonPreferencesSchema } from '../special/layout-button';
import { EditorInterfaceLayoutFactory }                                 from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                                                  from '../../../register';
import { EditorInterfaceSchemaFactory }                                 from '../../../editor/helpers/editor-factory';

const layoutInfo: LayoutInfoInterface = {
  type        : 'menu',
  title       : 'Menu',
  category    : 'Navigation',
  icon        : 'layout-icons/menu.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title']
  }
};

export class JsfLayoutMenu extends JsfAbstractItemsLayout<'menu'> {
  items: JsfLayoutMenuItem[];

  title: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  icon?: string;

  preferences?: JsfLayoutButtonPreferences;

  constructor(data: JsfLayoutMenu) {
    super();
    Object.assign(this, data);
  }
}

export const layoutMenuJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      title       : {
        type: 'string'
      },
      templateData: {
        type      : 'object',
        properties: {
          ...EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
      icon        : {
        type: 'string'
      },
      preferences : layoutButtonPreferencesSchema
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Menu', [
          ...EditorInterfaceLayoutFactory.outputKey('title', 'Title'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('templateData.$eval', 'Title template data'),
          ...EditorInterfaceLayoutFactory.outputKey('templateData.dependencies', 'Title dependencies'),

          ...EditorInterfaceLayoutFactory.outputKey('icon', 'Icon'),

          ...EditorInterfaceLayoutFactory.createDivider(),

          ...layoutButtonPreferencesLayout
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('menu', layoutInfo, layoutMenuJsfDefinition);
