import { JsfAbstractPropEditor } from '../abstract/abstract-prop-editor';
import { JsfPropId }             from '../../schema/props/index';

export class JsfPropEditorId extends JsfAbstractPropEditor<JsfPropId> {
  editorType = 'id';
}
