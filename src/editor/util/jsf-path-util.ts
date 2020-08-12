export function pathNextProp(path: string) {
  if (!path) {
    return [];
  }

  const dotIndex     = path.indexOf('.');
  const bracketIndex = path.indexOf('[');
  let dIndex;
  let dEndIndex;

  if (dotIndex === -1 && bracketIndex === -1) {
    return [path];
  } else if (dotIndex !== -1 && bracketIndex === -1) {
    dIndex = dotIndex;
    dEndIndex = dotIndex + 1;
  } else if (bracketIndex !== 1 && dotIndex === -1) {
    dIndex = bracketIndex;
    dEndIndex = bracketIndex;
  } else if (dotIndex < bracketIndex) {
    dIndex = dotIndex;
    dEndIndex = dotIndex + 1;
  } else {
    dIndex = bracketIndex;
    dEndIndex = bracketIndex;
  }

  return [path.substring(0, dIndex), path.substring(dEndIndex)];
}
