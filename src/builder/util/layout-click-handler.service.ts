import { JsfBuilder }                                                                                           from '../jsf-builder';
import { JsfLayoutOnClickInterface }                                                                            from '../../layout/interfaces/layout-on-click.interface';
import { JsfAbstractLayoutBuilder, JsfUnknownPropBuilder }                                                      from '../abstract';
import { JsfAbstractLayout }                                                                                    from '../../layout';
import { JsfRouterNavigationOptionsInterface }                                                                  from '../../abstract';
import { isBoolean, isObject, isPlainObject, isString }                                                         from 'lodash';
import { JsfValueOptionsType }                                                                                  from '../../layout/interfaces/value-options.type';
import { jsfClipboardBaseKey, jsfClipboardClear, jsfClipboardClearAll, jsfClipboardClearMany, jsfClipboardGet } from './clipboard';
import { JsfArrayPropLayoutBuilder }                                                                            from '../layout';
import { isObservable, Observable }                                                                             from 'rxjs';
import { JsfRegister }                                                                                          from '../../register';

export class JsfAbortEventChain extends Error {

  constructor(message?: string) {
    super(message);
    this.name = JsfAbortEventChain.name;

    // The following line is needed for working `instanceof`.
    Object.setPrototypeOf(this, JsfAbortEventChain.prototype);
  }
}

export interface JsfHandleClickOptions {
  rootBuilder: JsfBuilder;
  layoutBuilder: JsfAbstractLayoutBuilder<JsfAbstractLayout>;
  extraContextParams?: { [key: string]: any };
}

