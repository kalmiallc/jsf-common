import { isI18nObject, JsfI18nObject }         from './translatable-message';
import { memoize, template, TemplateExecutor } from 'lodash';
import { ExtractedMessage }                    from '../editor/localization';

export interface JsfTranslations {
  [key: string]: string;
}

export class JsfTranslationServer {

  public translations: JsfTranslations;

  /**
   * Get a template for a given string.
   */
  public getTemplate: (source: string) => TemplateExecutor = memoize(this._getTemplate);

  constructor(translations?: JsfTranslations) {
    this.translations = translations;
  }

  /**
   * Get translated string for a given string or i18n object.
   * @param source The string to translate, or an i18n object.
   */
  public get(source: string | JsfI18nObject): string {
    // Handle empty strings
    if (!source) {
      return source as any;
    }

    // Lookup value from translation table
    if (isI18nObject(source)) {
      return this.translations ? this.translations[String(source.id)] || source.val : source.val;
    } else {
      const lookupValue = String(source);
      const message = new ExtractedMessage(lookupValue);
      if (!this.translations) {
        return message.sourceText;
      }
      return this.translations[lookupValue] ? this.translations[lookupValue] : message.sourceText;
    }
  }

  private _getTemplate(source: string) {
    return template(source, {
      interpolate: /{{([\s\S]+?)}}/g
    });
  }
}
