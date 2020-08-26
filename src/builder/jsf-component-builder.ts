import { JsfAbstractBuilder, JsfPageBuilder }                   from './abstract';
import { JsfBuilder }                                           from './jsf-builder';
import { JsfTranslatableMessage, JsfTranslationServer }         from '../translations';
import { JsfComponent }                                         from '../jsf-component';
import { JsfDefinition }                                        from '../jsf-definition';
import { JsfProviderExecutorInterface }                         from '../providers';
import { Observable }                                           from 'rxjs';
import { map }                                                  from 'rxjs/operators';
import { PatchValueOptionsInterface, SetValueOptionsInterface } from './interfaces';

let jsfComponentId = 0;

export function isJsfDefinitionRef(x: any): x is { $ref: string } {
  return typeof x === 'object' && '$ref' in x;
}

export class JsfComponentBuilder extends JsfAbstractBuilder {

  jsfParentComponentBuilder?: JsfComponentBuilder;
  jsfPageBuilder?: JsfPageBuilder;

  /**
   * Set only after resolveJsfDefinition() call.
   */
  jsfDefinition?: JsfDefinition;
  jsfBuilder: JsfBuilder;

  jsfComponentDefinition: JsfComponent;
  componentName: string;

  private _id = jsfComponentId++;
  get id(): number {
    return this._id;
  }

  get path() {
    return this.jsfParentComponentBuilder && this.jsfParentComponentBuilder.path !== ''
           ? (this.jsfParentComponentBuilder.path + '.' + this.componentName)
           : this.componentName;
  }

  constructor(data: {
    jsfParentComponentBuilder?: JsfComponentBuilder,
    jsfComponentDefinition: JsfComponent,
    jsfPageBuilder?: JsfPageBuilder,
    componentName: string
  }) {
    super();
    this.jsfParentComponentBuilder = data.jsfParentComponentBuilder;
    this.jsfComponentDefinition    = data.jsfComponentDefinition;
    this.jsfPageBuilder            = data.jsfPageBuilder;
    this.componentName             = data.componentName;
  }

  /**
   * NOTE: this function must be called from outside, after creation of component.
   * It's not on APP level since, we need same logic for API.
   *
   * @param jsfDefinitionProvider
   */
  resolveJsfDefinition(jsfDefinitionProvider: (key: string) => Observable<JsfDefinition>): Observable<JsfDefinition> | undefined {
    if (isJsfDefinitionRef(this.jsfComponentDefinition.jsfDefinition)) {
      return jsfDefinitionProvider(this.jsfComponentDefinition.jsfDefinition.$ref)
        .pipe(map((x) => this.jsfDefinition = x));
    } else {
      this.jsfDefinition = this.jsfComponentDefinition.jsfDefinition;
    }
  }

  init(jsfBuilder: JsfBuilder, options: {
    noRegister?: boolean
  } = {}) {
    this.jsfBuilder = jsfBuilder;
    if (!options.noRegister && this.jsfPageBuilder) {
      this.jsfPageBuilder.registerComponent(this);
    }
    return this;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  /// Nothing special mapping to the root component JSF builder
  ////////////////////////////////////////////////////////////////////////////////////////////

  validate(): Promise<boolean> {
    if (!this.jsfBuilder) {
      throw new Error('[JSF-CMP] Jsf builder not initialized yet.');
    }
    return this.jsfBuilder.validate();
  }

  setValue(value: any, options: SetValueOptionsInterface = {}) {
    if (!this.jsfBuilder) {
      throw new Error('[JSF-CMP] Jsf builder not initialized yet.');
    }
    return this.jsfBuilder.setValue(value, options);
  }

  patchValue(value: any, options: PatchValueOptionsInterface = {}) {
    if (!this.jsfBuilder) {
      throw new Error('[JSF-CMP] Jsf builder not initialized yet.');
    }
    return this.jsfBuilder.patchValue(value, options);
  }

  getJsonValue(opt?: { virtual?: boolean }): any {
    return this.jsfBuilder ? this.jsfBuilder.getJsonValue(opt) : null;
  }

  getValue(opt?: { virtual?: boolean }): any {
    return this.jsfBuilder ? this.jsfBuilder.getValue(opt) : null;
  }

  lock(lockKey?: Symbol): Symbol {
    if (!this.jsfBuilder) {
      throw new Error('[JSF-CMP] Jsf builder not initialized yet.');
    }
    return this.jsfBuilder.lock(lockKey);
  }

  isDiff(lockKey: Symbol): boolean {
    if (!this.jsfBuilder) {
      throw new Error('[JSF-CMP] Jsf builder not initialized yet.');
    }
    return this.jsfBuilder.isDiff(lockKey);
  }

  getDiff(lockKey: Symbol): any {
    if (!this.jsfBuilder) {
      throw new Error('[JSF-CMP] Jsf builder not initialized yet.');
    }
    return this.jsfBuilder.getDiff(lockKey);
  }

  getDiffKeys(lockKey: Symbol): string[] {
    if (!this.jsfBuilder) {
      throw new Error('[JSF-CMP] Jsf builder not initialized yet.');
    }
    return this.jsfBuilder.getDiffKeys(lockKey);
  }

  getJsonDiff(lockKey: Symbol): any {
    if (!this.jsfBuilder) {
      throw new Error('[JSF-CMP] Jsf builder not initialized yet.');
    }
    return this.jsfBuilder.getJsonDiff(lockKey);
  }

  async getPropTranslatableStrings(): Promise<JsfTranslatableMessage[]> {
    if (!this.jsfBuilder) {
      throw new Error('[JSF-CMP] Jsf builder not initialized yet.');
    }
    return this.jsfBuilder.getPropTranslatableStrings();
  }

  getStaticTranslatableStrings(): JsfTranslatableMessage[] {
    if (!this.jsfBuilder) {
      throw new Error('[JSF-CMP] Jsf builder not initialized yet.');
    }
    return this.jsfBuilder.getStaticTranslatableStrings();
  }

  get translationServer(): JsfTranslationServer {
    if (!this.jsfBuilder) {
      throw new Error('[JSF-CMP] Jsf builder not initialized yet.');
    }
    return this.jsfBuilder.translationServer;
  }
}
