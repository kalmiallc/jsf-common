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
  type             : 'heading',
  title            : 'Heading',
  category         : 'Text',
  icon             : 'layout-icons/heading.svg',
  defaultDefinition: {
    type : 'heading',
    level: 3,
    title: 'Heading text'
  },
  localization     : {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title']
  }
};

export class JsfLayoutHeading extends JsfAbstractSpecialLayout<'heading'> {

  title: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  level?: 1 | 2 | 3 | 4 | 5 | 6;

  constructor(data: JsfLayoutHeading) {
    super();
    Object.assign(this, data);
  }
}

export const layoutHeadingJsfDefinition = {
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

      level       : {
        type       : 'integer',
        minimum    : 1,
        maximum    : 6,
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Heading', [
          ...EditorInterfaceLayoutFactory.outputKey('title', 'Title'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('templateData.$eval', 'Title template data'),
          ...EditorInterfaceLayoutFactory.outputKey('templateData.dependencies', 'Title dependencies'),

          ...EditorInterfaceLayoutFactory.outputKey('level', 'Level'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('heading', layoutInfo, layoutHeadingJsfDefinition);
