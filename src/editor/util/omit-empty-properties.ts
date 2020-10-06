import { isArray, isEmpty, isNil, isPlainObject, omitBy } from 'lodash';

export function omitEmptyProperties(x: any) {
  if (isArray(x)) {
    return x.map(y => omitEmptyProperties(y)).filter(y => !isOmittableValue(y));
  }
  if (!isPlainObject(x)) {
    return x;
  }

  return omitBy(x, (value: any, key: string) => {
    if (isPlainObject(value)) {
      x[key] = value = omitEmptyProperties(value);
    }
    if (isArray(value)) {
      x[key] = value = value.map(y => omitEmptyProperties(y)).filter(y => !isOmittableValue(y));
    }
    return isOmittableValue(value);
  });
}

function isOmittableValue(value: any) {
  return isNil(value) || ((isPlainObject(value) || isArray(value)) && isEmpty(value));
}
