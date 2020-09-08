import { JsfRegister }                from '../../register/jsf-register';
import { JsfBasicHandlerBuilder }     from '../../builder/abstract/abstract-basic-handler-builder';
import {
  PatchValueOptionsInterface,
  SetValueOptionsInterface
}                                     from '../../builder/interfaces/set-value-options.interface';
import { JsfUnknownPropBuilder }      from '../../builder/abstract/index';
import { jsfHandlerAnyCompatibility } from './any.schema';

export class JsfHandlerBuilderAny extends JsfBasicHandlerBuilder<JsfUnknownPropBuilder> {
  type: 'any';

  value: any;

  constructor(builder: JsfUnknownPropBuilder) {
    super(builder);
    this.builder.valueToJson = x => x;
    this.builder.jsonToValue = x => x;
  }

  lock(lockKey?: Symbol): Symbol {
    return this.builder.lock(lockKey);
  }

  isDiff(lockKey: Symbol): boolean {
    return this.builder.isDiff(lockKey);
  }

  getDiff(lockKey: Symbol): any {
    if (this.isDiff(lockKey)) {
      return this.builder.getDiff(lockKey);
    }
  }

  getJsonDiff(lockKey: Symbol): any {
    if (this.isDiff(lockKey)) {
      return this.builder.getJsonDiff(lockKey);
    }
  }

  setValue(value: any, options: SetValueOptionsInterface = {}) {
    if (this.builder.hasSetter) {
      return this.builder._modifyValueViaSetter(value, 'set', x => this.value = x, options);
    }
    this.value = value;
  }

  patchValue(value: any, options: PatchValueOptionsInterface = {}) {
    if (this.builder.hasSetter) {
      return this.builder._modifyValueViaSetter(
        value,
        'patch',
        x => this.value = { ...this.value, ...x },
        options
      );
    }
    this.value = { ...this.value, ...value };
  }

  async validate(): Promise<boolean> {
    return this.builder._validateViaProp();
  }

  getJsonValue() {
    return this.getValue();
  }

  getValue() {
    if (this.builder.hasGetter) {
      return this.builder._getValueFromGetter();
    }
    return this.value;
  }
}

JsfRegister.handler('any', JsfHandlerBuilderAny, jsfHandlerAnyCompatibility);
