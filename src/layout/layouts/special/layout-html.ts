import { LayoutInfoInterface }                                 from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                                              from '../../../layout';
import { EditorInterfaceLayoutFactory }                        from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                                         from '../../../register';
import { CodeEditorKeyIconType, EditorInterfaceSchemaFactory } from '../../../editor/helpers/editor-factory';

const layoutInfo: LayoutInfoInterface = {
  type             : 'html',
  title            : 'Html',
  category         : 'Text',
  icon             : 'layout-icons/html.svg',
  defaultDefinition: {
    type: 'html',
    html: '<span>Custom HTML here</span>'
  },
  localization     : {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutHtml extends JsfAbstractSpecialLayout<'html'> {

  html: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutHtml) {
    super();
    Object.assign(this, data);
  }
}

export const layoutHtmlJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      html        : {
        type : 'string',
        handler: {
          type: 'common/code-editor',
          options: {
            language: 'html'
          }
        }
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
        ...EditorInterfaceLayoutFactory.createPanel('HTML', [
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('html', 'HTML', CodeEditorKeyIconType.Template),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('templateData.$eval', 'HTML template data'),
          ...EditorInterfaceLayoutFactory.outputKey('templateData.dependencies', 'HTML dependencies'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('html', layoutInfo, layoutHtmlJsfDefinition);

