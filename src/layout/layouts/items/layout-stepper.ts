import { JsfAbstractItemsLayout }                                    from '../../abstract/abstract-layout';
import { JsfLayoutStep }                                             from './layout-step';
import { DefLayout, DefProp, DefExtends, DefCategory, DefTransform } from '../../../jsf-for-jsf/decorators';
import { DefLayoutInfo }                                             from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'stepper',
  title: 'Stepper',
  icon: 'layout-icons/stepper.svg',
  items: {
    enabled: true,
    default: ['step', 'step', 'step'],
    allowedTypes: ['step']
  }
})
@DefLayout({
  type : 'div',
  items: [
    {
      type: 'heading',
      level: 5,
      title: 'Orientation'
    },
    {
      key: 'variant',
      htmlClass: 'mb-3'
    },
    {
      type: 'row',
      htmlClass: 'mb-3',
      items: [
        {
          type: 'col',
          xs: 6,
          items: [
            {
              type: 'heading',
              level: 5,
              title: 'Linear'
            },
            {
              key: 'linear',
              htmlClass: 'h5'
            }
          ]
        },
        {
          type: 'col',
          xs: 6,
          items: [
            {
              type: 'heading',
              level: 5,
              title: 'Primary'
            },
            {
              key: 'primary',
              htmlClass: 'h5'
            }
          ]
        }
      ]
    },
    {
      type: 'div',
      htmlClass: 'mb-3',
      items: [
        {
          type: 'heading',
          level: 5,
          title: 'Initialize on specific step'
        },
        {
          type: 'span',
          title: 'Determine on:'
        },
        {
          key: '_initialStep.initStepType'
        },
        {
          key: '_initialStep.initStepNumber',
          visibleIf: {
            $eval: `return ($val._initialStep.initStepType == 'number');`,
            dependencies: ['_initialStep.initStepType']
          }
        },
        {
          key: '_initialStep.initStepCustom.$eval',
          visibleIf: {
            $eval: `return ($val._initialStep.initStepType == 'custom');`,
            dependencies: ['_initialStep.initStepType']
          }
        }
      ]
    },
    {
      type: 'div',
      htmlClass: '',
      items: [
        {
          type: 'heading',
          title: 'On step change',
          level: 5
        },
        {
          key: 'onStepChange.$eval'
        }
      ]
    }
    
  ]
})

@DefTransform((x: any) => {
  x.schema.properties._initialStep = {
    type: 'object',
    properties: {
      initStepType: {
        type: 'string',
        handler: {
          type: 'common/button-toggle',
          values: [
            { label: 'Specific step', value: 'number'},
            { label: 'Custom code', value: 'custom'}
          ]
        }
      },
      initStepNumber: {
        type: 'number',
        title: 'Step',
        description: 'Choose on which step should stepper be initialized.'
      },
      initStepCustom: {
        type: 'object',
        properties: {
          $eval: {
            type: 'string',
            handler: {
              type: 'common/code-editor',
              options: {
                language: 'javascript'
              },
              description: 'Custom code to determine on which step should stepper be initialized.'
            }
          }
        }
      }
    },
    onValueChange: {
      updateDependencyValue: [
        {
          mode: 'set',
          key: 'initialStep',
          value: {
            $eval: `
            if ($val._initialStep.initStepType == 'number'){
              return $val._initialStep.initStepNumber;
            }

            if ($val._order.orderType == 'custom'){
              return $val._initialStep.initStepCustom;
            }
            `
          }
        }
      ]
    }
  };  

  return x;
})

@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Layout')
export class JsfLayoutStepper extends JsfAbstractItemsLayout<'stepper'> {

  @DefProp('JsfLayoutStep[]')
  items: JsfLayoutStep[];

  @DefProp({
    type       : 'string',
    title      : 'Variant',
    description: 'Choose stepper to be horizontal or vertical.',
    handler: {
      type: 'common/button-toggle',
      values: [
        { label: 'Horizontal', value: 'horizontal'},
        { label: 'Vertical', value: 'vertical'}
      ]
    },
    required: true,
    default: 'horizontal'
  })
  variant?: 'horizontal' | 'vertical';

  @DefProp({
    type : 'boolean'
  })
  linear?: boolean;

  @DefProp({
    type : 'boolean'
  })
  primary?: boolean;

  @DefProp('JsfLayoutStepperPreferences')
  preferences?: JsfLayoutStepperPreferences;

  @DefProp({
    type      : 'object',
    handler   : { type: 'any' },
    properties: {},
  })
  initialStep?: number | {
    $eval: string;
  };

  // Event - step change
  @DefProp({
    type      : 'object',
    title     : 'On step change',
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
  onStepChange?: {
    $eval: string;
  };

  constructor(data: JsfLayoutStepper) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutStepperPreferences {
  /**
   * Stepper variant.
   */
  appearance: 'standard' | 'compact';
  /**
   * Define the position of the labels.
   * Only available for horizontal-type stepper.
   */
  labelPosition?: 'end' | 'bottom';
  /**
   * Define the position of the step header.
   */
  stepHeaderPosition: 'start' | 'end';
  /**
   * Name of a material icon to use as the edit icon.
   * See https://material.io/tools/icons/
   */
  editIcon: string;
  /**
   * Name of a material icon to use as the done icon.
   * See https://material.io/tools/icons/
   */
  doneIcon: string;
}
