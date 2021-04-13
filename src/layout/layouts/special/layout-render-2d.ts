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
  type    : 'render-2d',
  title   : 'Render 2D',
  category: 'Layout',
  icon    : 'layout-icons/render-2d.svg',
  localization: {
    // TODO extract from text nodes
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutRender2D extends JsfAbstractSpecialLayout<'render-2d'> {

  viewport?: {
    width?: number;
    height?: number;

    transparent?: boolean;
    backgroundColor?: string;

    resolution?: number;

    frameRate?: number;
  };

  screenshot?: {
    key: string;
  };

  vars?: {
    [ key: string ]: any
  }

  ssr?: {
    /**
     * Set to true to enable SSR rendering.
     */
    enabled: boolean;
    /**
     * Optional override for which dff key to use.
     */
    dffKey?: string;
    /**
     * Set to true to always force pure SSR mode.
     */
    alwaysUseSSR?: boolean;
    /**
     * If set to true the renderer will initially use SSR until the realtime renderer has finished loading.
     */
    preloadWithSSR?: boolean;
  };

  resourceLoader?: {
    /**
     * If set to true all the renderers in the form will share the same resource loader instance.
     */
    sharedInstance?: boolean;
    /**
     * Whether the resource loader should automatically upload dynamic textures (those not defined in the resources object) to GPU.
     * Defaults to false.
     */
    uploadDynamicTexturesToGPU?: boolean;
  };

  resources?: {
    [resourceName: string]: string | JsfLayoutRender2DResource;
  };

  fragments?: {
    [fragmentId: string]: JsfLayoutRender2DNode
  };

  nodes: JsfLayoutRender2DNode[];

  constructor(data: JsfLayoutRender2D) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutRender2DSpriteResource {
  type?: 'sprite';
  url?: string;
  preload?: boolean;
}

export interface JsfLayoutRender2DSpriteSheetResource {
  type?: 'spritesheet';
  url?: string;
  preload?: boolean;
}

export type JsfLayoutRender2DResource = JsfLayoutRender2DSpriteResource | JsfLayoutRender2DSpriteSheetResource;

export function isJsfLayoutRender2DResourceObject(x: any): x is JsfLayoutRender2DResource {
  return typeof x === 'object' && 'type' in x;
}

export function isJsfLayoutRender2DSpriteResource(x: any): x is JsfLayoutRender2DSpriteResource {
  return typeof x === 'object' && 'type' in x && x.type === 'sprite';
}

export function isJsfLayoutRender2DSpriteSheetResource(x: any): x is JsfLayoutRender2DSpriteSheetResource {
  return typeof x === 'object' && 'type' in x && x.type === 'spritesheet';
}

export interface JsfLayoutRender2DNode {
  type: 'container' | 'sprite' | 'tiling-sprite' | 'text' | 'polygon' | 'nine-patch-rect';

  nodes: JsfLayoutRender2DNode[] | JsfLayoutRender2DEmitter;

  fragments?: {
    [fragmentId: string]: JsfLayoutRender2DNode
  };

  events?: {
    create?: JsfLayoutRender2DEvalObject,
    destroy?: JsfLayoutRender2DEvalObject,
    update?: JsfLayoutRender2DEvalObject,
    tick?: JsfLayoutRender2DEvalObject,
  };

  // Type-specific node properties
  [key: string]: any;
}

export interface JsfLayoutRender2DEmitter {
  emitter: 'fragment';

  options: JsfLayoutRender2DEmitterOptions;
}

export interface JsfLayoutRender2DFragmentEmitterOptions {
  fragment: string | JsfLayoutRender2DNode;

  source: any[] | JsfLayoutRender2DEvalObject;

  updateMode?: 'replace';
}

export type JsfLayoutRender2DEmitterOptions = JsfLayoutRender2DFragmentEmitterOptions;

export function isJsfLayoutRender2DEmitter(x: any): x is JsfLayoutRender2DEmitter {
  return typeof x === 'object' && 'emitter' in x;
}

export function isJsfLayoutRender2DNodeArray(x: any): x is JsfLayoutRender2DNode[] {
  return Array.isArray(x);
}

export interface JsfLayoutRender2DEvalObject {
  $eval: string;
  $evalTranspiled?: string;
  dependencies?: [];
  layoutDependencies?: [];
}

export const layoutRender2DJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      viewport      : {
        type      : 'object',
        title     : 'Viewport',
        properties: {
          width          : {
            type   : 'integer',
            title  : 'Width',
            minimum: 1
          },
          height         : {
            type   : 'integer',
            title  : 'Height',
            minimum: 1
          },
          transparent    : {
            type : 'boolean',
            title: 'Transparent'
          },
          backgroundColor: {
            type  : 'string',
            title : 'Background color',
            format: 'color'
          },
          resolution     : {
            type : 'number',
            title: 'Resolution'
          },
          frameRate      : {
            type   : 'integer',
            title  : 'Maximum frame rate',
            minimum: 1
          }
        }
      },
      screenshot    : {
        type      : 'object',
        title     : 'Screenshot',
        properties: {
          key: {
            type : 'string',
            title: 'Key'
          }
        }
      },
      ssr           : {
        type      : 'object',
        title     : 'Server side rendering',
        properties: {
          enabled       : {
            type : 'boolean',
            title: 'Enabled'
          },
          dffKey        : {
            type : 'string',
            title: 'DFF key'
          },
          alwaysUseSSR  : {
            type : 'boolean',
            title: 'Always use SSR'
          },
          preloadWithSSR: {
            type : 'boolean',
            title: 'Preload with SSR'
          }
        }
      },
      resourceLoader: {
        type      : 'object',
        title     : 'Resource loader',
        properties: {
          sharedInstance            : {
            type : 'boolean',
            title: 'Use shared instance'
          },
          uploadDynamicTexturesToGPU: {
            type : 'boolean',
            title: 'Upload dynamic textures to GPU'
          }
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Render 2D', [
          {
            type : 'div',
            items: [
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Viewport',
                    level: 5
                  },
                  {
                    key: 'viewport.width'
                  },
                  {
                    key: 'viewport.height'
                  },
                  {
                    key: 'viewport.transparent'
                  },
                  {
                    key: 'viewport.backgroundColor'
                  },
                  {
                    key: 'viewport.resolution'
                  },
                  {
                    key: 'viewport.frameRate'
                  }
                ]
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Screenshot',
                    level: 5
                  },
                  {
                    key: 'screenshot.key'
                  }
                ]
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Server side rendering',
                    level: 5
                  },
                  {
                    key: 'ssr.enabled'
                  },
                  {
                    key: 'ssr.dffKey'
                  },
                  {
                    key: 'ssr.alwaysUseSSR'
                  },
                  {
                    key: 'ssr.preloadWithSSR'
                  }
                ]
              },
              {
                type     : 'div',
                htmlClass: 'ml-2 mt-3',
                items    : [
                  {
                    type : 'heading',
                    title: 'Resource loader',
                    level: 5
                  },
                  {
                    key: 'resourceLoader.sharedInstance'
                  },
                  {
                    key: 'resourceLoader.uploadDynamicTexturesToGPU'
                  }
                ]
              }
            ]
          }
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('render-2d', layoutInfo, layoutRender2DJsfDefinition);
