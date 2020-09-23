import { JsfAbstractHandler }            from '../../schema/abstract/abstract-handler';
import { HandlerCompatibilityInterface } from '../../register/interfaces';
import { EditorInterfaceLayoutFactory }  from '../../editor/helpers/editor-factory/editor-interface-layout-factory';

export class JsfHandlerComponent extends JsfAbstractHandler<'component'> {

}

export const jsfHandlerComponentJsfFormDefinition: any = {
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
      innerScroll        : {
        type : 'boolean',
        title: 'Inner scroll'
      },
      htmlClass          : {
        type : 'string',
      },
      componentDefinition: {
        type      : 'object',
        properties: {
          dataSourcesFilters: {
            type : 'array',
            items: {
              type      : 'object',
              properties: {
                dataSource: {
                  type    : 'string',
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
      }
    }
  },
  layout    : {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.outputKey('innerScroll'),
      ...EditorInterfaceLayoutFactory.outputKey('htmlClass', 'Component HTML class'),
      ...EditorInterfaceLayoutFactory.outputKey('componentDefinition.jsfDefinition.$ref', 'JSF definition'),
      ...EditorInterfaceLayoutFactory.createLabel('Data sources'),
      ...EditorInterfaceLayoutFactory.outputArrayCardListKey('componentDefinition.dataSources',
        { $eval: `return { value: 'Data source' }`, dependencies: [] },
        [
          ...EditorInterfaceLayoutFactory.outputKey('componentDefinition.dataSources[].key', 'Data source')
        ]),

      ...EditorInterfaceLayoutFactory.createLabel('Data source filters'),
      ...EditorInterfaceLayoutFactory.outputArrayCardListKey('componentDefinition.dataSourcesFilters',
        { $eval: `return { value: 'Filter' }`, dependencies: [] },
        [
          {
            type : 'row',
            items: [
              {
                type : 'col',
                xs   : 6,
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('componentDefinition.dataSourcesFilters[].dataSource', 'Data source')
                ]
              },
              {
                type : 'col',
                xs   : 6,
                items: [
                  ...EditorInterfaceLayoutFactory.outputKey('componentDefinition.dataSourcesFilters[].filterPath', 'Filter path')
                ]
              }
            ]
          }
        ])

    ]
  }
};

export const jsfHandlerComponentJsfLayoutDefinition: any = {
  schema: {
    type      : 'object',
    properties: {}
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Component', [
          ...EditorInterfaceLayoutFactory.createLabel('No configuration available.')
        ])
      ])
    ]
  }
};

export const jsfHandlerComponentCompatibility: HandlerCompatibilityInterface = {

  formDefinition  : jsfHandlerComponentJsfFormDefinition,
  layoutDefinition: jsfHandlerComponentJsfLayoutDefinition,
  title           : 'Component',
  icon            : 'handler-icons/component.svg',
  category        : 'Core',

  compatibleWith: [
    {
      type: 'object'
    }
  ],

  localization: {
    translatableProperties: []
  }
};
