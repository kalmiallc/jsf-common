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
  type             : 'iframe',
  title            : 'Iframe',
  category         : 'Text',
  icon             : 'layout-icons/html.svg',
  defaultDefinition: {
    type: 'iframe',
    src: '<html>Custom HTML here or URL</html>'
  },
  localization     : {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutIframe extends JsfAbstractSpecialLayout<'iframe'> {

  src?: string;

  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutIframe) {
    super();
    Object.assign(this, data);
  }
}

export const layoutIframeJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      src        : {
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
        ...EditorInterfaceLayoutFactory.createPanel('IFrame', [
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('scr', 'Source (can be HTML)', CodeEditorKeyIconType.Template),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('templateData.$eval', 'Src template data'),
          ...EditorInterfaceLayoutFactory.outputKey('templateData.dependencies', 'Src dependencies'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('iframe', layoutInfo, layoutIframeJsfDefinition);

