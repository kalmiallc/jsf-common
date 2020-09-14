import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractItemsLayout,
  jsfAbstractItemsLayoutJsfDefinitionLayoutItems,
  jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,
  jsfAbstractLayoutTranslatableProperties
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'section',
  title       : 'Section',
  category    : 'Layout',
  icon        : 'layout-icons/section.svg',
  items       : {
    enabled: true
  },
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutSection extends JsfAbstractItemsLayout<'section'> {

  expandable?: boolean;

  expanded?: boolean;

  constructor(data: JsfLayoutSection) {
    super();
    Object.assign(this, data);
  }
}

export const layoutSectionJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractItemsLayoutJsfDefinitionSchemaProperties,

      expandable: {
        type : 'boolean',
        title: 'Expandable'
      },
      expanded  : {
        type : 'boolean',
        title: 'Expand'
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Section', [
          {
            type : 'div',
            items: [
              {
                key: 'expandable'
              },
              {
                key: 'expanded'
              }
            ]
          }
        ]),

        ...jsfAbstractItemsLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('section', layoutInfo, layoutSectionJsfDefinition);
