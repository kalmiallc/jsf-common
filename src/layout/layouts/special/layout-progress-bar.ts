import { JsfAbstractSpecialLayout } from '../../abstract/abstract-layout';
import { DefExtends, DefCategory, DefProp, DefLayout, DefTransform }               from '../../../jsf-for-jsf/decorators';
import { createDependencyArray } from '../../../jsf-for-jsf/util/dependency-array';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'progress-bar',
  title: 'Progress bar',
  icon: 'layout-icons/progress-bar.svg'
})
@DefTransform((x: any) => {
  x.schema.properties._progress = {
    type: 'object',
    properties: {
      progressType: {
        type: 'string',
        handler: {
          type: 'common/button-toggle',
          values: [
            { label: 'Number', value: 'number'},
            { label: 'Custom code', value: 'custom'}
          ]
        }
      },
      typeNumber: {
        type: 'number',
        minimum: 0,
        maximum: 100
      },
      typeCustom: {
        type: 'object',
        properties: {
          $eval: {
            type: 'string',
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
          }
        }
      }
    },
    onValueChange: {
      updateDependencyValue: [
        {
          mode: 'set',
          key: 'progress',
          value: {
            $eval: `
            if ($val._progress.progressType == 'number'){
              return $val._progress.typeNumber;
            }

            if ($val._progress.progressType == 'custom'){
              return $val._progress.typeCustom;
            }

            `
          }
        }
      ]
    }
  };  

  return x;
})

@DefLayout({
  type : 'div',
  items: [
    {
      type: 'heading',
      level: 5,
      title: 'Mode'
    },
    {
      key: 'mode'
    },
    {
      type: 'heading',
      level: 5,
      title: 'Color'
    },
    {
      key: 'color'
    },
    {
      type: 'heading',
      level: 5,
      title: 'Progress'
    },
    {
      type: 'span',
      title: 'Value must be in range of 0 to 100.',
      htmlClass: 'ml-3 text-muted small'
    },
    {
      key: '_progress.progressType'
    },
    {
      key: '_progress.typeNumber',
      placeholder: '%',
      visibleIf: {
        $eval: `return $val._progress.progressType == 'number'`,
        dependencies: ['_progress.progressType']
      }
    },
    {
      type: 'div',
      visibleIf: {
        $eval: `return $val._progress.progressType == 'custom'`,
        dependencies: ['_progress.progressType']
      },
      items: [
        {
          key: '_progress.typeCustom.$eval'
        },
        createDependencyArray('_progress.typeCustom',)
      ]
    }
  ]
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Buttons & Indicators')
export class JsfLayoutProgressBar extends JsfAbstractSpecialLayout<'progress-bar'> {

  @DefProp({
    type       : 'string',
    title      : 'Mode',
    description: 'Select mode',
    handler: {
      type: 'common/dropdown',
      values: [
        { label: 'determinate', value: 'determinate'},
        { label: 'indeterminate', value: 'indeterminate'},
        { label: 'buffer', value: 'buffer'},
        { label: 'query', value: 'query'}
      ]
    }
  })
  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';

  @DefProp({
    type       : 'string',
    title      : 'Color',
    description: 'Select color',
    handler: {
      type: 'common/dropdown',
      values: [
        { label: 'primary', value: 'primary'},
        { label: 'accent', value: 'accent'},
        { label: 'warn', value: 'warn'}
      ]
    }
  })
  color?: 'primary' | 'accent' | 'warn';

  @DefProp({
    type      : 'object',
    handler   : { type: 'any' },
    properties: {},
  })
  progress?: number | {
    $eval: string;
    dependencies: string[]
  }; // Range 0 to 100

  constructor(data: JsfLayoutProgressBar) {
    super();
    Object.assign(this, data);
  }
}
