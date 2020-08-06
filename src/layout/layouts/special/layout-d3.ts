import { JsfAbstractSpecialLayout }       from '../../abstract/abstract-layout';
import { DefLayout, DefProp, DefExtends, DefCategory } from '../../../jsf-for-jsf/decorators';
import { DefLayoutInfo } from '../../../jsf-register-decorators';

@DefLayoutInfo({
  type: 'd3'
})
@DefLayout({
  type : 'div',
  items: [
    { key: 'chartType' },
    // { key: 'chartOptions' }, // todo
    { key: 'height' },
    // TODO — as of time of writing this, it was decided (after careful consulting
    // with Tilen) that the last time this was used was literal years ago and that
    // supporting any[][] 2D array is just too much work for something that isn't
    // gonna get used in the forseeable future. So the can was kicked down the road.
    //
    // If you're the one who has to support this and this case scenario still wasn't
    // handled, I'll let you know that I pressed that 'F' in the chat.
    //
    //                                   FFFFF
    //                                   F
    //                                   FFF
    //                                   F
    //                                   F
    //
    // { key: 'dataSets' }
  ]
})
@DefExtends('JsfAbstractSpecialLayout')
@DefCategory('Layout')
export class JsfLayoutD3 extends JsfAbstractSpecialLayout<'d3'> {

  @DefProp({
    type : 'string',
    title: 'Chart type'
  })
  chartType: string;

  @DefProp({
    type : 'object',
    title: 'Chart options',
    handler: {
      type: 'any'
    }
  })
  chartOptions: any;

  @DefProp({
    type : 'object',
    title: 'Chart options',
    handler: {
      type: 'any'
    }
  })
  dataSets: any[][];

  @DefProp({
    type : 'number',
    title: 'Height'
  })
  height?: number;

  constructor(data: JsfLayoutD3) {
    super();
    Object.assign(this, data);
  }
}
