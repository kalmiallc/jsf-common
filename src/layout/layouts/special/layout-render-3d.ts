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
  type    : 'render-3d',
  title   : 'Render 3D',
  category: 'Layout',
  icon    : 'layout-icons/render-2d.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutRender3D extends JsfAbstractSpecialLayout<'render-3d'> {

  sourceUrl: string | {
    $eval: string,
    dependencies?: string[]
  };

  width?: string;
  height?: string;

  constructor(data: JsfLayoutRender3D) {
    super();
    Object.assign(this, data);
  }
}

export const layoutRender3DJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      ... EditorInterfaceSchemaFactory.createDynamicSwitchableProperty('', 'sourceUrl', [
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

      width: {
        type: 'string',
      },
      height: {
        type: 'string',
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Render 3D', [
          ...EditorInterfaceLayoutFactory.outputDynamicSwitchablePropKey('', 'sourceUrl', 'Source URL', [
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

          ... EditorInterfaceLayoutFactory.outputKey('width', 'Width (px, rem, ...)'),
          ... EditorInterfaceLayoutFactory.outputKey('height', 'Height (px, rem, ...)')
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('render-3d', layoutInfo, layoutRender3DJsfDefinition);
