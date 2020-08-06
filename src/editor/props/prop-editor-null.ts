import { JsfPropNull }           from '../../schema/props/prop-null';
import { JsfAbstractPropEditor } from '../abstract/abstract-prop-editor';

export class JsfPropEditorNull extends JsfAbstractPropEditor<JsfPropNull> {
  editorType = 'null';
}
