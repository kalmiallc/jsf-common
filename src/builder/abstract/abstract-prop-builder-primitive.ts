import {
  GetControlOptions,
  JsfAbstractPropBuilder,
  JsfUnknownPropBuilder,
  SafeModeTypes
}                                   from './abstract-prop-builder';
import { JsfUnknownProp }           from '../../schema/abstract/abstract-prop';
import { JsfUnknownHandlerBuilder } from './abstract-handler-builder';
import {
  PatchValueOptionsInterface,
  SetValueOptionsInterface
}                                   from '../interfaces/set-value-options.interface';
import { JsfPropBuilder }           from '../props';

export abstract class JsfAbstractPropBuilderPrimitive<PropType extends JsfUnknownProp,
  PropHandler extends JsfUnknownHandlerBuilder,
  PropValue>
  extends JsfAbstractPropBuilder<PropType, PropHandler, PropValue, PropValue> {

  public value: PropValue;

  lockMap: Map<Symbol, any> = new Map<Symbol, any>();

  protected abstract isValidPrimitiveValue(value): boolean;

  onInit(data: {
    prop: PropType,
    docDefPath: string,
    parentProp?: JsfPropBuilder,
    rootProp?: JsfPropBuilder,
    propName: string,
    safeMode?: SafeModeTypes
  }) {
    this.prop       = data.prop;
    if (this.isNullable) {
      this.value = null;
    }

    return super.onInit(data);
  }

  lock(lockKey: Symbol = Symbol() as Symbol): Symbol {
    this.lockMap.set(lockKey, this.getValue());
    return lockKey;
  }

  isDiff(lockKey: Symbol): boolean {
    if (this.lockMap.has(lockKey)) {
      const lockedValue = this.lockMap.get(lockKey);
      if (lockedValue !== this.getValue()) {
        return true;
      }
    }
  }

  getDiff(lockKey: Symbol): any {
    if (this.isDiff(lockKey)) {
      return this.getValue();
    }
  }

  getDiffKeys(lockKey: Symbol): string[] {
    return this.isDiff(lockKey) ? [ this.path ] : [];
  }

  getJsonDiff(lockKey: Symbol): any {
    if (this.isDiff(lockKey)) {
      return this.getJsonValue();
    }
  }

  onChildPropsInit() {

  }

  getControl(path: string[], options: GetControlOptions = {}): JsfUnknownPropBuilder {
    if (path.length === 0) {
      return this;
    }
    throw new Error(`Can not call getControl(${ path.join('.') }) on JsfAbstractPropBuilderPrimitive`);
  }

  _getValueViaProp(opt?: { virtual?: boolean }) {
    if (this.disabled) {
      return null;
    }
    return this.value;
  }

  valueToJson(value) {
    return value;
  }

  jsonToValue(jsonValue) {
    return jsonValue;
  }

  _setValueViaProp(value, options: SetValueOptionsInterface) {
    if (!this.isValidPrimitiveValue(value)) {
      throw new Error(`[${ this.propName }: ${ JSON.stringify(this.prop) }] Invalid primitive value: ${ value }`);
    }
    this.value = value;
  }

  _patchValueViaProp(value, options: PatchValueOptionsInterface) {
    if (!this.isValidPrimitiveValue(value)) {
      throw new Error(`Invalid primitive value: ${ value }`);
    }
    this.value = value;
  }
}
