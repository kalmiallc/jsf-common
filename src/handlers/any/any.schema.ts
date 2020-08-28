import { JsfAbstractHandler }            from '../../schema/abstract/abstract-handler';
import { JsfDefinition }                 from '../../jsf-definition';
import { HandlerCompatibilityInterface } from '../../register/interfaces';

export class JsfHandlerAny extends JsfAbstractHandler<'any'> {

}

export const jsfHandlerAnyJsfDefinition: JsfDefinition = {
  schema: {
    type      : 'object',
    properties: {}
  },
  layout: {
    type : 'div',
    items: []
  }
};

export const jsfHandlerAnyCompatibility: HandlerCompatibilityInterface = {

  formDefinition: jsfHandlerAnyJsfDefinition,
  title         : 'Any',
  icon          : 'handler-icons/any.svg',
  category      : 'Core',

  compatibleWith: [
    {
      type: 'object'
    }
  ]
};
