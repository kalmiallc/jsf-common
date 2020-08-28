import { JsfAbstractPropPrimitive } from '../abstract/abstract-prop-primitive';
import { JsfHandlerBoolean }        from '../../handlers';

export class JsfPropBoolean extends JsfAbstractPropPrimitive<boolean, 'boolean', JsfHandlerBoolean> {

  constructor(data: JsfPropBoolean) {
    super();
    Object.assign(this, data);
  }

}
