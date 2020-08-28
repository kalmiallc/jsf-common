import { JsfAbstractProp } from '../abstract/abstract-prop';
import { JsfHandlerId }    from '../../handlers';

export class JsfPropId extends JsfAbstractProp<string, 'id', JsfHandlerId> {
  constructor(data: JsfPropId) {
    super();
    Object.assign(this, data);
  }
}
