import { LayoutInfoInterface }                          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                                       from '../../../layout';
import { EditorInterfaceLayoutFactory, wrapKeyDynamic } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                                  from '../../../register';
import { EditorInterfaceSchemaFactory }                 from '../../../editor/helpers/editor-factory';

const layoutInfo: LayoutInfoInterface = {
  type        : 'image',
  title       : 'Image',
  category    : 'Layout',
  icon        : 'layout-icons/image.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutImage extends JsfAbstractSpecialLayout<'image'> {

  src: string | {
    $eval: string,
    dependencies?: string[]
  };

  width?: string;

  height?: string;

  /**
   * If set to true the image tag will be replaced with a div with background image set.
   * In this case the width and height are required, otherwise you will not see anything displayed.
   */
  displayAsBackgroundImage?: boolean;

  constructor(data: JsfLayoutImage) {
    super();
    Object.assign(this, data);
  }
}

export const layoutImageJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      ... EditorInterfaceSchemaFactory.createDynamicSwitchableProperty('', 'src', [
        {
          typeKey: 'basic',
          typeName: 'Basic',
          propDefinition: {
            type: 'string'
          }
        },
        {
          typeKey: 'eval',
          typeName: 'Eval',
          propDefinition: {
            type      : 'object',
            properties: {
              ... EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
            }
          }
        }
      ]),

      width : {
        type : 'string',
      },
      height: {
        type : 'string',
      },
      displayAsBackgroundImage: {
        type: 'boolean',
        title: 'Display as background image'
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Image', [
          ...EditorInterfaceLayoutFactory.outputDynamicSwitchablePropKey('', 'src', 'Source URL', [
            {
              typeKey: 'basic',
              layoutDefinition: {
                type: 'div',
                items: [
                  ... EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('basic'), 'URL'),
                ]
              }
            },
            {
              typeKey: 'eval',
              layoutDefinition: {
                type: 'div',
                items: [
                  ... EditorInterfaceLayoutFactory.outputKeyWithCodeEditor(wrapKeyDynamic('eval.$eval'), 'Eval'),
                  ... EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('eval.dependencies'), 'Dependencies'),
                ]
              }
            }
          ]),

          ...EditorInterfaceLayoutFactory.outputKey('width', 'Width'),
          ...EditorInterfaceLayoutFactory.outputKey('height', 'Height'),
          ...EditorInterfaceLayoutFactory.outputKey('displayAsBackgroundImage'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('image', layoutInfo, layoutImageJsfDefinition);


