export interface TranslatedMessage {

  sourceText?: string;
  sourceId?: string;

  targetText?: string;

  /**
   * If set to true, this message is considered to be custom and we allow the user to modify the source as well as the target texts.
   */
  custom?: boolean;
}
