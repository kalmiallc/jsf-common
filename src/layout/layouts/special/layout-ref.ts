import { LayoutInfoInterface }          from '../../../register/interfaces';
import {
  jsfAbstractLayoutTranslatableProperties,
  JsfAbstractSpecialLayout,
  jsfAbstractSpecialLayoutJsfDefinitionLayoutItems,
  jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties
}                                       from '../../../layout';
import { EditorInterfaceLayoutFactory } from '../../../editor/helpers/editor-factory/editor-interface-layout-factory';
import { JsfRegister }                  from '../../../register';

const layoutInfo: LayoutInfoInterface = {
  type        : 'ref',
  title       : 'Ref',
  category    : 'Misc',
  icon        : 'unknown.svg',
  localization: {
    translatableProperties: [...jsfAbstractLayoutTranslatableProperties]
  }
};

export class JsfLayoutRef extends JsfAbstractSpecialLayout<'$ref'> {

  type: never;

  /**
   * Internal import:
   * - #/definitions/abc
   * External import:
   * - /abc
   */
  $ref: string;

  set?: {
    path: string;
    value: any;
  }[];

  constructor(data: JsfLayoutRef) {
    super();
    Object.assign(this, data);
  }
}

export const layoutRefJsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      ...jsfAbstractSpecialLayoutJsfDefinitionSchemaProperties,

      $ref: {
        type : 'string',
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Ref', [
          ...EditorInterfaceLayoutFactory.outputKey('$ref', 'Ref')
        ]),

        ...jsfAbstractSpecialLayoutJsfDefinitionLayoutItems
      ])
    ]
  }
};

JsfRegister.layout('ref', layoutInfo, layoutRefJsfDefinition);
