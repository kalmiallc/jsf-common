import { JsfPropEditorRef }                            from './prop-editor-ref';
import { JsfPropEditorObject }                         from './prop-editor-object';
import { JsfPropEditorInteger, JsfPropEditorNumber }   from './prop-editor-number';
import { JsfPropEditorArray, JsfPropEditorFixedArray } from './prop-editor-array';
import { JsfPropEditorDate }                           from './prop-editor-date';
import { JsfPropEditorBoolean }                        from './prop-editor-boolean';
import { JsfPropEditorString }                         from './prop-editor-string';
import { JsfPropEditorBinary }                         from './prop-editor-binary';
import { JsfPropEditorNull }                           from './prop-editor-null';
import { JsfPropEditorId }                             from './prop-editor-id';

export * from './prop-editor-ref';
export * from './prop-editor-object';
export * from './prop-editor-number';
export * from './prop-editor-null';
export * from './prop-editor-id';
export * from './prop-editor-date';
export * from './prop-editor-boolean';
export * from './prop-editor-binary';
export * from './prop-editor-array';
export * from './prop-editor-string';

export type JsfUnknownPropEditor =
  JsfPropEditorArray
  | JsfPropEditorFixedArray
  | JsfPropEditorString
  | JsfPropEditorBinary
  | JsfPropEditorBoolean
  | JsfPropEditorDate
  | JsfPropEditorId
  | JsfPropEditorNull
  | JsfPropEditorNumber
  | JsfPropEditorInteger
  | JsfPropEditorObject
  | JsfPropEditorRef;

export function isPropEditorArray(propEditor: JsfUnknownPropEditor): propEditor is JsfPropEditorArray {
  return propEditor instanceof JsfPropEditorArray;
}

export function isPropEditorFixedArray(propEditor: JsfUnknownPropEditor): propEditor is JsfPropEditorArray {
  return propEditor instanceof JsfPropEditorFixedArray;
}

export function isPropEditorString(propEditor: JsfUnknownPropEditor): propEditor is JsfPropEditorString {
  return propEditor instanceof JsfPropEditorString;
}

export function isJsfPropEditorBinary(propEditor: JsfUnknownPropEditor): propEditor is JsfPropEditorBinary {
  return propEditor instanceof JsfPropEditorBinary;
}

export function isJsfPropEditorBoolean(propEditor: JsfUnknownPropEditor): propEditor is JsfPropEditorBoolean {
  return propEditor instanceof JsfPropEditorBoolean;
}

export function isJsfPropEditorDate(propEditor: JsfUnknownPropEditor): propEditor is JsfPropEditorDate {
  return propEditor instanceof JsfPropEditorDate;
}

export function isJsfPropEditorId(propEditor: JsfUnknownPropEditor): propEditor is JsfPropEditorId {
  return propEditor instanceof JsfPropEditorId;
}

export function isJsfPropEditorNull(propEditor: JsfUnknownPropEditor): propEditor is JsfPropEditorNull {
  return propEditor instanceof JsfPropEditorNull;
}

export function isJsfPropEditorNumber(propEditor: JsfUnknownPropEditor): propEditor is JsfPropEditorNumber {
  return propEditor instanceof JsfPropEditorNumber;
}

export function isJsfPropEditorInteger(propEditor: JsfUnknownPropEditor): propEditor is JsfPropEditorInteger {
  return propEditor instanceof JsfPropEditorInteger;
}

export function isJsfPropEditorObject(propEditor: JsfUnknownPropEditor): propEditor is JsfPropEditorObject {
  return propEditor instanceof JsfPropEditorObject;
}

export function isJsfPropEditorRef(propEditor: JsfUnknownPropEditor): propEditor is JsfPropEditorRef {
  return propEditor instanceof JsfPropEditorRef;
}
