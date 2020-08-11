import { JsfAbstractSpecialLayout }       from '../../abstract/abstract-layout';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'ref',
  title: 'Ref',
  icon: 'unknown.svg'
})
export class JsfLayoutRef extends JsfAbstractSpecialLayout<'$ref'> {

  type: never;

  /**
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

  constructor(data: JsfLayoutRef) {
    super();
    Object.assign(this, data);
  }
}
