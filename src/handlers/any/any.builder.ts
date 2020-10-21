import { JsfRegister }                from '../../register/jsf-register';
import { JsfBasicHandlerBuilder }     from '../../builder/abstract/abstract-basic-handler-builder';
import {
  PatchValueOptionsInterface,
  SetValueOptionsInterface
}                                     from '../../builder/interfaces/set-value-options.interface';
import { JsfUnknownPropBuilder }      from '../../builder/abstract/index';
import { jsfHandlerAnyCompatibility } from './any.schema';
import { isArray, isPlainObject, isNil } from 'lodash';

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
        x => this.patchValueInternal(x),
        options
      );
    }
    this.patchValueInternal(value);
  }

  async validate(): Promise<boolean> {
    return this.builder._validateViaProp();
  }


  private patchValueInternal(value: any) {
    if (isNil(this.value)) {
      return this.value = value;
    }
    if (isPlainObject(this.value)) {
      return this.value = { ...this.value, ...value };
    }
    if (isArray(this.value)) {
      return this.value = value;
    }
    this.value = value;
  }

  getJsonValue(opt?: { virtual?: boolean, skipGetter?: boolean }) {
    return this.getValue(opt);
  }

  getValue(opt?: { virtual?: boolean, skipGetter?: boolean }) {
    if (this.builder.hasGetter && !opt?.skipGetter) {
      return this.builder._getValueFromGetter();
    }
    return this.value;
  }
}

JsfRegister.handler('any', JsfHandlerBuilderAny, jsfHandlerAnyCompatibility);
