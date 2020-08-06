import { JsfPropString }         from '../../schema/props';
import { JsfAbstractPropEditor } from '../abstract';

export class JsfPropEditorString extends JsfAbstractPropEditor<JsfPropString> {

  editorType = 'string';
}
