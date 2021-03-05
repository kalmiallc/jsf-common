import { JsfAbstractBuilder }                                     from './abstract/abstract-builder';
import { JsfPage }                                                from '../jsf-page';
import { JsfBuilder }                                             from './jsf-builder';
import { JsfTranslatableMessage, JsfTranslationServer }           from '../translations';
import { JsfComponentBuilder }                                    from './jsf-component-builder';
import { interval, Observable, Subject, timer, Subscription, of } from 'rxjs';
import { JsfDefinition }                                          from '../jsf-definition';
import { debounce, finalize, takeUntil, throttleTime }            from 'rxjs/operators';
import { DataSourceInterface }                                    from '../jsf-component';
import { JsfUnknownPropBuilder }                                  from './abstract';
import { isPropBuilderArray }                                     from './props';

/**
 * Global counter so each page can have uniq ID.
 */
let jsfPageId = 0;

export interface JsfPageBuilderOptionsInterface {
  jsfDefinitionProvider?: (key: string) => Observable<JsfDefinition>
  dataSourceProvider?: (req: DataSourceProviderRequestInterface) => Observable<DataSourceProviderResponseInterface>;
  dataSourceConfig?: any;
}

export interface DataSourceReqFunArg {
  filters?: DataSourceFilterInterface[],
  filterGroups?: { [groupKey: string]: DataSourceFilterInterface[] },
  groupKey?: string,
  payload?: {
    /**
     * Extra key, could be used for PUT req.
     * */
    key?: any;

    /**
     * Extra data, could be used for POST req.
     */
    data?: any;
  }
}

export interface DataSourceReqFunOptions {
  /**
   * Do not notify others on new data (event listener).
   */
  preventDefaultSuccess?: boolean;

  /**
   * Do not call builder on error hook.
   */
  preventDefaultError?: boolean;
}

export interface DataSourceProviderRequestInterface {
  /**
   * Uniq identification of data source. For example: db1://cars/bmw/parts
   * Name can be anything since it is on the implementor side to support data source types.
   */
  dataSource: string;

  /**
   * If set data source provider will be able to different between same data sources.
   * This is helpful for example if same data source is used more than once but each instance has different
   * filter set.
   */
  groupKey?: string;

  /**
   * Filters for given data source. Filters are gathered in array, it's implementors job to merge them.
   */
  filters?: DataSourceFilterInterface[];
  filterGroups?: { [groupKey: string]: DataSourceFilterInterface[] },

  payload?: {
    /**
     * Extra key, could be used for PUT req.
     * */
    key?: any;

    /**
     * Extra data, could be used for POST req.
     */
    data?: any;
  };
}

export interface DataSourceProviderResponseInterface {
  /**
   * Check @DataSourceRequestInterface.dataSourceKey
   */
  dataSource: string;

  /**
   * Check @DataSourceRequestInterface.groupKey
   */
  groupKey?: string;

  /**
   * Check @DataSourceRequestInterface.filter
   */
  filters?: DataSourceFilterInterface[];

  /**
   * Response from data source provider.
   */
  value: any;
}

export interface DataSourceFilterChangeInterface {
  dataSourceKey: string;
  filters: DataSourceFilterInterface[];
  filterGroups: { [k: string]: DataSourceFilterInterface[] };
}

export interface DataSourceFilterInterface {
  groupKey?: string;
  path: string;
  hash: string;
  dirty: boolean;
  value: any;
}

export class JsfPageBuilder extends JsfAbstractBuilder {

  protected onFilterChange$: Subject<{
    dataSource: string;
    componentPath: string;
    filterPath: string;
    groupKey?: string;
    skipProcessDirtyDataSources?: boolean;
    filterValueHash: string;
    filterValue: any;
  }>                      = new Subject<{
    dataSource: string;
    componentPath: string;
    filterPath: string;
    groupKey?: string;
    skipProcessDirtyDataSources?: boolean;
    filterValueHash: string;
    filterValue: any;
  }>();
  protected onDestroy: Subject<void>                      = new Subject<void>();
  protected requestProcessDirtyDataSources: Subject<void> = new Subject<void>();

