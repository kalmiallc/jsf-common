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
  type             : 'paragraph',
  title            : 'Paragraph',
  category         : 'Text',
  icon             : 'layout-icons/paragraph.svg',
  defaultDefinition: {
    type : 'paragraph',
    title: 'Paragraph text'
  },
  localization     : {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title']
  }
};

export class JsfLayoutParagraph extends JsfAbstractSpecialLayout<'paragraph'> {

  title: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutParagraph) {
    super();
    Object.assign(this, data);
  }
}

export const layoutParagraphJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      title       : {
        type : 'string',
      },
      templateData: {
        type      : 'object',
        properties: {
          ... EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Paragraph', [
          ...EditorInterfaceLayoutFactory.outputKey('title', 'Title'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('templateData.$eval', 'Title template data'),
          ...EditorInterfaceLayoutFactory.outputKey('templateData.dependencies', 'Title dependencies'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('paragraph', layoutInfo, layoutParagraphJsfDefinition);

