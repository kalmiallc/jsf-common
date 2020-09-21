import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractPropLayout,
  jsfAbstractPropLayoutJsfDefinitionLayoutItems,
  jsfAbstractPropLayoutJsfDefinitionSchemaProperties,
  JsfUnknownLayout
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

export interface JsfLayoutArrayFilter {
  $eval: string;
  dependencies: string[];
}

const layoutInfo: LayoutInfoInterface = {
  type        : 'array',
  title       : 'Array',
  category    : 'List',
  icon        : 'layout-icons/array.svg',
  formControl : {
    enabled: true
  },
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutPropArray extends JsfAbstractPropLayout {
  type: 'array';

  items: JsfUnknownLayout[];

  addable?: boolean;

  orderable?: boolean;

  removable?: boolean;

  constructor(data: JsfLayoutPropArray) {
    super();
    Object.assign(this, data);
  }
}

export const layoutArrayJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropLayoutJsfDefinitionSchemaProperties,

      addable  : {
        type : 'boolean',
        title: 'Addable'
      },
      orderable: {
        type : 'boolean',
        title: 'Orderable'
      },
      removable: {
        type : 'boolean',
        title: 'Removable'
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Array', [
          {
            type : 'div',
            items: [
              {
                key: 'addable'
              },
              {
                key: 'orderable'
              },
              {
                key: 'removable'
              }
            ]
          }
        ]),

        ...jsfAbstractPropLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('array', layoutInfo, layoutArrayJsfDefinition);
