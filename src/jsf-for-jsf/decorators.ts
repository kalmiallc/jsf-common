import { JsfProp }                                          from '../schema/props';
import { JsfUnknownLayout }                                 from '../layout';
import { JsfDocument }                                      from '../jsf-document';
import { isArray, isPlainObject, mapValues, groupBy, omit } from 'lodash';
import { JsfDefinition }                                    from '../jsf-definition';

export const jsfRawStore: {
  [key: string]: {
    transform?: (x: JsfDocument) => JsfDocument,
    parent?: string,
    category?: string,
    deprecated?: boolean,
    layout?: JsfUnknownLayout[],
    schema?: { [key: string]: JsfProp | JsfProp[] | string | string[] }
  }
} = {};

export const jsfForJsf = new class {

  getJsfRawStore() {
    return jsfRawStore;
  }

  getJsfDefinitionsList() {
    return Object.keys(jsfRawStore).filter(x => !x.startsWith('JsfAbstract'));
  }

  getSidebarList() {
    return this.getJsfDefinitionsList()
      .map(key => ({ key, value: jsfRawStore[key] }))
      .reduce((a, c) => {
        if (c.key.startsWith('JsfProp')) {
          a.props.push({
            category: c.value.category,
            type    : this.convertToKebabCase(c.key.substr(7)),
            name    : c.key,
          })
        } else if (c.key.startsWith('JsfLayout')) {
          a.layouts.push({
            category: c.value.category,
            type    : this.convertToKebabCase(c.key.substr(9)),
            name    : c.key,
          })
        } else {
          console.warn('JSF Class name should start with JsfProp or JsfLayout prefix.');
        }
        return a;
      }, {
        layouts: [], props: []
      });
  }

  convertToKebabCase(string: string) {
    string                = string.charAt(0).toLowerCase() + string.slice(1);
    const convertedString = string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    return convertedString;
  }

  getRawJsfDefinition(key: string, isDeep?: boolean) {
    const x  = { ...(jsfRawStore[key] || {}) };
    x.layout = x.layout || [];
    if (x.parent) {
      const parent = this.getRawJsfDefinition(x.parent, true);
      x.layout     = [
        ...x.layout,

        ...((parent.layout.length || 1) ? [{
                                             type     : 'heading',
                                             level    : 4,
                                             title    : x.parent,
                                             htmlClass: 'mt-6',
                                           } as any] : []),

        ...parent.layout,
      ];

      if (!x.schema?.default
        && (parent.schema?.default as any)?.type === 'CHANGE_ME'
        && key.startsWith('JsfProp')
      ) {
        // we only need to change type where AbstractProp's 'default' value is
        // not overriden by the JsfProp component. If JsfProp overrides the 'default'
        // value, this will be done later down the line

        const typeForDefault = key.substr(7).toLowerCase();

        // it's possible that x.schema doesn't really exist, as the component
        // may inherit its scheme from its parent entirely.


        // reminder: x.schema.default does not exist, so we need this spread.
        // Here, we copy parent schema's default object to x.schema.default
        // while correcting the type property to what it should be

        const defaultType = {type: typeForDefault}
        if (typeForDefault === 'object') {
          defaultType['properties'] = {};
        }

        if (!x.schema) {
          x.schema = {};
        }

        x.schema.default = {...(parent.schema as any).default, ...defaultType};
      }

      if (
        (parent.schema?.type as any)?.const === 'CHANGE_ME'
        && key.startsWith('JsfLayout')
      ) {
        const newConst = {const: this.convertToKebabCase(key.substr(9))};

        // x.schema.type may also not exist either, hence the spread
        x.schema.type = { ...(parent.schema as any).type, ...newConst };
      }

      x.schema = { ...parent.schema, ...x.schema };
    }


    return x;
  }

  getJsfComponent(key: string, value?: any): { key: string, error?: any, jsfDoc?: JsfDocument } {
    try {
      const rawDef = this.getRawJsfDefinition(key);

      const schema: JsfProp = {
        type      : 'object',
        properties: rawDef.schema
      } as any;

      const layout: JsfUnknownLayout = {
        type : 'div',
        items: rawDef.layout
      };

      let jsfDoc = {
        $title: key,
        $description: key,
        $theme: 'rounded/yellowgreen',
        schema: schema,
        layout: layout,
        value
      } as JsfDocument;

      if (jsfRawStore[key].transform) {
        jsfDoc = jsfRawStore[key].transform(jsfDoc);
      }

      return {
        key,
        jsfDoc
      }
    } catch (error) {
      return {
        key,
        error
      }
    }
  };
};

export function DefTransform(cb: (x: JsfDocument) => JsfDocument): any {
  // tslint:disable-next-line:only-arrow-functions
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    jsfRawStore[target.name] = jsfRawStore[target.name] || {};
    jsfRawStore[target.name].transform = cb;
  };
}

export function JsfDefDeprecated(): any {
  // tslint:disable-next-line:only-arrow-functions
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    jsfRawStore[target.name]            = jsfRawStore[target.name] || {};
    jsfRawStore[target.name].deprecated = true;
  };
}

export function DefCategory(category: string): any {
  // tslint:disable-next-line:only-arrow-functions
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    jsfRawStore[target.name]          = jsfRawStore[target.name] || {};
    jsfRawStore[target.name].category = category;
  };
}

export function DefExtends(parent: string): any {
  // tslint:disable-next-line:only-arrow-functions
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    jsfRawStore[target.name]        = jsfRawStore[target.name] || {};
    jsfRawStore[target.name].parent = parent;
  };
}

// TODO RM ANY
export function DefLayout(layout: JsfUnknownLayout | JsfUnknownLayout[] | any): any {
  // tslint:disable-next-line:only-arrow-functions
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    jsfRawStore[target.name]        = jsfRawStore[target.name] || {};
    jsfRawStore[target.name].layout = isArray(layout) ? [layout[0]] : [layout];
  };
}

export function DefProp(schema: JsfProp | JsfProp[] | string | string[]): any {
  // tslint:disable-next-line:only-arrow-functions
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    jsfRawStore[target.constructor.name]        = jsfRawStore[target.constructor.name] || {};
    jsfRawStore[target.constructor.name].schema = jsfRawStore[target.constructor.name].schema || {};

    if (isPlainObject(schema)) {
      jsfRawStore[target.constructor.name].schema[propertyName] = schema;
    } else if (isArray(schema)) {
      jsfRawStore[target.constructor.name].schema[propertyName] = schema[0];
    } else {
      // TODO
      delete jsfRawStore[target.constructor.name].schema[propertyName];
    }
  };
}

export function DefSpecialProp(schema: string | string[]): any {
  // tslint:disable-next-line:only-arrow-functions
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    // TODO
  };
}


