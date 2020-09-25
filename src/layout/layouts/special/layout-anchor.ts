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
  type             : 'anchor',
  title            : 'Link',
  category         : 'Text',
  icon             : 'layout-icons/anchor.svg',
  defaultDefinition: {
    type : 'anchor',
    title: 'My link',
    href : 'https://'
  },
  localization     : {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title', 'href']
  }
};

export class JsfLayoutAnchor extends JsfAbstractSpecialLayout<'anchor'> {

  title: string;

  titleTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  href: string;

  hrefTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  constructor(data: JsfLayoutAnchor) {
    super();
    Object.assign(this, data);
  }
}

export const layoutAnchorJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      title            : {
        type : 'string',
      },
      titleTemplateData: {
        type      : 'object',
        properties: {
          ... EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
      href             : {
        type : 'string',
      },
      hrefTemplateData : {
        type      : 'object',
        title     : 'Href template data',
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
        ...EditorInterfaceLayoutFactory.createPanel('Anchor', [
          ...EditorInterfaceLayoutFactory.outputKey('title', 'Title'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('titleTemplateData.$eval', 'Title template data'),
          ...EditorInterfaceLayoutFactory.outputKey('titleTemplateData.dependencies', 'Title dependencies'),

          ...EditorInterfaceLayoutFactory.outputKey('href', 'Href'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('hrefTemplateData.$eval', 'Href template data'),
          ...EditorInterfaceLayoutFactory.outputKey('hrefTemplateData.dependencies', 'Href dependencies'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('anchor', layoutInfo, layoutAnchorJsfDefinition);
