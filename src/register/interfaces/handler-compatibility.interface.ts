import { JsfDefinition }                  from '../../jsf-definition';
import { JsfProp, JsfPropTypes }          from '../../schema/props';
import { TranslatablePropertyDescriptor } from '../../editor/localization';

export interface HandlerCompatibilityInterface {
  /**
   * Icon for builder UI (toolbox).
   * @example layout-icons/span.svg
   */
  icon?: string;

  /**
   * Category (for example: "Common")
   */
  category?: string;

  /**
   * Nice title for builder UI. If not set type will be used.
   */
  title?: string;

  formDefinition: JsfDefinition;
  layoutDefinition?: JsfDefinition;

  compatibleWith: {
    type: JsfPropTypes,
    formDefinitionTransform?: (formJsfDef: JsfDefinition, prop: JsfProp) => JsfDefinition
  }[];

  /**
   * Localization information.
   */
  localization?: {
    translatableProperties: TranslatablePropertyDescriptor[];
  }
}
