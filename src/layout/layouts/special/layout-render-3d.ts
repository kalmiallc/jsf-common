import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
} from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

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

  sourceUrl: string;

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

      sourceUrl: {
        type: 'string',
        required: true,
      },

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
          ... EditorInterfaceLayoutFactory.outputKey('sourceUrl', 'Source URL'),
          ... EditorInterfaceLayoutFactory.outputKey('width', 'Width (px, rem, ...)'),
          ... EditorInterfaceLayoutFactory.outputKey('height', 'Height (px, rem, ...)')
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('render-3d', layoutInfo, layoutRender3DJsfDefinition);
