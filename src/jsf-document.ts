import { JsfPropJsonValue } from './schema/index';
import { JsfDefinition }    from './jsf-definition';

export class JsfDocument extends JsfDefinition {
  /**
   * Object to populate the form with default or previously submitted values (set value).
   */
  value?: JsfPropJsonValue;

  /**
   * Object to populate the form with default or previously submitted values (patch value).
   */
  patchValue?: JsfPropJsonValue;
}
