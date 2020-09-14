import {
  JsfAbstractProp,
  jsfAbstractPropJsfDefinitionLayoutItems,
  jsfAbstractPropJsfDefinitionSchemaProperties,
  jsfAbstractPropJsfDefinitionValidationLayoutItems,
  jsfAbstractPropTranslatableProperties
}                                       from '../abstract/abstract-prop';
import { JsfHandlerNull }               from '../../handlers';
import { PropInfoInterface }            from '../../register/interfaces';
import { EditorInterfaceLayoutFactory } from '../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../register';

const propInfo: PropInfoInterface = {
  type        : 'null',
  title       : 'Null',
  color       : '#858585',
  localization: {
    translatableProperties: [...jsfAbstractPropTranslatableProperties]
  }
};


/**
 * Value MUST be null.  Note this is mainly for purpose of
 * being able use union types to define nullability.  If this type
 * is not included in a union, null values are not allowed (the
 * primitives listed above do not allow nulls on their own).
 */
export class JsfPropNull extends JsfAbstractProp<null, 'null', JsfHandlerNull> {
  constructor(data: JsfPropNull) {
    super();
    Object.assign(this, data);
  }
}

export const propNullJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropJsfDefinitionSchemaProperties
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Validation', [

          ...jsfAbstractPropJsfDefinitionValidationLayoutItems
        ]),

        ...jsfAbstractPropJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.prop('null', propInfo, propNullJsfDefinition);
