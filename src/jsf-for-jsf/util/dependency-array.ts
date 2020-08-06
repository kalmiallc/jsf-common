/**
 * Function that creates addable array for jsf forms. By default, it creates array
 * for dependencies, but by providing additional arguments it can be (ab)used to
 * create other kinds of arrays as needed.
 * @param ancestorKey key of the parent object. If making an array for root property, this should be null or undefined
 * @param itemKey (optional) key of the array object (default: 'dependencies')
 * @param title (optional) Title displayed above array (default: 'Dependencies')
 * @param zeroItemsText (optional) Text displayed when array is empty (default: 'No dependencies yet')
 * @param addItemButtonTitle (optional) Text displayed on button that adds elements to array (default: 'Add dependency')
 * @param subitemKeys (optional) If array element is an object rather than a primitive, provide object properties as string array.
 */
export function createDependencyArray(
  ancestorKey: string,
  itemKey = 'dependencies',
  title = 'Dependencies',
  zeroItemsText = 'No dependencies yet.',
  addItemButtonTitle = 'Add dependency',
  subitemKeys?: string[]
) {
  const ancestorKeyWithDot = ancestorKey ? `${ancestorKey}.` : '';

  return {
    type: 'div',
    items: [
      {
        type: 'heading',
        title: title,
        level: 6
      },
      {
        type: 'array',
        key: `${ancestorKeyWithDot}${itemKey}`,
        items: [
          {
            type: 'expansion-panel-content',
            items: [
              {
                type: 'hr'
              },
              {
                type: 'div',
                htmlClass: 'd-flex justify-content-between',
                items: [
                  { type: 'div' },
                  {
                    type: 'button',
                    icon: 'delete',
                    color: 'accent',
                    preferences: {
                      variant: 'icon'
                    },
                    onClick: [
                      {
                        arrayItemRemove: {
                          path: `${ancestorKeyWithDot}${itemKey}`,
                          index: {
                            $eval: `return $getItemIndex('${ancestorKeyWithDot}${itemKey}[]')`
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              ...createSubitems(ancestorKeyWithDot, itemKey, subitemKeys)
            ]
          }
        ]
      },
      {
        type: 'div',
        visibleIf: {
          $eval: `return !$val.${ancestorKeyWithDot}${itemKey}.length`,
          dependencies: [ancestorKey]
        },
        items: [
          {
            type: 'span',
            htmlClass: 'd-block py-4 text-center',
            title: zeroItemsText
          }
        ]
      },
      {
        type: 'div',
        // horizontalAlign: 'center',
        htmlClass: 'mt-2 text-center',
        items: [
          {
            type: 'button',
            title: addItemButtonTitle,
            // htmlClass: 't-3',
            onClick: {
              arrayItemAdd: {
                path: `${ancestorKeyWithDot}${itemKey}`,
              }
            }
          },
        ]
      }
    ]
  }
}

/**
 * Helper function that creates array items for createDependencyArray
 * @param ancestorKeyWithDot key of the parent object with dot (e.g. "property.")
 * @param itemKey key of the array
 * @param subitemKeys if array item is an object, provide object properties as array of strings
 */
function createSubitems(ancestorKeyWithDot: string, itemKey: string, subitemKeys?: string[]) {
  if (!subitemKeys) {
    return [{key: `${ancestorKeyWithDot}${itemKey}[]`}];
  }

  const keyArray: {key: string}[] = [];

  for (const key of subitemKeys) {
    keyArray.push({key: `${ancestorKeyWithDot}${itemKey}[].${key}`});
  }

  return keyArray;
}
