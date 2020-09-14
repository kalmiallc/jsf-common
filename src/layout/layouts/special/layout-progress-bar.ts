import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'progress-bar',
  title       : 'Progress bar',
  category    : 'Buttons & Indicators',
  icon        : 'layout-icons/progress-bar.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutProgressBar extends JsfAbstractSpecialLayout<'progress-bar'> {

  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';

  color?: 'primary' | 'accent' | 'warn';

  progress?: number | {
    $eval: string;
    dependencies: string[]
  }; // Range 0 to 100

  constructor(data: JsfLayoutProgressBar) {
    super();
    Object.assign(this, data);
  }
}

export const layoutProgressBarJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      mode    : {
        type       : 'string',
        title      : 'Mode',
        description: 'Select mode',
        handler    : {
          type  : 'common/dropdown',
          values: [
            {
              label: 'determinate',
              value: 'determinate'
            },
            {
              label: 'indeterminate',
              value: 'indeterminate'
            },
            {
              label: 'buffer',
              value: 'buffer'
            },
            {
              label: 'query',
              value: 'query'
            }
          ]
        }
      },
      color   : {
        type       : 'string',
        title      : 'Color',
        description: 'Select color',
        handler    : {
          type  : 'common/dropdown',
          values: [
            {
              label: 'primary',
              value: 'primary'
            },
            {
              label: 'accent',
              value: 'accent'
            },
            {
              label: 'warn',
              value: 'warn'
            }
          ]
        }
      },
      progress: {
        type      : 'object',
        handler   : {
          type: 'any'
        },
        properties: {}
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Progress Bar', [
          {
            type : 'div',
            items: [
              {
                type : 'heading',
                level: 5,
                title: 'Mode'
              },
              {
                key: 'mode'
              },
              {
                type : 'heading',
                level: 5,
                title: 'Color'
              },
              {
                key: 'color'
              },
              {
                type : 'heading',
                level: 5,
                title: 'Progress'
              },
              {
                type     : 'span',
                title    : 'Value must be in range of 0 to 100.',
                htmlClass: 'ml-3 text-muted small'
              },
              {
                key: '_progress.progressType'
              },
              {
                key        : '_progress.typeNumber',
                placeholder: '%',
                visibleIf  : {
                  $eval       : 'return $val._progress.progressType == \'number\'',
                  dependencies: [
                    '_progress.progressType'
                  ]
                }
              },
              {
                type     : 'div',
                visibleIf: {
                  $eval       : 'return $val._progress.progressType == \'custom\'',
                  dependencies: [
                    '_progress.progressType'
                  ]
                },
                items    : [
                  {
                    key: '_progress.typeCustom.$eval'
                  },
                  {
                    type : 'div',
                    items: [
                      {
                        type : 'heading',
                        title: 'Dependencies',
                        level: 6
                      },
                      {
                        type : 'array',
                        key  : '_progress.typeCustom.dependencies',
                        items: [
                          {
                            type : 'row',
                            items: [
                              {
                                type : 'col',
                                xs   : 'auto',
                                items: [
                                  {
                                    key: '_progress.typeCustom.dependencies[]'
                                  }
                                ]
                              },
                              {
                                type : 'col',
                                xs   : 'content',
                                items: [
                                  {
                                    type       : 'button',
                                    icon       : 'delete',
                                    color      : 'accent',
                                    preferences: {
                                      variant: 'icon'
                                    },
                                    onClick    : [
                                      {
                                        arrayItemRemove: {
                                          path : '_progress.typeCustom.dependencies',
                                          index: {
                                            $eval: 'return $getItemIndex(\'_progress.typeCustom.dependencies[]\')'
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
                        type     : 'div',
                        visibleIf: {
                          $eval       : 'return !$val._progress.typeCustom.dependencies.length',
                          dependencies: [
                            '_progress.typeCustom'
                          ]
                        },
                        items    : [
                          {
                            type     : 'span',
                            htmlClass: 'd-block py-4 text-center',
                            title    : 'No dependencies yet.'
                          }
                        ]
                      },
                      {
                        type   : 'button',
                        icon   : 'add',
                        title  : 'Add dependency',
                        onClick: {
                          arrayItemAdd: {
                            path: '_progress.typeCustom.dependencies'
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }

        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('progress-bar', layoutInfo, layoutProgressBarJsfDefinition);
