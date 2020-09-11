import { JsfAbstractHandler }            from '../../schema/abstract/abstract-handler';
import { JsfDefinition }                 from '../../jsf-definition';
import { HandlerCompatibilityInterface } from '../../register/interfaces';
import { EditorInterfaceLayoutFactory }  from '../../editor/helpers/editor-factory/editor-interface-layout-factory';

export class JsfHandlerAny extends JsfAbstractHandler<'any'> {

}

export const jsfHandlerAnyJsfFormDefinition: JsfDefinition = {
  schema: {
    type      : 'object',
    properties: {}
  },
  layout: {
    type : 'div',
    items: []
  }
};

export const jsfHandlerAnyJsfLayoutDefinition: any = {
  schema: {
    type      : 'object',
    properties: {}
  },
  layout: {
    type : 'div',
    items: [
      ...EditorInterfaceLayoutFactory.createPanelGroup([
        ...EditorInterfaceLayoutFactory.createPanel('Any', [
          ...EditorInterfaceLayoutFactory.createLabel('No configuration available.')
        ])
      ])
    ]
  }
};

export const jsfHandlerAnyCompatibility: HandlerCompatibilityInterface = {

  formDefinition  : jsfHandlerAnyJsfFormDefinition,
  layoutDefinition: jsfHandlerAnyJsfLayoutDefinition,
  title           : 'Any',
  icon            : 'handler-icons/any.svg',
  category        : 'Core',

  compatibleWith: [
    {
      type: 'object'
    }
  ]
};
