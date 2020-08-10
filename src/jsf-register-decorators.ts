import { JsfRegister }                from './jsf-register';
import { LayoutBuilderInfoInterface } from './editor/layout';
import { jsfRawStore }                from './jsf-for-jsf';

export function DefLayoutInfo(info: LayoutBuilderInfoInterface & { type?: string }): any {
  // tslint:disable-next-line:only-arrow-functions
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    jsfRawStore[target.constructor.name]      = jsfRawStore[target.constructor.name] || {};
    jsfRawStore[target.constructor.name].type = info.type;

    if (!info.type) {
      throw new Error('Not supported!');
    }
    JsfRegister.setLayoutInfo(info);
  };
}
