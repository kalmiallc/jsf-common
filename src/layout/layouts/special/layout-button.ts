import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';
import { EditorInterfaceSchemaFactory } from '../../../editor/helpers/editor-factory';

const layoutInfo: LayoutInfoInterface = {
  type             : 'button',
  title            : 'Button',
  category         : 'Buttons & Indicators',
  icon             : 'layout-icons/button.svg',
  defaultDefinition: {
    type : 'button',
    title: 'Button'
  },
  localization     : {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties, 'title']
  }
};

export class JsfLayoutButton extends JsfAbstractSpecialLayout<'button'> {

  title?: string;

  titleTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  icon?: string;

  /**
   * @deprecated Use onClick `submit` option instead.
   */
  submit?: boolean;

  scrollToTop?: boolean; // TODO move this under click event options

  disabled?: {
               $eval: string;
               dependencies: string[];
             } | boolean;

  preferences?: JsfLayoutButtonPreferences;

  constructor(data: JsfLayoutButton) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutButtonPreferences {
  /**
   * Color of the selection highlight.
   * Default is 'none'.
   */
  color?: 'none' | 'primary' | 'accent';
  /**
   * Button variant.
   * Default is 'basic'.
   */
  variant: 'basic' | 'raised' | 'flat' | 'stroked' | 'icon' | 'fab' | 'mini-fab';
  /**
   * Button size.
   */
  size: 'normal' | 'large' | 'small';
  /**
   * Whether ripples are disabled.
   * Default is False.
   */
  disableRipple?: boolean;
  /**
   * Whether to display the menu arrow, if the button is a menu trigger.
   */
  showMenuArrow?: boolean;
}

export const layoutButtonPreferencesSchema = {
  type      : 'object',
  properties: {
    color        : {
      type   : 'string',
      handler: {
        type  : 'common/dropdown',
        values: [
          {
            value: 'none',
            label: 'No color'
          },
          {
            value: 'primary',
            label: 'Primary'
          },
          {
            value: 'accent',
            label: 'Accent'
          }
        ]
      }
    },
    variant      : {
      type   : 'string',
      handler: {
        type  : 'common/dropdown',
        values: [
          {
            value: 'basic',
            label: 'Basic'
          },
          {
            value: 'raised',
            label: 'Raised'
          },
          {
            value: 'flat',
            label: 'Flat'
          },
          {
            value: 'stroked',
            label: 'Stroked'
          },
          {
            value: 'icon',
            label: 'Icon'
          },
          {
            value: 'fab',
            label: 'Fab'
          },
          {
            value: 'mini-fab',
            label: 'Mini fab'
          }
        ]
      }
    },
    size         : {
      type   : 'string',
      handler: {
        type  : 'common/dropdown',
        values: [
          {
            value: 'large',
            label: 'Large'
          },
          {
            value: 'normal',
            label: 'Normal'
          },
          {
            value: 'small',
            label: 'Small'
          }
        ]
      }
    },
    disableRipple: {
      type : 'boolean',
      title: 'Disable ripple'
    }
  }
};
export const layoutButtonPreferencesLayout = [
  ...EditorInterfaceLayoutFactory.outputKey('preferences.color', 'Color'),
  ...EditorInterfaceLayoutFactory.outputKey('preferences.variant', 'Variant'),
  ...EditorInterfaceLayoutFactory.outputKey('preferences.size', 'Size'),
  ...EditorInterfaceLayoutFactory.outputKey('preferences.disableRipple')
];

export const layoutButtonJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      title            : {
        type: 'string'
      },
      titleTemplateData: {
        type      : 'object',
        properties: {
          ...EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
      icon             : {
        type: 'string'
      },
      scrollToTop      : {
        type : 'boolean',
        title: 'Scroll to top'
      },
      disabled         : {
        type      : 'object',
        properties: {
          ...EditorInterfaceSchemaFactory.createEvalPropertyWithDependencies()
        }
      },
      preferences      : layoutButtonPreferencesSchema
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Button', [
          ...EditorInterfaceLayoutFactory.outputKey('title', 'Title'),
          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('titleTemplateData.$eval', 'Title template data'),
          ...EditorInterfaceLayoutFactory.outputKey('titleTemplateData.dependencies', 'Title dependencies'),

          ...EditorInterfaceLayoutFactory.outputKey('icon', 'Icon'),
          ...EditorInterfaceLayoutFactory.outputKey('scrollToTop'),

          ...EditorInterfaceLayoutFactory.outputKeyWithCodeEditor('disabled.$eval', 'Disabled condition'),
          ...EditorInterfaceLayoutFactory.outputKey('disabled.dependencies', 'Disabled dependencies'),

          ...EditorInterfaceLayoutFactory.createDivider(),

          ...layoutButtonPreferencesLayout,
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('button', layoutInfo, layoutButtonJsfDefinition);
