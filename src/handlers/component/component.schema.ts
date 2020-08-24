import { JsfAbstractHandler }            from '../../schema/abstract/abstract-handler';
import { JsfDefinition }                 from '../../jsf-definition';
import { HandlerCompatibilityInterface } from '../../jsf-register';

export class JsfHandlerComponent extends JsfAbstractHandler<'component'> {

}

export const jsfHandlerComponentJsfDefinition: any = {
  $providers: {
    'jsf-definitions': {
      source: {
        $eval: `const definitions =  _.get($clientConfig, 'builder.jsf-definitions', {})
          return Object.keys(definitions).map((x) => ({
            label: definitions[x].definition.title || x,
            value: x
          }))`
      },
      cache : false
    },
    'data-sources'   : {
      source: {
        $eval: `const dataSources =  _.get($clientConfig, 'builder.data-sources', {})
          return Object.keys(dataSources).map((x) => ({
            label: dataSources[x].title || x,
            value: x
          }))`
      },
      cache : false
    }
  },
  schema    : {
    type      : 'object',
    properties: {
      innerScroll       : {
        type : 'boolean',
        title: 'Inner scroll'
      },
      htmlClass         : {
        type     : 'string',
        title    : 'HTML class',
        htmlClass: 'mt-2'
      },
      dataSourcesFilters: {
        type : 'array',
        items: {
          type      : 'object',
          properties: {
            dataSource: {
              type    : 'string',
              title   : 'Data source',
              required: true,
              handler : {
                type  : 'common/dropdown',
                values: {
                  provider: {
                    key: 'data-sources'
                  }
                }
              }
            },
            filterPath: {
              type : 'string',
              title: 'Filter path'
            }
          }
        }
      },
      dataSources       : {
        type : 'array',
        items: {
          type      : 'object',
          properties: {
            key: {
              type    : 'string',
              required: true,
              title   : 'Data source key',
              handler : {
                type  : 'common/dropdown',
                values: {
                  provider: {
                    key: 'data-sources'
                  }
                }
              }
            }
          }
        }
      },
      jsfDefinition     : {
        type      : 'object',
        properties: {
          $ref: {
            type    : 'string',
            title   : 'JSF definition',
            required: true,
            handler : {
              type  : 'common/dropdown',
              values: {
                provider: {
                  key: 'jsf-definitions'
                }
              }
            }
          }
        }
      }
    }
  },
  layout    : {
    type : 'div',
    items: [
      {
        key: 'innerScroll'
      },
      {
        key: 'htmlClass'
      },
      {
        type     : 'heading',
        level    : 5,
        title    : 'Data sources',
        htmlClass: 'mt-3'
      },
      {
        key  : 'dataSources',
        type : 'array',
        items: [
          {
            type : 'row',
            items: [
              {
                type : 'col',
                xs   : 10,
                items: [
                  {
                    key: 'dataSources[].key'
                  }
                ]
              },
              {
                type : 'col',
                xs   : 2,
                items: [
                  {
                    type       : 'button',
                    icon       : 'delete',
                    preferences: {
                      variant: 'icon'
                    },
                    onClick    : [
                      {
                        arrayItemRemove: {
                          path : 'dataSources',
                          index: {
                            $eval: `return $getItemIndex('dataSources[]')`
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type       : 'button',
        icon       : 'add',
        preferences: {
          variant: 'icon'
        },
        onClick    : [
          {
            arrayItemAdd: {
              path: 'dataSources'
            }
          }
        ]
      },

      {
        type     : 'heading',
        level    : 5,
        title    : 'Data sources filters',
        htmlClass: 'mt-3'
      },
      {
        key  : 'dataSourcesFilters',
        type : 'array',
        items: [
          {
            type : 'row',
            items: [
              {
                type : 'col',
                xs   : 10,
                items: [
                  {
                    type : 'row',
                    items: [
                      {
                        type : 'col',
                        xs   : 6,
                        items: [
                          {
                            key: 'dataSourcesFilters[].dataSource'
                          }
                        ]
                      },
                      {
                        type : 'col',
                        xs   : 6,
                        items: [
                          {
                            key: 'dataSourcesFilters[].filterPath'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                type : 'col',
                xs   : 2,
                items: [
                  {
                    type       : 'button',
                    icon       : 'delete',
                    preferences: {
                      variant: 'icon'
                    },
                    onClick    : [
                      {
                        arrayItemRemove: {
                          path : 'dataSourcesFilters',
                          index: {
                            $eval: `return $getItemIndex('dataSourcesFilters[]')`
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type       : 'button',
        icon       : 'add',
        preferences: {
          variant: 'icon'
        },
        onClick    : [
          {
            arrayItemAdd: {
              path: 'dataSourcesFilters'
            }
          }
        ]
      },

      {
        type     : 'heading',
        level    : 5,
        title    : 'JSF definition',
        htmlClass: 'mt-3'
      },
      {
        key: 'jsfDefinition.$ref'
      }

    ]
  }
};


export const jsfHandlerComponentCompatibility: HandlerCompatibilityInterface = {

  formDefinition: jsfHandlerComponentJsfDefinition,
  title         : 'Component',
  icon          : 'handler-icons/component.svg',
  category      : 'Core',

  compatibleWith: [
    {
      type: 'object'
    }
  ]
};
