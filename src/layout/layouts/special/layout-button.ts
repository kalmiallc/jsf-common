import { JsfAbstractSpecialLayout }       from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { createDependencyArray } from '../../../jsf-for-jsf/util/dependency-array';
import { createLayoutButtonLayout } from '../../../jsf-for-jsf/util/jsf-layout-button-layout';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'button',
  title: 'Button',
  icon: 'layout-icons/button.svg'
})
@DefLayout({
  type : 'div',
  items: [
    { key: 'title' },
    { key: 'icon' },
    { key: 'submit' },
    { key: 'scrollToTop' },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Disabled',
          level: 5
        },
        { key: 'disabled.$eval' },
        createDependencyArray('disabled')
      ]
    },
    createLayoutButtonLayout()
  ]
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Buttons & Indicators')
export class JsfLayoutButton extends JsfAbstractSpecialLayout<'button'> {

  @DefProp({
    type : 'string',
    title: 'Title'
  })
  title?: string;

  @DefProp({
    type      : 'object',
    title     : 'Title template data',
    properties: {
      $eval       : {
        type : 'string',
        title: 'Eval',
        handler: {
          type: 'common/code-editor',
          options: {
            language: 'javascript'
          }
        }
      },
      dependencies: {
        type : 'array',
        title: 'Dependencies',
        items: {
          type: 'string'
        }
      },
    }
  })
  titleTemplateData?: {
    $eval: string;
    dependencies?: string[];
  };

  @DefProp({
    type : 'string',
    title: 'Icon'
  })
  icon?: string;

  /**
   * @deprecated Use onClick `submit` option instead.
   */
  @DefProp({
    type : 'boolean',
    title: 'Submit'
  })
  submit?: boolean;

  @DefProp({
    type : 'boolean',
    title: 'Scroll to top'
  })
  scrollToTop?: boolean; // TODO move this under click event options

  @DefProp(
    {
      type      : 'object',
      title     : 'Disabled',
      properties: {
        $eval       : {
          type : 'string',
          title: 'Eval'
        },
        dependencies: {
          type : 'array',
          title: 'Dependencies',
          items: {
            type: 'string'
          }
        },
      }
    }
  )
  disabled?: {
    $eval: string;
    dependencies: string[];
  } | boolean;

  // @DefProp('JsfLayoutButtonPreferences')
  @DefProp({
    type: 'object',
    title: 'Preferences',
    properties: {
      color: {
        type: 'string',
        title: 'color',
        handler: {
          type: 'common/dropdown',
          values: [
            {value: 'none', label: 'No color'},
            {value: 'primary', label: 'Primary'},
            {value: 'accent', label: 'Accent'}
          ]
        }
      },
      variant: {
        type: 'string',
        title: 'color',
        handler: {
          type: 'common/dropdown',
          values: [
            {value: 'basic', label: 'Basic'},
            {value: 'raised', label: 'Raised'},
            {value: 'flat', label: 'Flat'},
            {value: 'stroke', label: 'Stroked'},
            {value: 'icon', label: 'Icon'},
            {value: 'fab', label: 'Fab'},
            {value: 'mini-fab', label: 'Mini fab'},
          ]
        }
      },
      size: {
        type: 'string',
        title: 'Size',
        handler: {
          type: 'common/dropdown',
          values: [
            {value: 'large', label: 'Large'},
            {value: 'normal', label: 'Normal'},
            {value: 'small', label: 'Small'}
          ]
        }
      },
      disableRipple: {
        type: 'boolean',
        title: 'Disable ripple'
      }
    }
  })
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
  color ? : 'none' | 'primary' | 'accent';
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
  disableRipple ? : boolean;
}
