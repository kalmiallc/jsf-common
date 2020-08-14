import { JsfAbstractHandler }            from '../../schema/abstract/abstract-handler';
import { JsfDefinition }                 from '../../jsf-definition';
import { HandlerCompatibilityInterface } from '../../jsf-register';

export class JsfHandlerComponent extends JsfAbstractHandler<'component'> {

}

export const jsfHandlerComponentJsfDefinition: JsfDefinition = {
  schema: {
    type: 'object',
    properties: {}
  },
  layout: {
    type: 'div',
    items: []
  }
};

export const jsfHandlerComponentCompatibility: HandlerCompatibilityInterface = {

  formDefinition: jsfHandlerComponentJsfDefinition,
  title: 'Component',
  icon: 'handler-icons/component.svg',
  category: 'Core',

  compatibleWith: [
    {
      type: 'object'
    }
  ]
};
