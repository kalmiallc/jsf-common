import { JsfAbstractItemsLayout }                                    from '../../abstract/abstract-layout';
import { DefExtends, DefLayout, DefProp, DefCategory, DefTransform } from '../../../jsf-for-jsf/decorators';
import { JsfUnknownLayout }                                          from '../../index';
import { BOOTSTRAP_COLUMN_WIDTHS, BOOTSTRAP_COLUMN_OFFSET }          from '../../../jsf-for-jsf/util/bootstrap-col-config';
import { DefLayoutInfo }                                             from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'col',
  title: 'Column',
  icon: 'layout-icons/col.svg',
  items: {
    enabled: true
  },
  parent: {
    allowedTypes: ['row']
  }
})
@DefTransform((x: any) => {
  x.schema.properties._order = {
    type: 'object',
    properties: {
      orderType: {
        type: 'string',
        handler: {
          type: 'common/button-toggle',
          values: [
            { label: 'first', value: 'first'},
            { label: 'last', value: 'last'},
            { label: 'custom', value: 'custom'},
          ]
        }
      },
      typeCustom: {
        type: 'object',
        properties: {
          xs: {
            type: 'integer',
            title: 'xs',
            minimum: 0,
            maximum: 12
          },
          sm: {
            type: 'integer',
            title: 'sm',
            minimum: 0,
            maximum: 12
          },
          md: {
            type: 'integer',
            title: 'md',
            minimum: 0,
            maximum: 12
          },
          lg: {
            type: 'integer',
            title: 'lg',
            minimum: 0,
            maximum: 12
          },
          xl: {
            type: 'integer',
            title: 'xl',
            minimum: 0,
            maximum: 12
          }
        }
      }
    },
    onValueChange: {
      updateDependencyValue: [
        {
          mode: 'set',
          key: 'order',
          value: {
            $eval: `
            if ($val._order.orderType == 'first'){
              return 'first';
            }

            if ($val._order.orderType == 'last'){
              return 'last';
            }

            if ($val._order.orderType == 'custom'){
              return $val._order.typeCustom;
            }
            

            `
          }
        }
      ]
    }
  };  

  return x;
})
@DefLayout({
  type : 'div',
  items: [
    {
      type: 'heading',
      title: 'Column width',
      level: 5
    },
    {
      key: 'xs'
    },
    {
      key: 'sm'
    },
    {
      key: 'md'
    },
    {
      key: 'lg'
    },
    {
      key: 'xl'
    },
    {
      type: 'div',
      htmlClass: '',
      items: [
        {
          type: 'heading',
          title: 'Offset',
          htmlClass: 'mt-3',
          level: 5
        },
        {
          key: 'offset.xs'
        },
        {
          key: 'offset.sm'
        },
        {
          key: 'offset.md'
        },
        {
          key: 'offset.lg'
        },
        {
          key: 'offset.xl'
        }
      ]
    },
    {
      type: 'div',
      htmlClass: '',
      items: [
        {
          type: 'heading',
          title: 'Order',
          htmlClass: 'mt-3',
          level: 5
        },
        {
          key: '_order.orderType'
        },
        {
          type: 'div',
          items: [
            {
              key: '_order.typeCustom.xs'
            },
            {
              key: '_order.typeCustom.sm'
            },
            {
              key: '_order.typeCustom.md'
            },
            {
              key: '_order.typeCustom.lg'
            },
            {
              key: '_order.typeCustom.xl'
            }
          ],
          visibleIf: {
            $eval: `return ($val._order.orderType == 'custom');`,
            dependencies: ['_order.orderType']
          }
        }
      ]
    },
    {
      type: 'heading',
      title: 'Vertical align',
      htmlClass: 'mt-3',
      level: 5
    },
    {
      key: 'verticalAlign'
    }
  ]
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutCol extends JsfAbstractItemsLayout<'col'> {
  @DefProp('JsfUnknownLayout[]')
  items: JsfUnknownLayout[];
  /**
   * Column widths.
   */
  @DefProp(
    {
      type : 'string',
      title: 'xs',
      description: 'Width on extra small devices',
      handler: {
        type: 'common/dropdown',
        values: BOOTSTRAP_COLUMN_WIDTHS
      }
    }
  )
  xs?: number | 'auto' | 'content' | 'none';

  @DefProp(
    {
      type : 'string',
      title: 'sm',
      description: 'Width on small devices',
      handler: {
        type: 'common/dropdown',
        values: BOOTSTRAP_COLUMN_WIDTHS
      }
    }
  )
  sm?: number | 'auto' | 'content' | 'none';

  @DefProp(
    {
      type : 'string',
      title: 'md',
      description: 'Width on medium devices',
      handler: {
        type: 'common/dropdown',
        values: BOOTSTRAP_COLUMN_WIDTHS
      }
    }
  )
  md?: number | 'auto' | 'content' | 'none';

  @DefProp(
    {
      type : 'string',
      title: 'lg',
      description: 'Width on large devices',
      handler: {
        type: 'common/dropdown',
        values: BOOTSTRAP_COLUMN_WIDTHS
      }
    }
  )
  lg?: number | 'auto' | 'content' | 'none';

  @DefProp(
    {
      type : 'string',
      title: 'xl',
      description: 'Width on extra large devices',
      handler: {
        type: 'common/dropdown',
        values: BOOTSTRAP_COLUMN_WIDTHS
      }
    }
  )
  xl?: number | 'auto' | 'content' | 'none';

  /**
   * Column offsets.
   */

  @DefProp({
    type      : 'object',
    title     : 'Offset',
    properties: {
      xs: {
        type : 'integer',
        title: 'xs',
        description: 'Offset columns to the right, on extra small devices.',
        handler: {
          type: 'common/dropdown',
          values: BOOTSTRAP_COLUMN_OFFSET
        }
      },
      sm: {
        type : 'integer',
        title: 'sm',
        description: 'Offset columns to the right, on small devices.',
        handler: {
          type: 'common/dropdown',
          values: BOOTSTRAP_COLUMN_OFFSET
        }
      },
      md: {
        type : 'integer',
        title: 'md',
        description: 'Offset columns to the right, on medium devices.',
        handler: {
          type: 'common/dropdown',
          values: BOOTSTRAP_COLUMN_OFFSET
        }
      },
      lg: {
        type : 'integer',
        title: 'lg',
        description: 'Offset columns to the right, on large devices.',
        handler: {
          type: 'common/dropdown',
          values: BOOTSTRAP_COLUMN_OFFSET
        }
      },
      xl: {
        type : 'integer',
        title: 'xl',
        description: 'Offset columns to the right, on extra large devices.',
        handler: {
          type: 'common/dropdown',
          values: BOOTSTRAP_COLUMN_OFFSET
        }
      }
    }
  })
  offset: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };

  /**
   * Visual order in row.
   */
  @DefProp({
    type      : 'object',
    handler   : { type: 'any' },
    properties: {},
  })
  order?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  } | 'first' | 'last';

  /**
   * Vertical alignment for self.
   */
  @DefProp({
    type       : 'string',
    title      : 'Vertical align',
    description: 'Align on start, center or end',
    handler: {
      type: 'common/dropdown',
      values: [
        { label: 'Start', value: 'start'},
        { label: 'Center', value: 'center'},
        { label: 'End', value: 'end'}
      ]
    }
  })
  verticalAlign: 'start' | 'center' | 'end';


  constructor(data: JsfLayoutCol) {
    super();
    Object.assign(this, data);
  }
}
