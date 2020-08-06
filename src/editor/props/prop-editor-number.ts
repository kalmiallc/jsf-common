import { JsfPropInteger, JsfPropNumber } from '../../schema/props';
import { JsfAbstractPropEditor }         from '../abstract';

export class JsfPropEditorInteger extends JsfAbstractPropEditor<JsfPropInteger> {
  editorType = 'integer';
}

export class JsfPropEditorNumber extends JsfAbstractPropEditor<JsfPropNumber> {

  editorType = 'number';
}
