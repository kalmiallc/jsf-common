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
  type             : 'span',
  title            : 'Span',
  category         : 'Text',
  icon             : 'layout-icons/span.svg',
  defaultDefinition: {
    type : 'span',
    title: 'Span text'
  },
  localization     : {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title']
  }
};

export class JsfLayoutSpan extends JsfAbstractSpecialLayout<'span'> {

  title: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutSpan) {
    super();
    Object.assign(this, data);
  }
}

export const layoutSpanJsfDefinition = {
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
        ...EditorInterfaceLayoutFactory.createPanel('Span', [
          ...EditorInterfaceLayoutFactory.outputKey('title', 'Title'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('templateData.$eval', 'Title template data'),
          ...EditorInterfaceLayoutFactory.outputKey('templateData.dependencies', 'Title dependencies'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('span', layoutInfo, layoutSpanJsfDefinition);

