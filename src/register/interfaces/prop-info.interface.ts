import { TranslatablePropertyDescriptor } from '../../editor/localization';

export interface PropInfoInterface {
  /**
   * Type of prop.
   */
  type: string;

  /**
   * Nice title for builder UI. If not set type will be used.
   */
  title?: string;

  /**
   * Hex color code identifying this prop type.
   */
  color?: string;

  /**
   * Localization information.
   */
  localization?: {
    translatableProperties: TranslatablePropertyDescriptor[];
  }
}
