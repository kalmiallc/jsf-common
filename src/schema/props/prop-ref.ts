import {
  JsfAbstractBareProp,
  jsfAbstractBarePropJsfDefinitionLayoutItems,
  jsfAbstractBarePropJsfDefinitionSchemaProperties,
  jsfAbstractBarePropJsfDefinitionValidationLayoutItems,
  jsfAbstractPropTranslatableProperties
}                                         from '../abstract/abstract-prop';
import { JsfHandlerRef }                  from '../../handlers';
import { EditorInterfaceLayoutFactory }   from '../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister, PropInfoInterface } from '../../register';

const propInfo: PropInfoInterface = {
  type        : 'ref',
  title       : 'Reference',
  color       : '#d6d6d6',
  localization: {
    translatableProperties: [...jsfAbstractPropTranslatableProperties]
  }
};

export class JsfPropRef extends JsfAbstractBareProp<'ref', JsfHandlerRef> {

  /**
   * JSF schema definition to use.
   *
   * Internal import:
   * - #/definitions/abc
   * External import:
   * - /abc
   */
  $ref: string;

  /**
   * Not used!
   */
  refPatch?: {
    path: string;
    value: any;
  }[];

  constructor(data: JsfPropRef) {
    super();
    Object.assign(this, data);
  }
}

export const propRefJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractBarePropJsfDefinitionSchemaProperties,

      $ref: {
        type: 'string'
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Validation', [
          ...jsfAbstractBarePropJsfDefinitionValidationLayoutItems
        ]),

        ...jsfAbstractBarePropJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.prop('ref', propInfo, propRefJsfDefinition);