  onDataSourceFilterChange: Subject<DataSourceFilterChangeInterface>              = new Subject<DataSourceFilterChangeInterface>();
  onDataSourceReloadRequest: Subject<{ dataSourceKey: string; force?: boolean; }> = new Subject<{ dataSourceKey: string; force?: boolean; }>();

  pageDefinition: JsfPage;

  /**
   * All currently active component builder instances. Components can be registered and de-registered at any time.
   * Key in object represents component path, matching handler path in JSF.
   */
  components: { [componentPath: string]: JsfComponentBuilder } = {};

  dataSourcesInfo: {
    [dataSource: string]:
      {
        forceDirty: boolean;
        interval?: Subscription;
        components: {
          [componentPath: string]: {
            refreshInterval?: number;
            subscribed?: boolean;
            filters?: DataSourceFilterInterface[]
          }
        }
      }
  } = {};

  readonly jsfDefinitionProvider?: (key: string) => Observable<JsfDefinition>;
  readonly dataSourceProvider?: (req: DataSourceProviderRequestInterface) => Observable<DataSourceProviderResponseInterface>;
  readonly dataSourceConfig?: { [key: string]: { title: string } };

  private _id = jsfPageId++;
  get id(): number {
    return this._id;
  }

  dataSourceRequests: { dataSource: string, groupKey?: string }[] = [];

  /**
   * Main component of page. Same as root prop has empty string path, root component also has empty string as base.
   */
  get rootComponent(): JsfComponentBuilder {
    return this.components[''];
  }

  set rootComponent(x: JsfComponentBuilder) {
    this.components[''] = x;
  }

  get allComponentsReady() {
    for (const componentKey of Object.keys(this.components)) {
      if (!this.components[componentKey] || (!this.components[componentKey].jsfBuilder)) {
        return false;
      }
    }
    return true;
  }

  constructor(
    pageDefinition: JsfPage,
    options: JsfPageBuilderOptionsInterface = {}
  ) {
    super();
    this.pageDefinition        = pageDefinition;
    this.jsfDefinitionProvider = options.jsfDefinitionProvider;
    this.dataSourceProvider    = options.dataSourceProvider;
    this.dataSourceConfig      = options.dataSourceConfig;

    if (!this.pageDefinition.component) {
      throw new Error('Missing JSF Component in JSF page definition.');
    }
    this.rootComponent = new JsfComponentBuilder({
      jsfParentComponentBuilder: undefined,
      jsfComponentDefinition   : this.pageDefinition.component,
      jsfPageBuilder           : this,
      componentName            : ''
    });

    this.requestProcessDirtyDataSources
      .pipe(
        takeUntil(this.onDestroy),
        throttleTime(250, undefined, { leading: true, trailing: true })
      )
      .subscribe(() => this.processDirtyDataSources());
  }

