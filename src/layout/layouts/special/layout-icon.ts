import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type             : 'icon',
  title            : 'Icon',
  icon             : 'layout-icons/icon.svg',
  category         : 'Text',
  defaultDefinition: {
    type: 'icon',
    icon: 'warning'
  }
};

export class JsfLayoutIcon extends JsfAbstractSpecialLayout<'icon'> {

  icon: string;

  color?: 'primary' | 'accent' | 'warn';

  size?: string; // 24px, 1rem, etc...

  constructor(data: JsfLayoutIcon) {
    super();
    Object.assign(this, data);
  }
}

export const layoutIconJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      icon : {
        type : 'string',
        title: 'Icon'
      },
      color: {
        type   : 'string',
        title  : 'Color',
        handler: {
          type  : 'common/dropdown',
          values: [
            {
              value: 'primary',
              label: 'Primary'
            },
            {
              value: 'accent',
              label: 'Accent'
            },
            {
              value: 'warn',
              label: 'Warn'
            }
          ]
        }
      },
      size : {
        type : 'string',
        title: 'Size'
      }    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Icon', [
          {
            type : 'div',
            items: [
              {
                key: 'icon'
              },
              {
                key: 'color'
              },
              {
                key: 'size'
              }
            ]
          }
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('icon', layoutInfo, layoutIconJsfDefinition);
