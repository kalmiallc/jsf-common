import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties,
  JsfUnknownLayout
}                                       from '../../../layout';
import { JsfRegister }                  from '../../../register';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';

const layoutInfo: LayoutInfoInterface = {
  type        : 'floating-div',
  title       : 'Floating div',
  category    : 'Layout',
  icon        : 'layout-icons/div.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutFloatingDiv extends JsfAbstractItemsLayout<'floating-div'> {
  items: JsfUnknownLayout[];

  position?: string; // 'right', 'top left', etc...
  rotation?: boolean;

  constructor(data: JsfLayoutFloatingDiv) {
    super();
    Object.assign(this, data);
  }
}

export const layoutFloatingDivJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      position: {
        type   : 'string',
        default: 'right'
      },
      rotation  : {
        type: 'boolean',
        title: 'Enable rotation'
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Floating div', [
          ...EditorInterfaceLayoutFactory.outputKey('position', 'Position'),
          ...EditorInterfaceLayoutFactory.outputKey('rotation')
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('floating-div', layoutInfo, layoutFloatingDivJsfDefinition);
