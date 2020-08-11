import { JsfAbstractItemsLayout }                      from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout }                            from '../../index';
import { createDependencyArray }                       from '../../../jsf-for-jsf/util/dependency-array';
import { DefLayoutInfo }                               from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'step',
  title: 'Step',
  icon: 'unknown.svg',
  items: {
    enabled: true
  }
})
@DefLayout({
  type : 'div',
  items: [
    {
      key: 'title',
      htmlClass: 'mb-3'
    },
    {
      type: 'div',
      htmlClass: 'mb-3',
      items: [
        {
          type: 'heading',
          level: 5,
          title: 'Template data'
        },
        {
          key: 'templateData.$eval'
        },
        createDependencyArray('templateData')
      ]
    },
    {
      type: 'div',
      htmlClass: 'mb-3',
      items: [
        {
          type: 'heading',
          level: 5,
          title: 'Linear Validation Props'
        },
        {
          type: 'array',
          key: 'linearValidationProps',
          items: [
            {
              type: 'row',
              items: [
                {
                  type: 'col',
                  xs: 'auto',
                  items: [
                    {
                      key: 'linearValidationProps[]'
                    }
                  ]
                },
                {
                  type: 'col',
                  xs: 'content',
                  items: [
                    {
                      type: 'array-item-remove',
                      title: '',
                      icon: 'clear',
                      tooltip: 'Delete',
                      preferences: {
                        variant: 'icon'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'array-item-add',
          path: 'linearValidationProps',
          title: 'Add validation prop'
        }
      ]
    },
    {
      key: 'optional',
      htmlClass: 'mb-3'
    },
    {
      key: 'editable',
      htmlClass: 'mb-3'
    }
  ]
})

@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutStep extends JsfAbstractItemsLayout<'step'> {
  @DefProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];
  
  @DefProp({
    type : 'string',
    title: 'Title',
  })
  title?: string;

  @DefProp({
    type      : 'object',
    title     : 'Template data',
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
      }
    }
  })
  templateData?: {
    $eval: string,
    dependencies?: string[]
  };

  /**
   * Array of prop paths which will be checked to determine if this step is valid
   * @deprecated This is now done automatically
   */
  @DefProp({
    type : 'array',
    title: 'Linear validation props',
    items:{
      type: 'string'
    }
  })
  linearValidationProps?: string[];

  @DefProp({
    type : 'boolean',
    title: 'Optional step',
  })
  optional?: boolean;

  @DefProp({
    type : 'boolean',
    title: 'Editable step',
  })
  editable?: boolean;

  @DefProp('JsfLayoutStepPreferences')
  preferences?: JsfLayoutStepPreferences;

  constructor(data: JsfLayoutStep) {
    super();
    Object.assign(this, data);
  }
}

export interface JsfLayoutStepPreferences {
}
