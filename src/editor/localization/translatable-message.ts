import { isString, isNil } from 'lodash';

export class TranslatableMessage {

  /**
   * Extracted text.
   */
  text: string;
  /**
   * Extracted id.
   */
  private _id?: string;

  public get id(): string {
    return this._id;
  }

  constructor(public sourceContent: string) {
    this.parseSourceContent();
  }

  private parseSourceContent() {
    if (!isString(this.sourceContent)) {
      return;
    }

    const markerIndex = this.sourceContent.indexOf('@@');
    if (markerIndex === 0) {
      const delimiterIndex = this.sourceContent.indexOf(':');
      if (delimiterIndex === -1) {
        throw new Error(`Invalid translatable string format`)
      }
      this._id  = this.sourceContent.substring(2, delimiterIndex);
      this.text = this.sourceContent.substring(delimiterIndex + 1);
    } else {
      this.text = this.sourceContent;
    }
  }

  public hasSourceContent() {
    return !isNil(this.sourceContent);
  }
}
