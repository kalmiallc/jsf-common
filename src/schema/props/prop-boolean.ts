import { JsfAbstractPropPrimitive } from '../abstract/abstract-prop-primitive';
import { JsfHandlerBoolean }        from '../../handlers';
import { DefExtends, DefCategory, DefLayout }               from '../../jsf-for-jsf';


@DefLayout({
  type : 'div',
  items: [
  ]
})
@DefExtends('JsfAbstractPropPrimitive')
export class JsfPropBoolean extends JsfAbstractPropPrimitive<boolean, 'boolean', JsfHandlerBoolean> {

  constructor(data: JsfPropBoolean) {
    super();
    Object.assign(this, data);
  }

}
