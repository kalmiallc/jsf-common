import { isArray, isEmpty, isNil, isObject, omitBy } from 'lodash';

export function omitEmptyProperties(value: any) {
  return omitEmptyPropertiesInternal(value);
}

function omitEmptyPropertiesInternal(x: any) {
  return omitBy(x, (value: any, key: string) => {
    if (isObject(value)) {
      value = omitEmptyPropertiesInternal(value);
    }
    return isNil(value) || ((isObject(value) || isArray(value)) && isEmpty(value));
  });
}
