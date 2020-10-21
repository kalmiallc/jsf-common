import { JsfEvalRuntimeError }                                                                               from '../../errors';
import { JsfUnknownLayoutBuilder }                                                                           from '../layout';
import { JsfI18nObject }                                                                                     from '../../translations';
import { JsfBuilder }                                                                                        from '../jsf-builder';
import * as lodash                                                                                           from 'lodash';
import * as moment                                                                                           from 'moment';
import { Moment }                                                                                            from 'moment';
import { JsfUnknownPropBuilder }                                                                             from '../abstract';
import { jsfClipboardClear, jsfClipboardClearAll, jsfClipboardClearMany, jsfClipboardGet, jsfClipboardKeys } from './clipboard';
import { JsfRegister }                                                                                       from '../../register/jsf-register';
import { DataSourceReqFunArg }                                                                               from '../jsf-page-builder';

export interface EvalContextOptions {
  layoutBuilder?: JsfUnknownLayoutBuilder;
  propBuilder?: JsfUnknownPropBuilder;
  extraContextParams?: { [key: string]: any };
}

export const evalService = new class {
  /**
   * Function cache.
   */
  functionCache = {};

  /**
   * Gets the static eval context.
   * This contains helper methods & functions which do not depends on the runtime context of the evaluating function.
   */
  getStaticEvalContext(builder: JsfBuilder, options: { extraContextParams?: { [key: string]: any }; } = {}) {
    const locale = builder.runtimeContext ? builder.runtimeContext.application.language : 'en';

    return {
      $moment: moment,
      _      : lodash,

      $locale: locale,

      $format: {
        currency: (value: number, currency = 'EUR') => {
          return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(value);
        },
        number  : (value: number, minimumFractionDigits = 0, maximumFractionDigits = void 0) => {
          return new Intl.NumberFormat(locale, { minimumFractionDigits, maximumFractionDigits }).format(value);
        },
        date    : (date: string | Date | Moment) => {
          return moment(date).locale(locale).format('L');
        },
        dateTime: (date: string | Date | Moment) => {
          return moment(date).locale(locale).format('L LT');
        }
      },

      ...(options?.extraContextParams || {})
    };
  }

  getAppEvalContext(builder: JsfBuilder, options: EvalContextOptions = {}) {
    const lambda = JsfRegister.getAppEvalContextLambda();
    return lambda ? lambda(builder, options) : {};
  }


  /**
   * Gets the eval context.
   */
  getEvalContext(builder: JsfBuilder, options: EvalContextOptions = {}): any {
    if (options.propBuilder && options.layoutBuilder) {
      throw new Error(`You cannot provide both propBuilder and layoutBuilder for the eval context.`);
    }

    if (!builder.propBuilder) {
      throw new Error(`JsfBuilder.propBuilder === ${ builder.propBuilder } | Cannot generate eval context.`);
    }

    let linkedContext;
    if (builder.linkedBuilder) {
      linkedContext = evalService.getEvalContext(builder.linkedBuilder, options);
    }

    const context = {
      ...this.getStaticEvalContext(builder),
      ...this.getAppEvalContext(builder, options),

      $linked: linkedContext,

      $valueOf: (path) => {
        if (!path) {
          return builder.propBuilder.getJsonValue();
        }
        if (options.layoutBuilder) {
          return options.layoutBuilder.getPropItem(path).getJsonValue();
        }
        if (options.propBuilder) {
          return options.propBuilder.getSibling(path).getJsonValue();
        }
        return builder.propBuilder.getControlByPath(path).getJsonValue();
      },

      $indexOf: (path) => {
        if (!path) {
          throw new Error(`Cannot get index of root prop.`);
        }
        if (options.layoutBuilder) {
          return options.layoutBuilder.getPropItem(path).index;
        }
        if (options.propBuilder) {
          return options.propBuilder.getSibling(path).index;
        }
        return options.propBuilder.getControlByPath(path).index;
      },

      $instanceOf: (path) => {
        if (!path) {
          return builder.propBuilder;
        }
        if (options.layoutBuilder) {
          return options.layoutBuilder.getPropItem(path);
        }
        if (options.propBuilder) {
          return options.propBuilder.getSibling(path);
        }
        return options.propBuilder.getControlByPath(path);
      },

      $val: new Proxy({}, {
        get: (target, name: string) => {
          const control = builder.propBuilder.getControlByPath(name);
          return control.getValue();
        }
      }),

      // $propVal is implemented below via Proxy object, this is here just to allow compilation of eval functions.
      $propVal: void 0,

      $form   : builder,
      $builder: builder.propBuilder,
      $objects: builder.$evalObjects,
      $prop   : options.propBuilder,

      $layoutState: (id, key) => builder.getLayoutState(id, key),
      $i18n       : (source: string | JsfI18nObject) => builder.translationServer.get(source),

      $setValue  : (x: any, y: any) => builder.setJsonValue(x, y),
      $patchValue: (x: any, y: any) => builder.patchJsonValue(x, y),

      $clipboard: {
        get      : jsfClipboardGet,
        keys     : jsfClipboardKeys,
        clearAll : jsfClipboardClearAll,
        clear    : jsfClipboardClear,
        clearMany: jsfClipboardClearMany
      },

      $getItemIndex: (key) => {
        if (!options.layoutBuilder) {
          throw new Error(`'$getItem' cannot be used outside of layout schema.`);
        }
        return options.layoutBuilder.getPropItem(key).index;
      },
      $getItem     : (key) => {
        if (!options.layoutBuilder) {
          throw new Error(`'$getItem' cannot be used outside of layout schema.`);
        }
        return options.layoutBuilder.getPropItem(key);
      },
      $getItemValue: (key) => {
        if (!options.layoutBuilder) {
          throw new Error(`'$getItemValue' cannot be used outside of layout schema.`);
        }
        return options.layoutBuilder.getPropItem(key).getValue();
      },

      $getPropIndex: (key) => {
        if (!options.propBuilder) {
          throw new Error(`'$getProp' cannot be used outside of prop schema.`);
        }
        return options.propBuilder.getSibling(key).index;
      },
      $getProp     : (key) => {
        if (!options.propBuilder) {
          throw new Error(`'$getProp' cannot be used outside of prop schema.`);
        }
        return options.propBuilder.getSibling(key);
      },
      $getPropValue: (key) => {
        if (!options.propBuilder) {
          throw new Error(`'$getPropValue' cannot be used outside of prop schema.`);
        }
        return options.propBuilder.getSibling(key).getValue();
      },

      $dataSource: {
        list  : (dataSourceKey: string, data?: DataSourceReqFunArg) => {
          if (!builder.jsfPageBuilder) {
            throw new Error(`'$dataSource' is only available if using JSfPage.`);
          }
          return builder.jsfPageBuilder.makeDataSourceListRequest(dataSourceKey, data);
        },
        insert: (dataSourceKey: string, data?: DataSourceReqFunArg) => {
          if (!builder.jsfPageBuilder) {
            throw new Error(`'$dataSource' is only available if using JSfPage.`);
          }
          return builder.jsfPageBuilder.makeDataSourceInsertRequest(dataSourceKey, data);
        },
        get   : (dataSourceKey: string, data?: DataSourceReqFunArg) => {
          if (!builder.jsfPageBuilder) {
            throw new Error(`'$dataSource' is only available if using JSfPage.`);
          }
          return builder.jsfPageBuilder.makeDataSourceGetRequest(dataSourceKey, data);
        },
        update: (dataSourceKey: string, data?: DataSourceReqFunArg) => {
          if (!builder.jsfPageBuilder) {
            throw new Error(`'$dataSource' is only available if using JSfPage.`);
          }
          return builder.jsfPageBuilder.makeDataSourceUpdateRequest(dataSourceKey, data);
        },
        remove: (dataSourceKey: string, data?: DataSourceReqFunArg) => {
          if (!builder.jsfPageBuilder) {
            throw new Error(`'$dataSource' is only available if using JSfPage.`);
          }
          return builder.jsfPageBuilder.makeDataSourceRemoveRequest(dataSourceKey, data);
        }
      },

      $clientConfig: builder.clientConfig,

      /**
       * @deprecated use #isMode
       */
      $mode: (key) => builder.modes.indexOf(key) > -1,

      $isMode: (key) => builder.modes.indexOf(key) > -1,

      $user    : builder.authUserProvider && builder.authUserProvider.provide(),
      $customer: builder.authCustomerProvider && builder.authCustomerProvider.provide(),

      $delayedUpdate: (cb) => builder.resolver.runWithDelayedUpdate(cb),

      ...(options.extraContextParams || {})
    };

    // Handle special cases such as accessing `$val` by itself, where we want to return the whole document value instead of the proxy
    // object itself.
    const contextProxy = new Proxy(context, {
      get: (target, name: string) => {
        if (name === '$val') {
          return builder.propBuilder.getJsonValue();
        } else if (name === '$propVal') {
          if (!options.propBuilder) {
            throw new Error(`'$propVal' cannot be used outside of prop schema.`);
          }
          return options.propBuilder.getValue({ skipGetter: options.propBuilder.hasGetter });

        } else {
          return target[name];
        }
      }
    });

    return contextProxy;
  }

  /**
   * Run a piece of code with context
   */
  runEvalWithContext(lambda: string, context: any): any {
    try {
      let fn = this.functionCache[lambda];
      if (!fn) {
        fn                         = new Function(`
          with (this) {
            ${ lambda }
          }
        `);
        this.functionCache[lambda] = fn;
      }

      return fn.bind(context)();
    } catch (e) {
      throw new JsfEvalRuntimeError({
        eval: lambda,
        context,

        exception   : e,
        errorMessage: e.message,
        errorStack  : e.stack
      });
    }
  }
};
