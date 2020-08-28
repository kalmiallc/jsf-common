import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'ref',
  title   : 'Ref',
  category: 'Misc',
  icon    : 'unknown.svg'
};

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
