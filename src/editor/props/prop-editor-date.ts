import { JsfPropDate }           from '../../schema/props/prop-date';
import { JsfAbstractPropEditor } from '../abstract/abstract-prop-editor';

export class JsfPropEditorDate extends JsfAbstractPropEditor<JsfPropDate> {

  editorType = 'date';

}
