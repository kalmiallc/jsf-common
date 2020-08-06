import {
  isPropArray,
  isPropBinary,
  isPropBoolean,
  isPropDate,
  isPropFixedArray,
  isPropDynamicArray,
  isPropId,
  isPropInteger,
  isPropNull,
  isPropNumber,
  isPropObject,
  isPropRef,
  isPropString,
  JsfProp, JsfPropNull
}                                from '../../schema/props';
import { JsfUnknownLayout }      from '../../layout';
import {
  JsfPropEditorArray,
  JsfPropEditorBinary,
  JsfPropEditorBoolean,
  JsfPropEditorDate,
  JsfPropEditorFixedArray,
  JsfPropEditorId,
  JsfPropEditorInteger,
  JsfPropEditorNull,
  JsfPropEditorNumber,
  JsfPropEditorObject,
  JsfPropEditorRef,
  JsfPropEditorString,
  JsfUnknownPropEditor
}                                from '../props';
import { JsfEditor }             from '../jsf-editor';
import { JsfAbstractPropEditor } from '../abstract';
import { JsfLayoutEditor }       from '../layout';


export function createJsfPropEditor(prop: JsfProp, options: {
  propertyName: string | number;
  jsfEditor: JsfEditor;
  parent?: JsfUnknownPropEditor;
}) {
  return new (getJsfPropEditorClass(prop))({
    propertyName: options.propertyName,
    jsfEditor : options.jsfEditor,
    definition: prop,
    parent    : options.parent
  });
}

export function createJsfLayoutEditor(layout: JsfUnknownLayout, options: {
  jsfEditor: JsfEditor;
  parent?: JsfLayoutEditor;
}) {
  return new JsfLayoutEditor({
    jsfEditor : options.jsfEditor,
    definition: layout,
    parent    : options.parent
  });
}

export function getJsfPropEditorClass(prop: JsfProp): new (opt: {
  propertyName: string | number;
  jsfEditor: JsfEditor;
  definition: any;
  parent?: JsfUnknownPropEditor;
}) => JsfAbstractPropEditor<any> {
  if (isPropNull(prop)) { return JsfPropEditorNull; }
  if (isPropObject(prop)) { return JsfPropEditorObject; }
  if (isPropDynamicArray(prop)) { return JsfPropEditorArray; }
  if (isPropFixedArray(prop)) { return JsfPropEditorFixedArray; }
  if (isPropString(prop)) { return JsfPropEditorString; }
  if (isPropNumber(prop)) { return JsfPropEditorNumber; }
  if (isPropInteger(prop)) { return JsfPropEditorInteger; }
  if (isPropBoolean(prop)) { return JsfPropEditorBoolean; }
  if (isPropId(prop)) { return JsfPropEditorId; }
  if (isPropRef(prop)) { return JsfPropEditorRef; }
  if (isPropBinary(prop)) { return JsfPropEditorBinary; }
  if (isPropDate(prop)) { return JsfPropEditorDate; }

  throw new Error(`Unknown prop: [${ JSON.stringify(prop) }]`);
}
