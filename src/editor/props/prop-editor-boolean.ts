import { JsfPropBoolean }        from '../../schema/props/prop-boolean';
import { JsfAbstractPropEditor } from '../abstract';

export class JsfPropEditorBoolean extends JsfAbstractPropEditor<JsfPropBoolean> {
  editorType = 'boolean';
}
