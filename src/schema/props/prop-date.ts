import { JsfAbstractPropPrimitive } from '../abstract/abstract-prop-primitive';
import { JsfHandlerDate }           from '../../handlers';

export class JsfPropDate extends JsfAbstractPropPrimitive<Date, 'date', JsfHandlerDate> {

  /**
   * The value of "minimum" MUST be a Date, representing an inclusive lower limit for a date instance.
   *
   * If the instance is a date, then this keyword validates only if the instance is greater than or exactly equal to
   * "minimum".
   */
  minimum?: Date;

  /**
   * The value of "maximum" MUST be a date, representing an inclusive upper limit for a date instance.
   *
   * If the instance is a date, then this keyword validates only if the instance is less than or exactly equal to
   * "maximum".
   */
  maximum?: Date;

  constructor(data: JsfPropDate) {
    super();
    Object.assign(this, data);
  }

}
