import { JsfAbstractSpecialLayout }       from '../../abstract/abstract-layout';
import { JsfLayoutButtonPreferences }     from './layout-button';
import { DefLayout, DefProp, DefExtends, DefCategory, JsfDefDeprecated } from '../../../jsf-for-jsf/decorators';
import { createLayoutButtonLayout } from '../../../jsf-for-jsf/util/jsf-layout-button-layout';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'array-item-add'
})
@DefLayout({
  type : 'div',
  items: [
    { key: 'title' },
    { key: 'icon' },
    { key: 'path' },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Value',
          level: 5
        },
        { key: 'value.$eval' }
      ]
    },
    createLayoutButtonLayout()
  ]
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Buttons & Indicators')
@JsfDefDeprecated()
export class JsfLayoutArrayItemAdd extends JsfAbstractSpecialLayout<'array-item-add'> {

  @DefProp({
    type : 'string',
    title: 'Title'
  })
  title: string;

  @DefProp({
    type : 'string',
    title: 'Icon'
  })
  icon?: string;

  @DefProp({
    type : 'string',
    title: 'Path'
  })
  path: string;

  @DefProp({
    type      : 'object',
    title     : 'Value',
    properties: {
      $eval: {
        type : 'string',
        title: 'Eval',
        handler: {
          type: 'common/code-editor',
          options: {
            language: 'javascript'
          }
        }
      }
    }
  })
  value?: {
    $eval: string,
  } | any;

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

  constructor(data: JsfLayoutArrayItemAdd) {
    super();
    Object.assign(this, data);
  }
}
