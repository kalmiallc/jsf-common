import {
  JsfAbstractProp,
  jsfAbstractPropJsfDefinitionLayoutItems,
  jsfAbstractPropJsfDefinitionSchemaProperties,
  jsfAbstractPropJsfDefinitionValidationLayoutItems,
  jsfAbstractPropTranslatableProperties
}                                       from '../abstract/abstract-prop';
import { JsfHandlerBinary }             from '../../handlers';
import { PropInfoInterface }            from '../../register/interfaces';
import { EditorInterfaceLayoutFactory } from '../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../register';

export type ContentType = 'image/jpeg' | 'image/png' | 'application/pdf';

type Buffer = any;

const propInfo: PropInfoInterface = {
  type        : 'binary',
  title       : 'Binary',
  color       : '#efefef',
  localization: {
    translatableProperties: [...jsfAbstractPropTranslatableProperties]
  }
};


export class JsfPropBinary extends JsfAbstractProp<Buffer, 'binary', JsfHandlerBinary> {

  contentType?: ContentType | ContentType[];

  constructor(data: JsfPropBinary) {
    super();
    Object.assign(this, data);
  }
}

export const propBinaryJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractPropJsfDefinitionSchemaProperties,

      contentType: {
        type   : 'array',
        handler: {
          type  : 'common/dropdown',
          values: ['image/jpeg', 'image/png', 'application/pdf']
        },
        items  : {
          type: 'string'
        }
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Validation', [
          ...EditorInterfaceLayoutFactory.outputKey('contentType', 'Content type'),

          ...jsfAbstractPropJsfDefinitionValidationLayoutItems
        ]),

        ...jsfAbstractPropJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.prop('binary', propInfo, propBinaryJsfDefinition);
