import { JsfRegister }                from '../../register/jsf-register';
import { JsfBasicHandlerBuilder }     from '../../builder/abstract/abstract-basic-handler-builder';
import {
  PatchValueOptionsInterface,
  SetValueOptionsInterface
}                                     from '../../builder/interfaces/set-value-options.interface';
import { JsfUnknownPropBuilder }      from '../../builder/abstract/index';
import { jsfHandlerAnyCompatibility } from './any.schema';
import { isArray, isPlainObject, isNil } from 'lodash';
import * as hash                         from 'object-hash';

export class JsfHandlerBuilderAny extends JsfBasicHandlerBuilder<JsfUnknownPropBuilder> {
  type: 'any';

  value: any;

  lockMap: Map<Symbol, any> = new Map<Symbol, any>();

  constructor(builder: JsfUnknownPropBuilder) {
    super(builder);
    this.builder.valueToJson = x => x;
    this.builder.jsonToValue = x => x;
  }

  lock(lockKey: Symbol = Symbol() as Symbol): Symbol {
    const val = this.getValue();
    this.lockMap.set(lockKey, val ? hash.MD5(val) : val);
    return lockKey;
  }

  isDiff(lockKey: Symbol): boolean {
    if (this.lockMap.has(lockKey)) {
      const val = this.getValue();
      const lockedValue = this.lockMap.get(lockKey);
      if (lockedValue !== (val ? hash.MD5(val) : val)) {
        return true;
      }
    }
  }

  getDiff(lockKey: Symbol): any {
    if (this.isDiff(lockKey)) {
      return this.getValue();
    }
  }

  getJsonDiff(lockKey: Symbol): any {
    if (this.isDiff(lockKey)) {
      return this.getJsonValue();
    }
  }

  getDiffKeys(lockKey: Symbol): string[] {
    return this.isDiff(lockKey) ? [ this.builder.path ] : [];
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
