import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  JsfUnknownLayout
}                                       from '../../../layout';
import { EditorInterfaceSchemaFactory } from '../../../editor/helpers/editor-factory/editor-interface-schema-factory';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { CodeEditorKeyIconType }        from '../../../editor/helpers/editor-factory/layout/code-editor-key';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type    : 'drawer-content',
  title   : 'Drawer content',
  category: 'Layout',
  icon    : 'unknown.svg',
  items   : {
    enabled: true
  }
};

export class JsfLayoutDrawerContent extends JsfAbstractItemsLayout<'drawer-content'> {
  items: JsfUnknownLayout[];

  constructor(data: JsfLayoutDrawerContent) {
    super();
    Object.assign(this, data);
  }
}

export const layoutDrawerContentJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
      ]),
    ]
  }
};

JsfRegister.layout('drawer-content', layoutInfo, layoutDrawerContentJsfDefinition);
