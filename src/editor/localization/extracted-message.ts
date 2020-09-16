import { isString, isNil } from 'lodash';

export class ExtractedMessage {

  /**
   * Extracted text.
   */
  sourceText: string;
  /**
   * Extracted id.
   */
  private _id?: string;

  public get id(): string {
    return this._id;
  }

  constructor(public rawContent: string) {
    this.parseSourceContent();
  }

  private parseSourceContent() {
    if (!isString(this.rawContent)) {
      return;
    }

    const markerIndex = this.rawContent.indexOf('@@');
    if (markerIndex === 0) {
      const delimiterIndex = this.rawContent.indexOf(':');
      if (delimiterIndex === -1) {
        throw new Error(`Invalid translatable string format`)
      }
      this._id        = this.rawContent.substring(2, delimiterIndex);
      this.sourceText = this.rawContent.substring(delimiterIndex + 1);
    } else {
      this.sourceText = this.rawContent;
    }
  }

  public hasSourceContent() {
    return !isNil(this.rawContent);
  }
}
