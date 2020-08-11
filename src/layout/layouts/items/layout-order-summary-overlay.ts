import { JsfAbstractItemsLayout }         from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { JsfLayoutOrderSummary } from './layout-order-summary';
import { BOOTSTRAP_COLUMN_WIDTHS } from '../../../jsf-for-jsf/util/bootstrap-col-config';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'order-summary-overlay',
  title: 'Order summary overlay',
  icon: 'unknown.svg',
  items: {
    enabled: true
  }
})
@DefLayout({
  type : 'div',
  items: [
    {
      type: 'heading',
      title: 'Float mode change breakpoint',
      level: 5
    },
    {
      key: 'floatModeChangeBreakpoint',
      htmlClass: 'mb-3'
    },
    {
      type: 'heading',
      title: 'Float horizontal align',
      level: 5
    },
    {
      key: 'floatHorizontalAlign',
      htmlClass: 'mb-3'
    },
    {
      type: 'heading',
      title: 'Static horizontal align',
      level: 5
    },
    {
      key: 'staticHorizontalAlign',
      htmlClass: 'mb-3'
    },
    {
      type: 'div',
      htmlClass: 'ml-2 mt-3',
      items: [
        {
          type: 'heading',
          title: 'Column size',
          level: 5
        },
        {
          key: 'columnSize.xs'
        },
        {
          key: 'columnSize.sm'
        },
        {
          key: 'columnSize.md'
        },
        {
          key: 'columnSize.lg'
        },
        {
          key: 'columnSize.xl'
        }
      ]
    }
    

  ]
})
@DefExtends('JsfAbstractItemsLayout')
@DefCategory('Layout')
export class JsfLayoutOrderSummaryOverlay extends JsfAbstractItemsLayout<'order-summary-overlay'> {
  @DefProp('JsfLayoutOrderSummary[]')
  items: JsfLayoutOrderSummary[];
  /**
   * The screen size at which the mode changes from static to floating.
   */
  @DefProp({
    type       : 'string',
    title      : 'Float mode change breakpoint',
    description: 'Choose xs, sm, md, lg or xl',
    handler: {
      type: 'common/button-toggle',
      values: [
        { label: 'xs', value: 'xs'},
        { label: 'sm', value: 'sm'},
        { label: 'md', value: 'md'},
        { label: 'lg', value: 'lg'},
        { label: 'xl', value: 'xl'},
      ]
    }
  })
  floatModeChangeBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Horizontal alignment.
   */
  @DefProp({
    type       : 'string',
    title      : 'Float horizontal align',
    description: 'Choose start, center or end',
    handler: {
      type: 'common/button-toggle',
      values: [
        { label: 'start', value: 'start'},
        { label: 'center', value: 'center'},
        { label: 'end', value: 'end'}
      ]
    }
  })
  floatHorizontalAlign?: 'start' | 'center' | 'end';

  @DefProp({
    type: 'boolean',
    title: 'Full height'
  })
  fullHeight?: boolean;

  @DefProp({
    type       : 'string',
    title      : 'Static horizontal align',
    description: 'Choose start, center or end',
    handler: {
      type: 'common/button-toggle',
      values: [
        { label: 'start', value: 'start'},
        { label: 'center', value: 'center'},
        { label: 'end', value: 'end'}
      ]
    }
  })
  staticHorizontalAlign?: 'start' | 'center' | 'end';
  /**
   * Column sizes at different breakpoints.
   */

  @DefProp({
    type      : 'object',
    title     : 'Column size',
    properties: {
      xs: {
        type       : 'string',
        title      : 'xs',
        description: 'Choose column size at xs breakpoint.',
        handler: {
          type: 'common/dropdown',
          values: BOOTSTRAP_COLUMN_WIDTHS
        }
      },
      sm: {
        type       : 'string',
        title      : 'sm',
        description: 'Choose column size at sm breakpoint.',
        handler: {
          type: 'common/dropdown',
          values: BOOTSTRAP_COLUMN_WIDTHS
        }
      },
      md: {
        type       : 'string',
        title      : 'md',
        description: 'Choose column size at md breakpoint.',
        handler: {
          type: 'common/dropdown',
          values: BOOTSTRAP_COLUMN_WIDTHS
        }
      },
      lg: {
        type       : 'string',
        title      : 'lg',
        description: 'Choose column size at lg breakpoint.',
        handler: {
          type: 'common/dropdown',
          values: BOOTSTRAP_COLUMN_WIDTHS
        }
      },
      xl: {
        type       : 'string',
        title      : 'xl',
        description: 'Choose column size at xl breakpoint.',
        handler: {
          type: 'common/dropdown',
          values: BOOTSTRAP_COLUMN_WIDTHS
        }
      }

    }
  })
  columnSize?: {
    xs?: number | 'auto' | 'content';
    sm?: number | 'auto' | 'content';
    md?: number | 'auto' | 'content';
    lg?: number | 'auto' | 'content';
    xl?: number | 'auto' | 'content';
  };

  constructor(data: JsfLayoutOrderSummaryOverlay) {
    super();
    Object.assign(this, data);
  }
}
