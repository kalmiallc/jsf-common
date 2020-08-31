import { jsfAbstractPropLayoutJsfDefinitionLayoutItems, jsfAbstractPropLayoutJsfDefinitionSchemaProperties } from '../../../abstract';
import { EditorInterfaceLayoutFactory }                                                                      from '../../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                                                                                       from '../../../../register';

export const layoutPropIntegerJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropLayoutJsfDefinitionSchemaProperties,

      preferences:  {
        type: 'object',
        properties: {
          color: {
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
          appearance: {
            type: 'string',
            title: 'Appearance',
            handler: {
              type: 'common/dropdown',
              values: [
                { value: 'legacy', label: 'Legacy' },
                { value: 'standard', label: 'Standard' },
                { value: 'fill', label: 'Fill' },
                { value: 'outline', label: 'Outline' }
              ]
            }
          },
          variant: {
            type: 'string',
            title: 'Variant',
            handler: {
              type: 'common/button-toggle',
              values: [
                { value: 'normal', label: 'Normal' },
                { value: 'small', label: 'Small' }
              ]
            },
          },
          clearable: {
            type: 'boolean',
            title: 'Can be cleared'
          },
          prefixIcon: {
            type: 'string',
            title: 'Prefix icon'
          },
          suffixIcon: {
            type: 'string',
            title: 'Suffix icon'
          },
          prefixLabel: {
            type: 'string',
            title: 'Prefix label'
          },
          suffixLabel: {
            type: 'string',
            title: 'Suffix label'
          },
          stepperButtons: {
            type: 'boolean',
            title: 'Stepper buttons',
          },
          step: {
            type: 'number',
            title: 'Step',
          },
        },
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Form Control: Integer', [
          {
            type: 'div',
            items: [
              { key: 'preferences.color' },
              { key: 'preferences.appearance' },
              { key: 'preferences.variant' },
              { key: 'preferences.clearable' },
              { key: 'preferences.stepperButtons' },
              { key: 'preferences.step' },
              { key: 'preferences.prefixIcon' },
              { key: 'preferences.suffixIcon' },
              { key: 'preferences.prefixLabel' },
              { key: 'preferences.suffixLabel' },
            ]
          }
        ]),

        ...jsfAbstractPropLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('@prop/integer', null, layoutPropIntegerJsfDefinition);
