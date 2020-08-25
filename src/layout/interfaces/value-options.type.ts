export class JsfValueOptionsInterface {
  /**
   * From other prop.
   */
  key?: string;

  const?: any;
  $eval?: string;

  /**
   * You should use $eval, this file dis auto generated.
   * @ignore
   */
  $evalTranspiled?: string;

  paste?: string;

  // PROPOSAL:
  // /**
  //  * Set from query URL
  //  */
  // query?: string;
  // /**
  //  * Set from local storage
  //  */
  // localStorage?: string;
}

export type JsfValueOptionsType = string | boolean | null | JsfValueOptionsInterface | undefined;
