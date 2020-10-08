import { JsfBuilder }                 from '../builder';
import { JsfAnalyticsEventInterface } from './jsf-analytics-event.interface';

export class JsfAnalyticsService {

  constructor(private builder: JsfBuilder) {
  }

  track(event: JsfAnalyticsEventInterface) {
    this.builder.runOnFormEventHook({
      event: `analytics:event`,
      value: event
    })
  }
}
