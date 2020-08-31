import { jsfAbstractPropLayoutJsfDefinitionLayoutItems, jsfAbstractPropLayoutJsfDefinitionSchemaProperties } from '../../../abstract';
import { EditorInterfaceLayoutFactory }                                                                      from '../../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                                                                                       from '../../../../register';

export const layoutPropBooleanJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropLayoutJsfDefinitionSchemaProperties,

      preferences:  {
        type: 'object',
        properties: {
          variant: {
            type: 'string',
            title: 'Variant',
            handler:  {
              type: 'common/button-toggle',
              values: [
                { value: 'checkbox', label: 'Checkbox' },
                { value: 'slider', label: 'Slider' }
              ]
            },
          },
          color: {  // color is same as in stringProp, but since interface overrides it we'll be doing it, too
            type: 'string',
            title: 'Color',
            handler: {
              type: 'common/button-toggle',
              values: [
                { value: 'primary', label: 'Primary' },
                { value: 'accent', label: 'Accent' }
              ]
            },
          },
          labelPositionCheckbox: { // NOTE: when doing layout, only one of [slider|label]PositionCheckbox forms should be visible
            type: 'string',
            title: 'Label position',
            handler: {
              type: 'common/button-toggle',
              values: [
                { value: 'before', label: 'Before' },
                { value: 'after', label: 'After' }
              ]
            },
          },
          labelPositionSlider: { // NOTE: when doing layout, only one of [slider|label]PositionCheckbox forms should be visible
            type: 'string',
            title: 'Label position',
            handler: {
              type: 'common/button-toggle',
              values: [
                { value: 'before', label: 'Before' },
                { value: 'after', label: 'After' }
              ]
            },
          }
        },
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Form Control: Boolean', [
          {
            type: 'div',
            items: [
              { key: 'preferences.variant' },
              { key: 'preferences.color' },
              {
                type: 'div',
                items: [
                  { key: 'preferences.labelPositionCheckbox' }
                ],
                visibleIf: {
                  $eval: `return $val.preferences.variant === 'checkbox'`,
                  dependencies: ['preferences']
                }
              },
              {
                type: 'div',
                items: [
                  {key: 'preferences.labelPositionSlider' }
                ],
                visibleIf: {
                  $eval: `return $val.preferences.variant === 'slider'`,
                  dependencies: ['preferences']
                }
              },
            ]
          }
        ]),

        ...jsfAbstractPropLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('@prop/boolean', null, layoutPropBooleanJsfDefinition);
