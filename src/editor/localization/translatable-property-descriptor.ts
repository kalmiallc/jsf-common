/**
 * Describes a translatable property.
 *
 * Can be one of the following:
 * a) a string path to the value you want to translate, in which case the extractor will fetch the text from this path;
 * b) a function that accepts the json object of the definition fragment and returns an array of texts that are translatable.
 */
export type TranslatablePropertyDescriptor = string | ((definition: any) => string[]);
