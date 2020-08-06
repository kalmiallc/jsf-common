import { JsfPropBinary }         from '../../schema/props/prop-binary';
import { JsfAbstractPropEditor } from '../abstract/abstract-prop-editor';

export class JsfPropEditorBinary extends JsfAbstractPropEditor<JsfPropBinary> {
  editorType = 'binary';
}
