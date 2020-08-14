import { JsfAbstractHandler }            from '../../schema/abstract/abstract-handler';
import { HandlerCompatibilityInterface } from '../../jsf-register';
import { JsfDefinition }                 from '../../jsf-definition';

export class JsfHandlerAny extends JsfAbstractHandler<'any'> {

}

export const jsfHandlerAnyJsfDefinition: JsfDefinition = {
  schema: {
    type: 'object',
    properties: {}
  },
  layout: {
    type: 'div',
    items: []
  }
};

export const jsfHandlerAnyCompatibility: HandlerCompatibilityInterface = {

  formDefinition: jsfHandlerAnyJsfDefinition,
  title: 'Any',
  icon: 'handler-icons/any.svg',
  category: 'Core',

  compatibleWith: [
    {
      type: 'object'
    }
  ]
};
