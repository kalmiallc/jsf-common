import { JsfAbstractProp }  from '../abstract/abstract-prop';
import { JsfHandlerBinary } from '../../handlers';

export type ContentType = 'image/jpeg' | 'image/png' | 'application/pdf';

type Buffer = any;

export class JsfPropBinary extends JsfAbstractProp<Buffer, 'binary', JsfHandlerBinary> {

  contentType?: ContentType | ContentType[];

  constructor(data: JsfPropBinary) {
    super();
    Object.assign(this, data);
  }
}
