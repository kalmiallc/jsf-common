import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
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
    icon: 'help'
  },
  localization     : {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
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
      },

      color: {
        type   : 'string',
        handler: {
          type  : 'common/radio',
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
        description: 'Example: 24px, 1rem, ...'
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Icon', [
          ...EditorInterfaceLayoutFactory.outputKey('icon', 'Icon'),
          ...EditorInterfaceLayoutFactory.outputKey('color', 'Color'),
          ...EditorInterfaceLayoutFactory.outputKey('size', 'Size'),
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('icon', layoutInfo, layoutIconJsfDefinition);