export const layoutClickHandlerService = new class {

  getValueLegacy(valueOptions: JsfValueOptionsType | any, ctxOptions: {
    rootBuilder: JsfBuilder,
    layoutBuilder: JsfAbstractLayoutBuilder<JsfAbstractLayout>,
    extraContextParams?: { [key: string]: any }
  }): any {
    if (isPlainObject(valueOptions)) {
      const keys = Object.keys(valueOptions).filter(x => x !== '$evalTranspiled');
      if (keys.length === 1 && ['$eval', 'key', 'paste', 'const'].indexOf(keys[0]) !== -1) {
        return this.getValue(valueOptions, ctxOptions);
      }
    }
    return valueOptions;
  }

  /**
   * Based on JsfValueOptionsInterface returns correct value to be used in action or condition.
   *
   * @param valueOptions
   * @param ctxOptions
   */
  getValue(valueOptions: JsfValueOptionsType, ctxOptions: {
    rootBuilder: JsfBuilder,
    skipGetter?: boolean,
    layoutBuilder?: JsfAbstractLayoutBuilder<JsfAbstractLayout>,
    propBuilder?: JsfUnknownPropBuilder,
    extraContextParams?: { [key: string]: any }
  }): any {

    if (valueOptions === undefined || isString(valueOptions) || isBoolean(valueOptions) || valueOptions === null) {
      return valueOptions;
    }

    // Const
    if (valueOptions.const !== void 0) {
      return valueOptions.const;
    }

    // Key
    if (valueOptions.key) {
      const prop = ctxOptions.layoutBuilder
        ? ctxOptions.layoutBuilder.getPropItem(valueOptions.key)
        : ctxOptions.rootBuilder.propBuilder.getControlByPath(valueOptions.key);

      if (!prop) {
        throw new Error(`Can not find prop for ${ valueOptions.key }.`);
      }

      return prop.getValue({ skipGetter: ctxOptions.skipGetter });
    }

    // Eval
    if (valueOptions.$eval) {
      const ctx = ctxOptions.rootBuilder.getEvalContext({
        layoutBuilder     : ctxOptions.layoutBuilder as any, // TODO (prio: low) remove as any
        propBuilder       : ctxOptions.propBuilder,
        extraContextParams: ctxOptions.extraContextParams
      });
      return ctxOptions.rootBuilder.runEvalWithContext(
        valueOptions.$evalTranspiled || valueOptions.$eval, ctx
      );
    }

    // Paste
    if (valueOptions.paste) {
      return jsfClipboardGet(valueOptions.paste);
    }

    throw new Error(`Invalid value options: [${ JSON.stringify(valueOptions) }]`);
  }

  async runEval(objWithEvalProperty, options: {
    rootBuilder: JsfBuilder,
    layoutBuilder: JsfAbstractLayoutBuilder<JsfAbstractLayout>,
    extraContextParams?: { [key: string]: any }
  }) {
    if (!objWithEvalProperty) {
      return;
    }
    const evalString = objWithEvalProperty.$evalTranspiled || objWithEvalProperty.$eval;
    if (!evalString) {
      return;
    }
    const ctx = options.rootBuilder.getEvalContext({
      layoutBuilder     : options.layoutBuilder as any,
      extraContextParams: options.extraContextParams
    });

    await options.rootBuilder.resolver.asyncRunWithDelayedUpdate(() => {
      const result = options.rootBuilder.runEvalWithContext(evalString, ctx);
      if (isObservable(result)) {
        return result.toPromise();
      } else {
        return result;
      }
    });
  }

  async handleOnClick(onClickData: JsfLayoutOnClickInterface | JsfLayoutOnClickInterface[],
                      options: JsfHandleClickOptions & { customActionHandler?: (onClickData: any, options: JsfHandleClickOptions) => Promise<boolean> | boolean },
                      $event?: any) {

    try {
      /**
       * Chain of events.
       */
      if (Array.isArray(onClickData)) {
        // Run all events in the chain and stop if an error occurs.
        for (const x of onClickData) {
          try {
            await this.handleOnClick(x, options, $event);
          } catch (e) {
            // Break the loop.
            if (e instanceof JsfAbortEventChain) {
              // Swallow any abort chain error.
              return;
            } else {
              throw e;
            }
          }
        }
        return;
      }

      await options.rootBuilder.resolver.waitForIdle();

      /**
       * Condition.
       */
      if (onClickData.condition) {
        let condition = onClickData.condition;
        if (typeof condition === 'object' && '$eval' in condition) {
          const ctx = options.rootBuilder.getEvalContext({
            layoutBuilder     : options.layoutBuilder as any,
            extraContextParams: options.extraContextParams
          });
          condition = options.rootBuilder.runEvalWithContext((condition as any).$evalTranspiled || condition.$eval, ctx);
        }

        if (!condition) {
          return;
        }
      }

      /**
       * Abort.
       */
      if (onClickData.abort) {
        let abort = onClickData.abort;
        if (typeof abort === 'object' && '$eval' in abort) {
          const ctx = options.rootBuilder.getEvalContext({
            layoutBuilder     : options.layoutBuilder as any,
            extraContextParams: options.extraContextParams
          });
          abort     = options.rootBuilder.runEvalWithContext((abort as any).$evalTranspiled || abort.$eval, ctx);
        }

        if (!!abort) {
          throw new JsfAbortEventChain(`Chain interrupted by 'onClickData.abort'.`);
        }
        return;
      }


      /**
       * Eval.
       */
      if (onClickData.$eval) {
        const ctx = options.rootBuilder.getEvalContext({
          layoutBuilder     : options.layoutBuilder as any, // TODO type
          extraContextParams: options.extraContextParams
        });


        await options.rootBuilder.resolver.asyncRunWithDelayedUpdate(() => {
          const result = options.rootBuilder.runEvalWithContext((onClickData as any).$evalTranspiled || onClickData.$eval, ctx);
          if (isObservable(result)) {
            return result.toPromise();
          } else {
            return result;
          }
        });

        return;
      }

      /**
       * Emit event.
       */
      if (onClickData.emit) {
        const value = this.getValue(onClickData.emit.value, options);

        const builder = onClickData.emit.onLinked ? options.rootBuilder.linkedBuilder : options.rootBuilder;
        return builder.runOnFormEventHook({
          value,
          $event,
          event : onClickData.emit.event,
          layout: options.layoutBuilder && options.layoutBuilder.type
        });
      }

      /**
       * Set value.
       */
      if (onClickData.setValue) {
        const builder = onClickData.setValue.onLinked ? options.rootBuilder.linkedBuilder : options.rootBuilder;

        let control;
        if (onClickData.setValue.path) {
          const path = this.getValueLegacy(onClickData.setValue.path, options);

          control = options.layoutBuilder && !onClickData.setValue.onLinked
            ? options.layoutBuilder.getPropItem(path)
            : builder.propBuilder.getControlByPath(path);
        } else {
          control = builder.propBuilder;
        }

        const value = this.getValueLegacy(onClickData.setValue.value, options);

        await control.setJsonValue(value, {
          noResolve    : onClickData.setValue.noResolve || false,
          noValueChange: onClickData.setValue.noValueChange || false
        });

        return;
      }

      /**
       * Patch value.
       */
      if (onClickData.patchValue) {
        const builder = onClickData.patchValue.onLinked ? options.rootBuilder.linkedBuilder : options.rootBuilder;

        let control;
        if (onClickData.patchValue.path) {
          const path = this.getValueLegacy(onClickData.patchValue.path, options);

          control = options.layoutBuilder && !onClickData.patchValue.onLinked
            ? options.layoutBuilder.getPropItem(path)
            : builder.propBuilder.getControlByPath(path);
        } else {
          control = builder.propBuilder;
        }

        const value = this.getValueLegacy(onClickData.patchValue.value, options);

        await control.patchJsonValue(value, {
          noResolve    : onClickData.patchValue.noResolve || false,
          noValueChange: onClickData.patchValue.noValueChange || false
        });

        return;
      }

      /**
       * Validate.
       */
      if (onClickData.validate) {
        const builder: JsfBuilder = options.rootBuilder.linkedBuilder || options.rootBuilder;

        await builder.runOnFormEventHook({
          event: `dff:validate`
        });

        return;
      }

      /**
       * Submit.
       */
      if (onClickData.submit) {
        const createRevision = typeof onClickData.submit === 'object' && !!onClickData.submit.createRevision;
        const createFork     = typeof onClickData.submit === 'object' && !!onClickData.submit.createFork;

        let response;
        if (onClickData.submit === true) {
          if (options.rootBuilder && options.rootBuilder.linkedBuilder && options.rootBuilder.warnings) {
            // tslint:disable-next-line
            console.warn(`This JsfBuilder has a linkedBuilder, but you have not specified to run the submit action on the linked builder. If you are trying to submit from a form header or dialog then nothing will happen when the form is submitted.`);
          }

          if (createRevision) {
            response = await options.rootBuilder.runOnFormEventHook({
              event: `dff:create-revision`
            });
          } else if (createFork) {
            response = await options.rootBuilder.runOnFormEventHook({
              event: `dff:create-fork`
            });
          } else {
            response = await options.rootBuilder.runOnSubmitHook();
          }
        } else if (isObject(onClickData.submit)) {
          let builder: JsfBuilder;
          if (onClickData.submit.onLinked) {
            if (!options.rootBuilder.linkedBuilder) {
              throw new Error('onLinked is set to true, but there is no linkedBuilder');
            }
            builder = options.rootBuilder.linkedBuilder;
          } else {
            builder = options.rootBuilder;
          }

          if (createRevision) {
            response = await builder.runOnFormEventHook({
              event: `dff:create-revision`
            });
          } else if (createFork) {
            response = await builder.runOnFormEventHook({
              event: `dff:create-fork`
            });
          } else {
            response = await builder.runOnSubmitHook();
          }
        } else {
          throw new Error('Unknown submit option in ' + JSON.stringify(onClickData));
        }

        // Map response data
        if (isObject(onClickData.submit)) {
          if (onClickData.submit.mapResponseData) {
            const builder = onClickData.submit.onLinked ? options.rootBuilder.linkedBuilder : options.rootBuilder;

            const ctx = builder.getEvalContext({
              layoutBuilder     : options.layoutBuilder as any,
              extraContextParams: {
                $response: response,
                ...(options.extraContextParams || {})
              }
            });

            // tslint:disable-next-line
            response = builder.runEvalWithContext((onClickData.submit.mapResponseData as any).$evalTranspiled || onClickData.submit.mapResponseData.$eval, ctx);
          }
        }

        return;
      }

      /**
       * @deprecated
       */
      if (onClickData.submitToLinked) {
        if (!options.rootBuilder.linkedBuilder) {
          throw new Error('submitToLinked is set to true, but there is no linkedBuilder');
        }
        return options.rootBuilder.linkedBuilder.runOnSubmitHook();
      }

      /**
       * Array item add.
       */
      if (onClickData.arrayItemAdd) {
        const builder = onClickData.arrayItemAdd.onLinked ? options.rootBuilder.linkedBuilder : options.rootBuilder;

        let control;
        if (onClickData.arrayItemAdd.path) {
          control = options.layoutBuilder && !onClickData.arrayItemAdd.onLinked
            ? options.layoutBuilder.getPropItem(onClickData.arrayItemAdd.path)
            : builder.propBuilder.getControlByPath(onClickData.arrayItemAdd.path);
        } else {
          control = builder.propBuilder;
        }
        let value = onClickData.arrayItemAdd.value;
        if (typeof value === 'object' && '$eval' in value) {
          const ctx = options.rootBuilder.getEvalContext({
            layoutBuilder     : options.layoutBuilder as any,
            extraContextParams: options.extraContextParams
          });
          value     = options.rootBuilder.runEvalWithContext((value as any).$evalTranspiled || value.$eval, ctx);
        }

        await control.add(value, { mode: onClickData.arrayItemAdd.mode });

        return;
      }

      /**
       * Array item remove.
       */
      if (onClickData.arrayItemRemove) {
        const builder = onClickData.arrayItemRemove.onLinked ? options.rootBuilder.linkedBuilder : options.rootBuilder;

        let control;
        if (onClickData.arrayItemRemove.path) {
          control = options.layoutBuilder && !onClickData.arrayItemRemove.onLinked
            ? options.layoutBuilder.getPropItem(onClickData.arrayItemRemove.path)
            : builder.propBuilder.getControlByPath(onClickData.arrayItemRemove.path);
        } else {
          control = builder.propBuilder;
        }
        let index = onClickData.arrayItemRemove.index;
        if (typeof index === 'object' && '$eval' in index) {
          const ctx = options.rootBuilder.getEvalContext({
            layoutBuilder     : options.layoutBuilder as any,
            extraContextParams: options.extraContextParams
          });
          index     = options.rootBuilder.runEvalWithContext((index as any).$evalTranspiled || index.$eval, ctx);
        }

        await (control as JsfArrayPropLayoutBuilder).removeAt(index as number);

        return;
      }

      /**
       * navigateTo - Redirect.
       */
      if (onClickData.navigateTo) {
        let path = onClickData.navigateTo.path;

        if (!onClickData.navigateTo.reload) {
          if (typeof path === 'object' && '$eval' in path) {
            const ctx = options.rootBuilder.getEvalContext({
              layoutBuilder     : options.layoutBuilder as any,
              extraContextParams: options.extraContextParams
            });
            path      = options.rootBuilder.runEvalWithContext((path as any).$evalTranspiled || path.$eval, ctx);
          }

          if (typeof path !== 'string') {
            throw new Error(`navigateTo path must be a string.`);
          }
        }

        let query = onClickData.navigateTo.query;
        if (typeof query === 'object' && '$eval' in query) {
          const ctx = options.rootBuilder.getEvalContext({
            layoutBuilder     : options.layoutBuilder as any,
            extraContextParams: options.extraContextParams
          });
          query     = options.rootBuilder.runEvalWithContext((query as any).$evalTranspiled || query.$eval, ctx);
        }

        const navigationOptions: JsfRouterNavigationOptionsInterface = {
          relative: !!onClickData.navigateTo.relative,
          reload  : !!onClickData.navigateTo.reload,

          queryParamsHandling: onClickData.navigateTo.queryParamsHandling,

          query,

          openInNewWindow: false
        };

        if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
          // Absolute navigation
          navigationOptions.type = 'absolute';

          navigationOptions.openInNewWindow = true;
          if (onClickData.navigateTo.openInNewWindow !== void 0) {
            navigationOptions.openInNewWindow = !!onClickData.navigateTo.openInNewWindow;
          }
        } else {
          // Angular navigation
          navigationOptions.type  = 'app';
          const transferFormValue = onClickData.navigateTo.transferFormValue;
          if (transferFormValue) {

            let targetPath: any = transferFormValue;
            let targetValue;

            if (targetPath === true) {
              // Special case, transfer everything.
              targetPath  = void 0;
              targetValue = options.rootBuilder.getJsonValue();

            } else if (typeof transferFormValue === 'object') {
              // Copy a specific value into a given path.
              targetPath = transferFormValue.path || void 0; // Path is optional.

              if (transferFormValue.value) {
                // Value was provided so we need to evaluate it.
                targetValue = transferFormValue.value;
                if (typeof targetValue === 'object' && '$eval' in targetValue) {
                  const ctx   = options.rootBuilder.getEvalContext({
                    layoutBuilder     : options.layoutBuilder as any,
                    extraContextParams: options.extraContextParams
                  });
                  targetValue = options.rootBuilder.runEvalWithContext((targetValue as any).$evalTranspiled || targetValue.$eval, ctx);
                }
              } else {
                // No value was provided, using the entire form value.
                targetValue = options.rootBuilder.getJsonValue();
              }
            } else {
              // Unknown?
              throw new Error(`Unknown 'transferFormValue' instruction '${ transferFormValue }. Use 'true' to copy everything, or provide an object specifying a path and a value to copy.`);
            }

            navigationOptions.transferFormValue = {
              path : targetPath,
              value: targetValue
            };
          }
        }
        const builder = options.rootBuilder.linkedBuilder || options.rootBuilder;
        await builder.appRouter.navigateTo(path, navigationOptions);

        return;
      }

      /**
       * DFF action.
       */
      if (onClickData.dff) {
        const validActions = [
          'load',
          'save',
          'delete',
          'retry',
          'runCustomEvent',
          'runVirtualEvent'
        ];

        const action = onClickData.dff.action;
        if (!action || validActions.indexOf(action) === -1) {
          throw new Error(`Invalid action '${ action }'`);
        }

        let value = onClickData.dff.value;
        if (typeof value === 'object' && '$eval' in value) {
          const ctx = options.rootBuilder.getEvalContext({
            layoutBuilder     : options.layoutBuilder as any,
            extraContextParams: options.extraContextParams
          });
          value     = options.rootBuilder.runEvalWithContext((value as any).$evalTranspiled || value.$eval, ctx);
        }

        const builder = onClickData.dff.onLinked ? options.rootBuilder.linkedBuilder : options.rootBuilder;
        let response  = await builder.runOnFormEventHook({
          event : `dff:${ action }`,
          value : value,
          layout: options.layoutBuilder && options.layoutBuilder.type
        });

        // Map response data
        if (onClickData.dff.mapResponseData) {
          const ctx = builder.getEvalContext({
            layoutBuilder     : options.layoutBuilder as any,
            extraContextParams: {
              $response: response,
              ...(options.extraContextParams || {})
            }
          });

          // tslint:disable-next-line
          response = builder.runEvalWithContext((onClickData.dff.mapResponseData as any).$evalTranspiled || onClickData.dff.mapResponseData.$eval, ctx);
        }

        return response;
      }

      /**
       * Show dialog.
       */
      if (onClickData.openFormDialog) {
        const builder = options.rootBuilder.linkedBuilder || options.rootBuilder;

        const dffKey         = this.getValueLegacy(onClickData.openFormDialog.dffKey, options);
        const documentId     = this.getValueLegacy(onClickData.openFormDialog.documentId, options);
        const abortOnDismiss = this.getValueLegacy(onClickData.openFormDialog.abortOnDismiss, options);
        const proxy          = this.getValueLegacy(onClickData.openFormDialog.proxy, options);

        const eventValue: any = {
          dffKey,
          documentId,
          abortOnDismiss,
          proxy
        };

        const transferFormValue = onClickData.openFormDialog.transferFormValue;
        if (transferFormValue) {

          let targetPath: any = transferFormValue;
          let targetValue;

          if (targetPath === true) {
            // Special case, transfer everything.
            targetPath  = void 0;
            targetValue = options.rootBuilder.getJsonValue();

          } else if (typeof transferFormValue === 'object') {
            // Copy a specific value into a given path.
            targetPath = transferFormValue.path || void 0; // Path is optional.

            if (transferFormValue.value) {
              // Value was provided so we need to evaluate it.
              targetValue = transferFormValue.value;
              if (typeof targetValue === 'object' && '$eval' in targetValue) {
                const ctx   = options.rootBuilder.getEvalContext({
                  layoutBuilder     : options.layoutBuilder as any,
                  extraContextParams: options.extraContextParams
                });
                targetValue = options.rootBuilder.runEvalWithContext((targetValue as any).$evalTranspiled || targetValue.$eval, ctx);
              }
            } else {
              // No value was provided, using the entire form value.
              targetValue = options.rootBuilder.getJsonValue();
            }
          } else {
            // Unknown?
            throw new Error(`Unknown 'transferFormValue' instruction '${ transferFormValue }. Use 'true' to copy everything, or provide an object specifying a path and a value to copy.`);
          }

          eventValue.transferFormValue = {
            path : targetPath,
            value: targetValue
          };
        }

        // This await will return after the form dialog is closed.
        const responseForm: JsfBuilder = await builder.runOnFormEventHook({
          event : `dff:openFormDialog`,
          value : eventValue,
          layout: options.layoutBuilder && options.layoutBuilder.type
        });

        if (!responseForm) {
          throw new JsfAbortEventChain('Chain interrupted by user manually closing the dialog.');
        }

        if (onClickData.openFormDialog.mapResponseData) {
          const ctx = builder.getEvalContext({
            layoutBuilder     : options.layoutBuilder as any,
            extraContextParams: {
              $response: responseForm.getJsonValue(),
              ...(options.extraContextParams || {})
            }
          });

          // tslint:disable-next-line
          builder.runEvalWithContext((onClickData.openFormDialog.mapResponseData as any).$evalTranspiled || onClickData.openFormDialog.mapResponseData.$eval, ctx);
        }

        return;
      }

      /**
       * Close form dialog.
       */
      if (onClickData.closeFormDialog) {
        const builder = options.rootBuilder.linkedBuilder || options.rootBuilder;

        return builder.runOnFormEventHook({
          event : `dff:closeFormDialog`,
          value : onClickData.closeFormDialog,
          layout: options.layoutBuilder && options.layoutBuilder.type
        });
      }

      /**
       * Show dialog.
       */
      if (onClickData.showDialog) {
        const builder = options.rootBuilder.linkedBuilder || options.rootBuilder;

        let value = onClickData.showDialog.data;
        if (typeof value === 'object' && '$eval' in value) {
          const ctx = options.rootBuilder.getEvalContext({
            layoutBuilder     : options.layoutBuilder as any,
            extraContextParams: options.extraContextParams
          });
          value     = builder.runEvalWithContext((value as any).$evalTranspiled || value.$eval, ctx);
        }

        return builder.runOnFormEventHook({
          event : `dff:showDialog`,
          value : {
            key          : onClickData.showDialog.key,
            dialogOptions: onClickData.showDialog.dialogOptions,
            value
          },
          layout: options.layoutBuilder && options.layoutBuilder.type
        });
      }

      /**
       * Hide dialog.
       */
      if (onClickData.hideDialog) {
        const builder = options.rootBuilder.linkedBuilder || options.rootBuilder;
        return builder.runOnFormEventHook({
          event : `dff:hideDialog`,
          value : void 0,
          layout: options.layoutBuilder && options.layoutBuilder.type
        });
      }

      /**
       * Show loading indicator.
       */
      if (onClickData.showLoadingIndicator) {
        const builder = options.rootBuilder.linkedBuilder || options.rootBuilder;
        return builder.runOnFormEventHook({
          event : `dff:showLoadingIndicator`,
          value : void 0,
          layout: options.layoutBuilder && options.layoutBuilder.type
        });
      }

      /**
       * Hide loading indicator.
       */
      if (onClickData.hideLoadingIndicator) {
        const builder = options.rootBuilder.linkedBuilder || options.rootBuilder;
        return builder.runOnFormEventHook({
          event : `dff:hideLoadingIndicator`,
          value : void 0,
          layout: options.layoutBuilder && options.layoutBuilder.type
        });
      }

      /**
       * Stepper next.
       */
      if (onClickData.stepperNext) {
        const id = onClickData.stepperNext.id;
        if (!id) {
          throw new Error(`No stepper ID provided`);
        }
        const layoutComponent = options.rootBuilder.getLayoutComponent(id);
        if (!layoutComponent) {
          throw new Error(`Stepper with ID '${ id }' not found`);
        }
        layoutComponent.nextStep(); // See stepper.component.ts in jsf-app.
        return;
      }

      /**
       * Stepper previous.
       */
      if (onClickData.stepperPrevious) {
        const id = onClickData.stepperPrevious.id;
        if (!id) {
          throw new Error(`No stepper ID provided`);
        }
        const layoutComponent = options.rootBuilder.getLayoutComponent(id);
        if (!layoutComponent) {
          throw new Error(`Stepper with ID '${ id }' not found`);
        }
        layoutComponent.previousStep(); // See stepper.component.ts in jsf-app.
        return;
      }

      /**
       * Show notification.
       */
      if (onClickData.showNotification) {
        const message = this.getValueLegacy(onClickData.showNotification.message, options);
        const level   = this.getValueLegacy(onClickData.showNotification.level, options) || 'info';

        return options.rootBuilder.runOnNotificationHook({
          level,
          message
        });
      }

      /**
       * Clipboard
       */
      if (onClickData.clipboard) {
        if (onClickData.clipboard.clear) {
          if (onClickData.clipboard.clear === true) {
            jsfClipboardClearAll();
          } else if (isString(onClickData.clipboard.clear)) {
            jsfClipboardClear(onClickData.clipboard.clear);
          } else {
            jsfClipboardClearMany(onClickData.clipboard.clear);
          }
        }

        if (onClickData.clipboard.copy) {
          const key   = this.getValue(onClickData.clipboard.copy.key, options);
          const value = this.getValue(onClickData.clipboard.copy.value, options);
          (window as any).localStorage.setItem(`${ jsfClipboardBaseKey }:${ key }`, JSON.stringify({ value }));
        }
        return;
      }

      /**
       * Run service action
       */
      if (onClickData.runServiceAction) {
        const service = this.getValue(onClickData.runServiceAction.service, options);
        const action  = this.getValue(onClickData.runServiceAction.action, options);
        const data    = onClickData.runServiceAction.data && this.getValue(onClickData.runServiceAction.data, options);

        const builder = onClickData.runServiceAction.onLinked ? options.rootBuilder.linkedBuilder : options.rootBuilder;

        const serviceInstance = builder.getServiceByName(service);
        if (serviceInstance) {
          try {
            return serviceInstance.onAction(action, data);
          } catch (e) {
            await builder.runOnNotificationHook({
              level  : 'error',
              title  : 'Error',
              message: 'An error occured. Please try again.'
            });
            throw e;
          }
        } else {
          if (builder.warnings) {
            console.warn(`Failed to call action "${ action }" on service "${ service }: service not found."`);
          }
        }

        return;
      }

      /**
       * Dats source reload
       */
      if (onClickData.dataSourceReload) {
        if (onClickData.dataSourceReload.dataSourceKey === '*') {
          if (onClickData.dataSourceReload.force) {
            options.rootBuilder.jsfPageBuilder.forceProcessDataSources();
          } else {
            options.rootBuilder.jsfPageBuilder.processDataSources();
          }
        } else {
          if (onClickData.dataSourceReload.force) {
            options.rootBuilder.jsfPageBuilder.forceProcessDataSource(onClickData.dataSourceReload.dataSourceKey);
          } else {
            options.rootBuilder.jsfPageBuilder.processDataSource(onClickData.dataSourceReload.dataSourceKey);
          }
        }
        return;
      }

      /**
       * Dats source requests.
       */
      if (onClickData.dataSourceRequest) {
        const data = onClickData.dataSourceRequest.data && this.getValue(onClickData.dataSourceRequest.data, options);
        let res$: Observable<any>;
        switch (onClickData.dataSourceRequest.type || 'list') {
          case 'get':
            res$ = options.rootBuilder.jsfPageBuilder.makeDataSourceGetRequest(onClickData.dataSourceRequest.key, data);
            break;
          case 'insert':
            res$ = options.rootBuilder.jsfPageBuilder.makeDataSourceInsertRequest(onClickData.dataSourceRequest.key, data);
            break;
          case 'list':
            res$ = options.rootBuilder.jsfPageBuilder.makeDataSourceListRequest(onClickData.dataSourceRequest.key, data);
            break;
          case 'remove':
            res$ = options.rootBuilder.jsfPageBuilder.makeDataSourceRemoveRequest(onClickData.dataSourceRequest.key, data);
            break;
          case 'update':
            res$ = options.rootBuilder.jsfPageBuilder.makeDataSourceUpdateRequest(onClickData.dataSourceRequest.key, data);
            break;
          default:
            throw new Error('Unknown data source type ' + onClickData.dataSourceRequest.type);
        }

        await res$.toPromise()
          .then($reqResult => this.runEval(onClickData.dataSourceRequest?.onSuccess, {
            ...options,
            extraContextParams: { ...options.extraContextParams, $reqResult }
          }))
          .catch($reqError => {
            if (onClickData.dataSourceRequest?.onFailure) {
              this.runEval(onClickData.dataSourceRequest.onFailure, {
                ...options,
                extraContextParams: { ...options.extraContextParams, $reqError }
              });
            } else {
              console.error($reqError);
            }
          });
        return;
      }

      /**
       * Reload provider.
       */
      if (onClickData.providerReload) {
        if (onClickData.providerReload.reloadType === 'key') {
          return await Promise.all(options.rootBuilder.providerExecutors.filter(x => x.providerKey === onClickData.providerReload.key).map(x => x.provideImmediately()));
        } else if (onClickData.providerReload.reloadType === 'tag') {
          throw new Error(`Not implemented.`);
        }
        return;
      }

      /**
       * Scroll to top.
       */
      if (onClickData.scrollToTop) {
        options.rootBuilder.docComponent.osService.scrollAllTo(0, 0);
        return;
      }

      /**
       * Custom actions from JSF registry
       */
      if (onClickData.customAction) {
        const actionHandler = JsfRegister.getCustomClickActions()[onClickData.customAction?.key];
        if (!actionHandler) {
          throw new Error(`Custom action "${ onClickData.customAction?.key } does not exist"`);
        }
        return actionHandler(onClickData, options);
      }

      /**
       * Custom actions from layout
       */
      if (options.customActionHandler) {
        if (await options.customActionHandler(onClickData, options)) {
          return;
        }
      }

      /**
       * If we reached this point then the user provided an unknown action, so throw an error.
       */
      throw new Error(`Unknown action ${ JSON.stringify(onClickData) }`);

    } catch (e) {
      // Capture all exceptions and interrupt the chain of events.
      throw e;
    }
  }
};
