import { JsfBuilder }                                 from '../jsf-builder';
import { isJsfPropBuilderObject, isPropBuilderArray } from '../props';

export function createDocumentValueProxy(jsf: JsfBuilder): any {
    const handler = {
        get: function (target, path: string) {
            console.log('GET ' + path);

            if (isPropBuilderArray(target)) {
                path = '[' + path + ']';
            }
            const control = target.getControlByPath(path);
            if (isJsfPropBuilderObject(control) || isPropBuilderArray(control)) {
                return new Proxy(control, handler)
            }
            return control.getValue();
        },
        set: (target, path: string, value: any) => {
            console.log('SET ' + path, value);

            if (isPropBuilderArray(target)) {
                path = '[' + path + ']';
            }
            const control = target.getControlByPath(path);
            control.setValueNoResolve(value);
            return true;
        }
    };

    return new Proxy(jsf.propBuilder, handler);
}
