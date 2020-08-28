import { JsfAbstractBareProp } from '../abstract/abstract-prop';
import { JsfHandlerRef }       from '../../handlers';

export class JsfPropRef extends JsfAbstractBareProp<'ref', JsfHandlerRef> {

  /**
   * JSF schema definition to use.
   *
   * Internal import:
   * - #/definitions/abc
   * External import:
   * - /abc
   */
  $ref: string;

  set?: {
    path: string;
    value: any;
  }[];

  constructor(data: JsfPropRef) {
    super();
    Object.assign(this, data);
  }
}