  dataSourceSupportsBatchRequest(dataSourceKey: string) {
    return false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  /// Helper functions
  ////////////////////////////////////////////////////////////////////////////////////////////

  requestJsfDefinition(key: string) {
    if (!this.jsfDefinitionProvider) {
      throw new Error('[JSF-PAGE] No jsfDefinitionProvider set.');
    }
    return this.jsfDefinitionProvider(key);
  }

  destroy() {
    this.onDestroy.next();

    for (const dataSourceKey of Object.keys(this.dataSourcesInfo)) {
      if (this.dataSourcesInfo[dataSourceKey].interval) {
        this.dataSourcesInfo[dataSourceKey].interval.unsubscribe();
      }
    }

    this.components = {};
    this.dataSourcesInfo = {};
    this.dataSourceRequests = [];
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  /// Component management
  ////////////////////////////////////////////////////////////////////////////////////////////

  registerRootComponent(jsfBuilder: JsfBuilder) {
    this.rootComponent.init(jsfBuilder, { noRegister: true });
    this._registerComponent('');
  }

  registerComponent(jsfComponentBuilder: JsfComponentBuilder) {
    this.components[jsfComponentBuilder.path] = jsfComponentBuilder;
    this._registerComponent(jsfComponentBuilder.path);
  }

  private _registerComponent(path: string) {
    this.registerComponentDataSourceFilter(path);
    this.registerComponentDataSourceSubscription(path);

    this.requestProcessDirtyDataSources.next();
  }

  deRegisterComponent(path: string) {
    for (const dataSourceKey of Object.keys(this.dataSourcesInfo)) {
       if (this.dataSourcesInfo[dataSourceKey].components[path]) {
         if (this.dataSourcesInfo[dataSourceKey].components[path].refreshInterval && this.dataSourcesInfo[dataSourceKey].interval) {
           this.dataSourcesInfo[dataSourceKey].interval.unsubscribe();
           this.repairDataSourceInterval(dataSourceKey);
         }
         delete this.dataSourcesInfo[dataSourceKey].components[path];
       }
    }
    delete this.components[path];
  }

  debug() {
    return {
      components     : Object.keys(this.components)
        .map(x => this.components[x])
        .map(x => ({ path: x.path, hasJsfBuilder: !!x.jsfBuilder })),
      dataSourcesInfo: this.dataSourcesInfo
    };
  }

  private sendEventToComponents(eventKey: string, eventData: any, componentPaths: string[] = Object.keys(this.components)) {
    for (const componentPath of componentPaths) {
      if (!this.components[componentPath].jsfBuilder) {
        throw new Error(`[JSF-PAGE] Component <${ componentPath }> does not have builder yet.`);
      }
      this.components[componentPath].jsfBuilder.onExternalEvent(eventKey, eventData);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  /// Data source capabilities
  ////////////////////////////////////////////////////////////////////////////////////////////

  private initDataSourcesInfoChunk(dataSource: string, componentPath: string) {
    this.dataSourcesInfo[dataSource]                                   = this.dataSourcesInfo[dataSource] || {
      components: {},
      forceDirty: true
    };
    this.dataSourcesInfo[dataSource].components[componentPath]         = this.dataSourcesInfo[dataSource].components[componentPath]
      || {};
    this.dataSourcesInfo[dataSource].components[componentPath].filters = this.dataSourcesInfo[dataSource].components[componentPath].filters
      || [];
  }

  private registerComponentDataSourceFilter(componentPath: string) {
    const jb = this.components[componentPath].jsfBuilder;
    if (!jb) {
      throw new Error(`[JSF-PAGE] Component's filters <${ componentPath }> can not be initialized since builder is not ready yet.`);
    }
    for (const filter of this.components[componentPath].jsfComponentDefinition.dataSourcesFilters || []) {
      this.initDataSourcesInfoChunk(filter.dataSource, componentPath);
      this.subscribeFilterProp(jb.getProp(filter.filterPath), filter.dataSource, componentPath, filter.filterPath);
    }
  }

  subscribeFilterProp(
    prop: JsfUnknownPropBuilder,
    dataSource: string,
    componentPath: string,
    filterPath: string
  ) {
    if (isPropBuilderArray(prop)) {
      (prop.items || []).forEach((propItem, i) => {
        const { value, hash } = propItem.getValueWithHash();
        const groupKey        = value?._groupKey || i;
        this.dataSourcesInfo[dataSource].components[componentPath].filters.push({
          value, hash, path: filterPath + `[${ i }]`, groupKey, dirty: true
        });
        this._subscribeFilterProp(propItem, dataSource, componentPath, filterPath + `[${ i }]`, groupKey);
      });
      prop.onItemAdd.subscribe(x => {
        const { value, hash } = x.item.getValueWithHash();
        const groupKey        = value?._groupKey || x.index;
        this.dataSourcesInfo[dataSource].components[componentPath].filters.push({
          value, hash, path: filterPath + `[${ x.index }]`, groupKey, dirty: true
        });
        this._subscribeFilterProp(x.item, dataSource, componentPath, filterPath + `[${ x.index }]`, groupKey);
      });
    } else {
      const { value, hash } = prop.getValueWithHash();
      this.dataSourcesInfo[dataSource].components[componentPath].filters.push({
        value, hash, path: filterPath, dirty: true
      });
      this._subscribeFilterProp(prop, dataSource, componentPath, filterPath);
    }
  }

  _subscribeFilterProp(
    prop: JsfUnknownPropBuilder,
    dataSource: string,
    componentPath: string,
    filterPath: string,
    groupKey?: string
  ) {
    prop
      .valueChange
      .pipe(takeUntil(prop.unsubscribe), takeUntil(this.onDestroy), debounce(() => timer(100)))
      .subscribe((x) => {
        this.onFilterChange(dataSource, componentPath, filterPath, { groupKey });
      });
  }

  onFilterChange(
    dataSource: string,
    componentPath: string,
    filterPath: string,
    options: { groupKey?: string, skipProcessDirtyDataSources?: boolean } = {}
  ) {
    const jb              = this.components[componentPath].jsfBuilder;
    if (jb.destroyed) {
      return;
    }

    const { value, hash } = jb.getProp(filterPath).getValueWithHash();
    const filterState     = this.dataSourcesInfo[dataSource].components[componentPath].filters
      .find(x => x.path === filterPath && x.groupKey === options.groupKey);
    if (filterState.hash === hash) {
      return;
    }
    filterState.hash  = hash;
    filterState.value = value;
    filterState.dirty = true;

    this.onFilterChange$.next({
      dataSource,
      componentPath,
      filterPath,
      groupKey: options.groupKey,
      skipProcessDirtyDataSources: options.skipProcessDirtyDataSources,
      filterValueHash: hash,
      filterValue: value
    });

    if (!options.skipProcessDirtyDataSources) {
      this.processDirtyDataSources();
    }
  }

  private registerComponentDataSourceSubscription(componentPath: string) {
    const jb = this.components[componentPath].jsfBuilder;
    if (!jb) {
      throw new Error(`[JSF-PAGE] Component's filters <${ componentPath }> can not be initialized since builder is not ready yet.`);
    }
    for (const dataSource of this.components[componentPath].jsfComponentDefinition.dataSources || []) {
      this.subscribeComponentToDataSource(componentPath, dataSource);
    }
  }

  subscribeComponentToDataSource(componentPath: string, dataSource: DataSourceInterface) {
    this.initDataSourcesInfoChunk(dataSource.key, componentPath);
    this.dataSourcesInfo[dataSource.key].components[componentPath].refreshInterval = dataSource.refreshInterval;
    this.dataSourcesInfo[dataSource.key].components[componentPath].subscribed      = true;
    this.dataSourcesInfo[dataSource.key].forceDirty                                = true;
    this.repairDataSourceInterval(dataSource.key);
  }

  subscribeToDataSource(jsfBuilder: JsfBuilder, dataSource: DataSourceInterface) {
    if (!jsfBuilder.jsfComponentBuilder) {
      throw new Error(`[JSF-PAGE] You can not subscribe to data source if not inside component.`);
    }
    this.subscribeComponentToDataSource(jsfBuilder.jsfComponentBuilder.componentName, dataSource);
  }

  /**
   * Check for refresh interval flags
   * @param dataSourceKey
   */
  repairDataSourceInterval(dataSourceKey: string) {
    const refreshInterval = Object
      .keys(this.dataSourcesInfo[dataSourceKey].components)
      .reduce(
        (a, c) => {
          const nri = this.dataSourcesInfo[dataSourceKey].components[c].refreshInterval;
          return nri > 0 && (a === undefined || a > nri)
                 ? nri
                 : a;
        },
        undefined as number
      );

    if (this.dataSourcesInfo[dataSourceKey].interval) {
      this.dataSourcesInfo[dataSourceKey].interval.unsubscribe();
    }
    if (refreshInterval > 0) {
      this.dataSourcesInfo[dataSourceKey].interval = interval(refreshInterval)
        .pipe(
          takeUntil(this.onDestroy),
          finalize(() => this.dataSourcesInfo[dataSourceKey].interval.unsubscribe())
        )
        .subscribe(() => {
          this.processDataSource(dataSourceKey);
        });
    }
  }

  processDataSource(dataSourceKey: string) {
    this.onDataSourceReloadRequest.next({ dataSourceKey });
    if (!this.dataSourcesInfo[dataSourceKey]) {
      return;
    }
    if (this.dataSourceRequests.find(x => x.dataSource === dataSourceKey && !x.groupKey)) {
      return;
    }
    this.dataSourcesInfo[dataSourceKey].forceDirty = true;
    this.processDirtyDataSources();
  }

  forceProcessDataSource(dataSourceKey: string) {
    this.onDataSourceReloadRequest.next({ dataSourceKey, force: true });
    if (!this.dataSourcesInfo[dataSourceKey]) {
      return;
    }
    this.dataSourcesInfo[dataSourceKey].forceDirty = true;
    return this.processDirtyDataSources();
  }

  processDirtyDataSourcesIfNoActiveRequests() {
    if (this.dataSourceRequests.length) {
      return;
    }
    this.processDirtyDataSources();
  }

  processDataSources() {
    for (const dataSourceKey of Object.keys(this.dataSourcesInfo)) {
      if (!this.dataSourceRequests.find(x => x.dataSource === dataSourceKey && !x.groupKey)) {
        this.dataSourcesInfo[dataSourceKey].forceDirty = true;
        this.onDataSourceReloadRequest.next({ dataSourceKey });
      }
    }
    return this.processDirtyDataSources();
  }

  forceProcessDataSources() {
    for (const dataSourceKey of Object.keys(this.dataSourcesInfo)) {
      this.dataSourcesInfo[dataSourceKey].forceDirty = true;
      this.onDataSourceReloadRequest.next({ dataSourceKey, force: true });
    }
    return this.processDirtyDataSources();
  }

  /**
   * Get filters from all components for a specific data source.
   * @param dataSourceKey
   */
  getFiltersForDataSource(dataSourceKey: string) {
    const dataSource                         = this.dataSourcesInfo[dataSourceKey];
    let filters: DataSourceFilterInterface[] = [];
    const components                         = [];

    if (!dataSource) {
      return { filters, components }
    }
    for (const componentKey of Object.keys(dataSource.components)) {
      const component = dataSource.components[componentKey];
      if (component.filters) {
        filters = filters.concat(component.filters);
      }
      if (component.subscribed) {
        components.push(componentKey);
      }
    }
    return { filters, components }
  }

  processDirtyDataSources() {
    for (const dataSourceKey of Object.keys(this.dataSourcesInfo)) {
      const dataSource              = this.dataSourcesInfo[dataSourceKey];
      const { filters, components } = this.getFiltersForDataSource(dataSourceKey);

      const dirtyFilters: DataSourceFilterInterface[]                       = [];
      const dirtyFilterGroups: { [k: string]: DataSourceFilterInterface[] } = { '*': [] };
      const filtersHaveDirtyGroups                                          = dataSource.forceDirty || (filters.findIndex(x => x.dirty && x.groupKey != null) > -1);
      const sharedFiltersAreDirty                                          = dataSource.forceDirty || (filters.findIndex(x => x.dirty && x.groupKey == null) > -1);

      for (const filter of filters) {
        if (sharedFiltersAreDirty || filter.dirty || dataSource.forceDirty || (filtersHaveDirtyGroups && filter.groupKey == null)) {
          filter.dirty = false;

          dirtyFilters.push(filter);
          dirtyFilterGroups[filter.groupKey ?? '*'] = dirtyFilterGroups[filter.groupKey ?? '*'] || [];
          dirtyFilterGroups[filter.groupKey ?? '*'].push(filter);
        }
      }

      if (!dirtyFilters.length && !dataSource.forceDirty) {
        continue;
      }
      dataSource.forceDirty = false;

      this.onDataSourceFilterChange.next({
        dataSourceKey,
        filters: dirtyFilters,
        filterGroups: dirtyFilterGroups
      });

      if (components.length) {
        if (this.dataSourceSupportsBatchRequest(dataSourceKey)) {
          this.makeDataSourceRequest(dataSourceKey, {
            filters: dirtyFilters,
            filterGroups: dirtyFilterGroups
          });
        } else {
          for (const filterGroupKey of Object.keys(dirtyFilterGroups)) {
            if (filterGroupKey === '*') {
              this.makeDataSourceRequest(dataSourceKey, {
                filters: dirtyFilterGroups[filterGroupKey],
              });
            } else {
              this.makeDataSourceRequest(dataSourceKey, {
                filters : dirtyFilterGroups['*'].concat(dirtyFilterGroups[filterGroupKey]),
                groupKey: filterGroupKey
              });
            }
          }
        }
      }
    }
  }

  forceAllFiltersUpdate() {
    for (const dataSourceKey of Object.keys(this.dataSourcesInfo)) {
      const dataSource = this.dataSourcesInfo[dataSourceKey];
      for (const componentPath of Object.keys(dataSource.components)) {
        const cmpInfo = this.dataSourcesInfo[dataSourceKey].components[componentPath];
        for (const filter of cmpInfo.filters || []) {
          this.onFilterChange(dataSourceKey, componentPath, filter.path, { skipProcessDirtyDataSources: true })
        }
      }
    }
    this.processDirtyDataSources();
  }

  makeDataSourceListRequest(dataSourceKey: string, data?: DataSourceReqFunArg, options?: DataSourceReqFunOptions) {
    return this.makeDataSourceRequest(dataSourceKey, data, options);
  }

  makeDataSourceInsertRequest(dataSourceKey: string, data?: DataSourceReqFunArg, options?: DataSourceReqFunOptions) {
    return this.makeDataSourceRequest(dataSourceKey + '#insert', data, options);
  }

  makeDataSourceUpdateRequest(dataSourceKey: string, data?: DataSourceReqFunArg, options?: DataSourceReqFunOptions) {
    return this.makeDataSourceRequest(dataSourceKey + '#update', data, options);
  }

  makeDataSourceRemoveRequest(dataSourceKey: string, data?: DataSourceReqFunArg, options?: DataSourceReqFunOptions) {
    return this.makeDataSourceRequest(dataSourceKey + '#remove', data, options);
  }

  makeDataSourceGetRequest(dataSourceKey: string, data?: DataSourceReqFunArg, options?: DataSourceReqFunOptions) {
    return this.makeDataSourceRequest(dataSourceKey + '#get', data, options);
  }

  private makeDataSourceRequest(dataSourceKey: string, data: DataSourceReqFunArg = {}, options?: DataSourceReqFunOptions): Observable<any> {
    if (!this.dataSourceProvider) {
      throw new Error('[JSF-PAGE] Missing data source provider.');
    }
    const request$ = this.dataSourceProvider({
      groupKey    : data.groupKey,
      dataSource  : dataSourceKey,
      filters     : data.filters,
      filterGroups: data.filterGroups,
      payload     : data.payload
    });
    if (request$ === null) {
      return of(null);
    }
    if (!request$) {
      throw new Error(`[JSF-PAGE] No data source returned for ${ dataSourceKey }`);
    }

    const reqKey = { dataSource: dataSourceKey, groupKey: data.groupKey };
    this.registerDataSourceRequest(reqKey);

    const resSubject = new Subject<any>();

    request$
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => {
            this.unregisterDataSourceRequest(reqKey);
            this.processDirtyDataSourcesIfNoActiveRequests();
          }
        )
      )
      .subscribe(x => {
        if (!options?.preventDefaultSuccess) {
          this.onDataSourcesRequestResponse(dataSourceKey, x);
        }
        resSubject.next(x);
        resSubject.complete();
      }, error => {
        if (!options?.preventDefaultError) {
          this.onDataSourcesRequestFail(dataSourceKey, error);
        }
        resSubject.error(error);
        resSubject.complete();
      });

    return resSubject.asObservable();
  }

  onDataSourcesRequestFail(dataSourceKey: string, error: any) {
    console.error(`[JSF-PAGE] Data source ${ dataSourceKey } failed.`, error);
    this.rootComponent.jsfBuilder.onError(error);
  }

  onDataSourcesRequestResponse(dataSourceKey: string, x: DataSourceProviderResponseInterface) {
    console.log(`[JSF-PAGE] Data source ${ dataSourceKey } responded with data.`, x);
    const dataSource = this.dataSourcesInfo[dataSourceKey];

    for (const componentKey of Object.keys(dataSource?.components || {})) {
      const component = dataSource.components[componentKey];
      if (!component.subscribed) {
        continue;
      }

      const componentBuilder = this.components[componentKey];
      if (!componentBuilder.jsfBuilder) { // component was register after req, that is ok it will make separate req
        continue;
      }

      if (!componentBuilder.jsfBuilder.destroyed) {
        componentBuilder.jsfBuilder.onExternalEvent(dataSourceKey, { ...x });
      }
    }
  }

  private registerDataSourceRequest(reqKey: { dataSource: string, groupKey?: string }) {
    this.dataSourceRequests.push(reqKey);
    this.sendEventToComponents(
      'jsf-page://activeRequests/status-change',
      {
        activeRequestsCount: this.dataSourceRequests.length,
        newRequest         : {
          dataSourceKey: reqKey.dataSource,
          groupKey     : reqKey.groupKey
        }
      }
    );
  }

  /**
   * Req object reference must be same as called in registerDataSourceRequest.
   */
  private unregisterDataSourceRequest(reqKey: { dataSource: string, groupKey?: string }) {
    const index = this.dataSourceRequests.indexOf(reqKey);
    if (index !== -1) {
      this.dataSourceRequests.splice(index, 1);
    }
    this.sendEventToComponents(
      'jsf-page://activeRequests/status-change',
      { activeRequestsCount: this.dataSourceRequests.length }
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  /// Nothing special mapping to the root component JSF builder
  ////////////////////////////////////////////////////////////////////////////////////////////

  validate(): Promise<boolean> {
    return this.rootComponent.jsfBuilder.validate();
  }

  getJsonValue(opt?: { virtual?: boolean, skipGetter?: boolean }): any {
    return this.rootComponent && this.rootComponent.jsfBuilder ? this.rootComponent.jsfBuilder.getJsonValue(opt) : null;
  }

  getValue(opt?: { virtual?: boolean, skipGetter?: boolean }): any {
    return this.rootComponent && this.rootComponent.jsfBuilder ? this.rootComponent.jsfBuilder.getValue(opt) : null;
  }

  lock(lockKey?: Symbol): Symbol {
    return this.rootComponent.jsfBuilder.lock(lockKey);
  }

  isDiff(lockKey: Symbol): boolean {
    return this.rootComponent.jsfBuilder.isDiff(lockKey);
  }

  getDiff(lockKey: Symbol): any {
    return this.rootComponent.jsfBuilder.getDiff(lockKey);
  }

  getDiffKeys(lockKey: Symbol): string[] {
    return this.rootComponent.jsfBuilder.getDiffKeys(lockKey);
  }

  getJsonDiff(lockKey: Symbol): any {
    return this.rootComponent.jsfBuilder.getJsonDiff(lockKey);
  }

  async getPropTranslatableStrings(): Promise<JsfTranslatableMessage[]> {
    return this.rootComponent.jsfBuilder.getPropTranslatableStrings();
  }

  getStaticTranslatableStrings(): JsfTranslatableMessage[] {
    return this.rootComponent.jsfBuilder.getStaticTranslatableStrings();
  }

  get translationServer(): JsfTranslationServer {
    return this.rootComponent.jsfBuilder.translationServer;
  }
}
