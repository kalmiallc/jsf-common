import { JsfPropRef }            from '../../schema/props';
import { JsfAbstractPropEditor } from '../abstract/abstract-prop-editor';

export class JsfPropEditorRef extends JsfAbstractPropEditor<JsfPropRef> {
  editorType = 'ref';
}
