
export function arrayCardListKey(key: string, cardTitleTemplateData: { $eval: string, dependencies: string[] }, cardContentItems: any[]) {
  return [
    {
      type: 'div',
      items: [
        {
          type: 'div',
          visibleIf: {
            $eval: `return !$getItemValue('${ key }').length`,
            dependencies: [key]
          },
          htmlClass: '__background-color--grey-light-50 rounded-sm px-2 py-2 text-center mb-1',
          items: [
            {
              type: 'span',
              title: 'No items.'
            }
          ]
        },
        {
          type: 'array',
          key,
          items: [
            {
              type : 'div',
              htmlClass: 'p-1 border rounded-sm mb-2 __shadow-float--black',
              items: [
                {
                  type : 'div',
                  htmlClass: '__background-color--grey-light-50 rounded-sm px-2 py-2 mt-n1 mx-n1 mb-1',
                  items: [
                    {
                      type: 'row',
                      items: [
                        {
                          type: 'col',
                          xs: 'auto',
                          items: [
                            {
                              type : 'heading',
                              level: 6,
                              htmlClass: 'my-0',
                              title: '{{ value }}',
                              templateData: cardTitleTemplateData
                            }
                          ]
                        },
                        {
                          type: 'col',
                          xs: 'content',
                          items: [
                            {
                              type: 'button',
                              icon: 'delete',
                              htmlClass: 'mt-n3 mb-n2 mr-n3',
                              preferences: {
                                variant: 'icon',
                                color: 'primary'
                              },
                              onClick: {
                                arrayItemRemove: {
                                  path: key,
                                  index: {
                                    $eval: `return $getItemIndex('${ key }[]')`
                                  }
                                }
                              }
                            }
                          ]
                        }
                      ]
                    },
                  ]
                },
                ... cardContentItems
              ]
            }
          ]
        },
        {
          type: 'button',
          title: ' Add new',
          htmlClass: 'my-0',
          icon: 'add',
          preferences: {
            variant: 'basic'
          },
          onClick: {
            arrayItemAdd: {
              path: key
            }
          }
        }
      ]
    }
  ]
}
