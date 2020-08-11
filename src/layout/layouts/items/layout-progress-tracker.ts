import { JsfAbstractItemsLayout }           from '../../abstract/abstract-layout';
import { DefCategory, DefExtends, DefProp, DefLayout, DefSpecialProp } from '../../../jsf-for-jsf/decorators';
import { JsfLayoutProgressTrackerStep }     from '../special';
import { createDependencyArray } from '../../../jsf-for-jsf/util/dependency-array';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'progress-tracker',
  title: 'Progress tracker',
  icon: 'layout-icons/progress-tracker.svg',
  items: {
    enabled: true,
    fixed: ['progress-tracker-step']
  }
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
@DefLayout({
  type: 'div',
  items: [
    // { key: 'items' },  // TOOD: Implement DefSpecialProp before uncommenting this
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Step',
          level: 5
        },
        { key: 'step.$eval' },
        createDependencyArray('step')
      ]
    }

  ]
})
export class JsfLayoutProgressTracker extends JsfAbstractItemsLayout<'progress-tracker'> {
  @DefSpecialProp('JsfLayoutProgressTrackerStep[]')
  items: JsfLayoutProgressTrackerStep[];

  @DefProp({
    type: 'object',
    properties: {
      $eval: {
        type: 'string',
        title: 'Eval',
        handler: {
          type: 'common/code-editor',
          options: {
            language: 'javascript'
          }
        }
      },
      dependencies: {
        type: 'array',
        title: 'Dependenices',
        items: {
          type: 'string'
        }
      }
    }
  })
  step?: number | {
    $eval: string;
    dependencies: string[]
  }; // Range 0 to n, where n is last step index

  @DefProp({
    type: 'string',
    title: 'Progress title'
  })
  progressTitle: string;

  @DefProp({
    type: 'object',
    title: 'Progress title template data',
    properties: {
      $eval: {
        type: 'string',
        title: 'Eval',
        handler: {
          type: 'common/code-editor',
          options: {
            language: 'javascript'
          }
        }
      },
      dependencies: {
        type: 'array',
        title: 'Dependenices',
        items: {
          type: 'string'
        }
      }
    }
  })
  progressTitleTemplateData: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutProgressTracker) {
    super();
    Object.assign(this, data);
  }
}
