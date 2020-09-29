import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfLayoutOnClickInterface,
  JsfUnknownLayout
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';
import { EditorInterfaceSchemaFactory } from '../../../editor/helpers/editor-factory';

const layoutInfo: LayoutInfoInterface = {
  type        : 'menu-item',
  title       : 'Menu item',
  category    : 'Navigation',
  icon        : 'layout-icons/menu-item.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title', 'description']
  }
};

export class JsfLayoutMenuItem extends JsfAbstractItemsLayout<'menu-item'> {
  items: JsfUnknownLayout[];

  title: string;

  description?: string;

  titleTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  descriptionTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  icon?: string;

  onClick?: JsfLayoutOnClickInterface | JsfLayoutOnClickInterface[];

  constructor(data: JsfLayoutMenuItem) {
    super();
    Object.assign(this, data);
  }
}

export const layoutMenuItemJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      title            : {
        type: 'string'
      },
      titleTemplateData: {
        type      : 'object',
        properties: {
          ...EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
      description            : {
        type: 'string'
      },
      descriptionTemplateData: {
        type      : 'object',
        properties: {
          ...EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
      icon             : {
        type: 'string'
      },
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Menu Item', [
          ...EditorInterfaceLayoutFactory.outputKey('title', 'Title'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('titleTemplateData.$eval', 'Title template data'),
          ...EditorInterfaceLayoutFactory.outputKey('titleTemplateData.dependencies', 'Title dependencies'),

          ...EditorInterfaceLayoutFactory.outputKey('description', 'Description'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('descriptionTemplateData.$eval', 'Description template data'),
          ...EditorInterfaceLayoutFactory.outputKey('descriptionTemplateData.dependencies', 'Description dependencies'),

          ...EditorInterfaceLayoutFactory.outputKey('icon', 'Icon'),
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('menu-item', layoutInfo, layoutMenuItemJsfDefinition);
