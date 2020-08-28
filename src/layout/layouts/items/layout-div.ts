import { LayoutInfoInterface }                      from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfUnknownLayout } from '../../../layout';
import { JsfRegister }                              from '../../../register';
import { EditorInterfaceLayoutFactory }             from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { EditorInterfaceSchemaFactory }             from '../../../editor/helpers/editor-factory/editor-interface-schema-factory';
import { CodeEditorKeyIconType }                    from '../../../editor/helpers/editor-factory/layout/code-editor-key';

const layoutInfo: LayoutInfoInterface = {
  type: 'div',
  title: 'Div',
  category: 'Layout',
  icon: 'layout-icons/div.svg',
  items: {
    enabled: true
  }
};

export class JsfLayoutDiv extends JsfAbstractItemsLayout<'div'> {
  items: JsfUnknownLayout[];

  scroll?: {
    vertical?: boolean;
    horizontal?: boolean;

    onScrollStop?: {
      $eval: string
    }
  };

  constructor(data: JsfLayoutDiv) {
    super();
    Object.assign(this, data);
  }
}

export const layoutDivJsfDefinition = {
  schema: {
    type: 'object',
    properties: {
      scroll: {
        type: 'object',
        properties: {
          vertical: {
            type: 'boolean',
            title: 'Vertical',
            default: false
          },
          horizontal: {
            type: 'boolean',
            title: 'Horizontal',
            default: false
          },
          onScrollStop: {
            type: 'object',
            properties: {
              ... EditorInterfaceSchemaFactory.createEvalProperty()
            }
          }
        }
      }
    }
  },
  layout: {
    type: 'div',
    items: [
      ... EditorInterfaceLayoutFactory.createPanel('Scroll', [
        ... EditorInterfaceLayoutFactory.outputKey('scroll.vertical'),
        ... EditorInterfaceLayoutFactory.outputKey('scroll.horizontal'),
        ... EditorInterfaceLayoutFactory.createVerticalSpacer([
          ... EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('scroll.onScrollStop.$eval', 'Event: Scroll stop', CodeEditorKeyIconType.EventCallback)
        ])
      ])
    ]
  }
};

JsfRegister.layout('div', layoutInfo, layoutDivJsfDefinition);
