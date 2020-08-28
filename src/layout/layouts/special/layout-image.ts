import { LayoutInfoInterface }      from '../../../register/interfaces';
import { JsfAbstractSpecialLayout } from '../../../layout';

const layoutInfo: LayoutInfoInterface = {
  type    : 'image',
  title   : 'Image',
  category: 'Layout',
  icon    : 'layout-icons/image.svg'
};

export class JsfLayoutImage extends JsfAbstractSpecialLayout<'image'> {

  src: string | {
    $eval: string,
    dependencies?: string[]
  };

  width?: string;

  height?: string;

  /**
   * If set to true the image tag will be replaced with a div with background image set.
   * In this case the width and height are required, otherwise you will not see anything displayed.
   */
  displayAsBackgroundImage?: boolean;

  constructor(data: JsfLayoutImage) {
    super();
    Object.assign(this, data);
  }
}

