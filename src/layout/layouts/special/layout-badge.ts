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
  type             : 'badge',
  title            : 'Badge',
  category         : 'Text',
  icon             : 'layout-icons/badge.svg',
  defaultDefinition: {
    type : 'badge',
    title: 'Badge'
  },
  localization     : {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title']
  }
};

export class JsfLayoutBadge extends JsfAbstractSpecialLayout<'badge'> {

  title: string;

  templateData?: {
    $eval: string;
    dependencies?: string[];
  };

  color?: string | {
    $eval: string;
    dependencies?: string[];
  };

  constructor(data: JsfLayoutBadge) {
    super();
    Object.assign(this, data);
  }
}

export const layoutBadgeJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      title       : {
        type : 'string',
      },
      templateData: {
        type      : 'object',
        properties: {
          ... EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },

      ... EditorInterfaceSchemaFactory.createDynamicSwitchableProperty('', 'color', [
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
      ])
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Badge', [
          ... EditorInterfaceLayoutFactory.outputKey('title', 'Title'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('templateData.$eval', 'Title template data'),
          ...EditorInterfaceLayoutFactory.outputKey('templateData.dependencies', 'Title dependencies'),

          ...EditorInterfaceLayoutFactory.outputDynamicSwitchablePropKey('', 'color', 'Color', [
            {
              typeKey: 'basic',
              layoutDefinition: {
                type: 'div',
                items: [
                  ... EditorInterfaceLayoutFactory.outputKey(wrapKeyDynamic('basic'), 'Color (any CSS-supported format)'),
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
          ])
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('badge', layoutInfo, layoutBadgeJsfDefinition);
