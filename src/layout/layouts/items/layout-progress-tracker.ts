import { LayoutInfoInterface }                                  from '../../../register/interfaces';
import { JsfAbstractItemsLayout, JsfLayoutProgressTrackerStep } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'progress-tracker',
  title   : 'Progress tracker',
  category: 'Layout',
  icon    : 'layout-icons/progress-tracker.svg',
  items   : {
    enabled: true,
    fixed  : ['progress-tracker-step']
  }
};

export class JsfLayoutProgressTracker extends JsfAbstractItemsLayout<'progress-tracker'> {
  items: JsfLayoutProgressTrackerStep[];

  step?: number | {
    $eval: string;
    dependencies: string[]
  }; // Range 0 to n, where n is last step index

  progressTitle: string;

  progressTitleTemplateData: {
    $eval: string,
    dependencies?: string[]
  };

  constructor(data: JsfLayoutProgressTracker) {
    super();
    Object.assign(this, data);
  }
}
