import { JsfRegister }                from './jsf-register';
import { LayoutBuilderInfoInterface } from './editor/layout';

export function DefLayoutInfo(info: LayoutBuilderInfoInterface & { type?: string }): any {
  // tslint:disable-next-line:only-arrow-functions
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    if (!info.type) {
      throw new Error('Not supported!');
    }
    JsfRegister.setLayoutInfo(info);
  };
}
