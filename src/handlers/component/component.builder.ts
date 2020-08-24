import { JsfRegister }                                          from '../../jsf-register';
import { JsfBasicHandlerBuilder }                               from '../../builder/abstract/abstract-basic-handler-builder';
import { JsfPropBuilderObject }                                 from '../../builder/props';
import { PatchValueOptionsInterface, SetValueOptionsInterface } from '../../builder/interfaces/set-value-options.interface';
import { JsfBuilder, JsfComponentBuilder }                      from '../../builder';
import { JsfComponent }                                         from '../../jsf-component';
import { jsfHandlerComponentCompatibility }                     from './component.schema';


export interface JsfHandlerBuilderComponentOptionsInterface {
  componentDefinition: JsfComponent;
}

export class JsfHandlerBuilderComponent extends JsfBasicHandlerBuilder<JsfPropBuilderObject> {
  type: 'component';

  tmpValueHolder: any;

  public jsfComponentBuilder: JsfComponentBuilder;

  get handlerOptions(): JsfHandlerBuilderComponentOptionsInterface {
    return this.builder.prop.handler as any;
  }

  get jsfPageBuilderExists() {
    return !!this.builder.rootBuilder.jsfPageBuilder;
  }

  get jsfPageBuilder() {
    return this.builder.rootBuilder.jsfPageBuilder;
  }

  constructor(builder: JsfPropBuilderObject) {
    super(builder);
    this.constructJsfComponent();

    this.builder.valueToJson = x => this.jsfComponentBuilder.jsfBuilder
      ? this.jsfComponentBuilder.jsfBuilder.propBuilder.valueToJson
      : x;
    this.builder.jsonToValue = x => this.jsfComponentBuilder.jsfBuilder
      ? this.jsfComponentBuilder.jsfBuilder.propBuilder.jsonToValue
      : x;
  }

  private constructJsfComponent() {
    this.jsfComponentBuilder = new JsfComponentBuilder({
      jsfParentComponentBuilder: this.builder.rootBuilder.jsfComponentBuilder,
      jsfComponentDefinition   : this.handlerOptions.componentDefinition,
      jsfPageBuilder           : this.jsfPageBuilder,
      componentName            : this.builder.path
    });
  }

  public initJsfComponent(builder: JsfBuilder) {
    this.jsfComponentBuilder.init(builder);
    if (this.tmpValueHolder) {
      this.jsfComponentBuilder.setValue(this.tmpValueHolder).catch(console.error);
    }
  }

  onLayoutDestroy() {
    if (this.jsfPageBuilderExists) {
      this.jsfPageBuilder.deRegisterComponent(this.jsfComponentBuilder.path);
    }
    this.jsfComponentBuilder = void 0;
  }

  setValue(value: any, options: SetValueOptionsInterface = {}) {
    if (!this.jsfComponentBuilder || !this.jsfComponentBuilder.jsfBuilder) {
      this.tmpValueHolder = value;
      return;
    }
    return this.jsfComponentBuilder && this.jsfComponentBuilder.setValue(value, options);
  }

  patchValue(value: any, options: PatchValueOptionsInterface = {}) {
    return this.jsfComponentBuilder && this.jsfComponentBuilder.patchValue(value, options);
  }

  async validate(): Promise<boolean> {
    return this.jsfComponentBuilder && this.jsfComponentBuilder.jsfBuilder && await this.jsfComponentBuilder.jsfBuilder.propBuilder.validate();
  }

  getJsonValue() {
    if (!this.jsfComponentBuilder || !this.jsfComponentBuilder.jsfBuilder) {
      return this.tmpValueHolder;
    }
    return this.jsfComponentBuilder && this.jsfComponentBuilder.getJsonValue();
  }

  getValue() {
    if (!this.jsfComponentBuilder || !this.jsfComponentBuilder.jsfBuilder) {
      return this.tmpValueHolder;
    }
    return this.jsfComponentBuilder && this.jsfComponentBuilder.getValue();
  }
}

JsfRegister.handler('component', JsfHandlerBuilderComponent, jsfHandlerComponentCompatibility);
