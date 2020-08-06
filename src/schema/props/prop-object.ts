import { JsfProp, JsfPropJsonValue, JsfPropValue } from './index';
import { JsfAbstractProp }                         from '../abstract/abstract-prop';
import { JsfHandlerObject }                        from '../../handlers';
import { DefExtends, DefLayout, DefProp, DefCategory }          from '../../jsf-for-jsf/decorators';


export interface JsfPropObjectValue {
  [propertyName: string]: JsfPropValue;
}

export interface JsfPropObjectJsonValue {
  [propertyName: string]: JsfPropJsonValue;
}

@DefLayout({
  type : 'div',
  items: [
    // {
    //   key: 'properties'
    // },
    {
      type: 'div',
      items: [
        {
          type: 'heading',
          title: 'Required properties',
          level: 6
        },
        {
          type: 'array',
          key: 'required',
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
                    {
                      type: 'div',
                    },
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
                            path: 'required',
                            index: {
                              $eval: `return $getItemIndex('required[]')`
                            }
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  key: 'required[]'
                },
              ]
            }
          ]
        },
        {
          type: 'div',
          visibleIf: {
            $eval: `return !$val.required.length`,
            dependencies: ['required']
          },
          items: [
            {
              type: 'span',
              htmlClass: 'd-block py-4 text-center',
              title: 'No required properties yet.'
            }
          ]
        },
        {
          type: 'row',
          horizontalAlign: 'center',
          htmlClass: 'mt-2',
          items: [
            {
              type: 'button',
              title: 'Add required property',
              // htmlClass: 't-3',
              onClick: {
                arrayItemAdd: {
                  path: 'required',
                }
              }
            },
          ]
        }
      ]
    }
  ]
})
@DefExtends('JsfAbstractProp')
export class JsfPropObject extends JsfAbstractProp<JsfPropObjectValue, 'object', JsfHandlerObject> {


  /**
   * The value of "properties" MUST be an object. Each value of this object MUST be a valid JSON Schema.
   *
   * This keyword determines how child instances validate for objects, and does not directly validate the immediate
   * instance itself.
   *
   * Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value,
   * the child instance for that name successfully validates against the corresponding schema.
   *
   * Omitting this keyword has the same behavior as an empty object.
   */
  @DefProp('[propertyName: string]: JsfProp')
  properties?: { [propertyName: string]: JsfProp };

  /**
   * The value of this keyword MUST be an array. Elements of this array, if any, MUST be strings, and MUST be unique.
   *
   * An object instance is valid against this keyword if every item in the array is the name of a property in the
   * instance.
   *
   * Omitting this keyword has the same behavior as an empty array.
   */
  @DefProp({
    type : 'array',
    title: 'Required',
    items: {
      type: 'string'
    }
  })
  required?: string[];

  constructor(data: JsfPropObject) {
    super();
    Object.assign(this, data);
  }
}
