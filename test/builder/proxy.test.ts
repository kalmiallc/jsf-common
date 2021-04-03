import { JsfBuilder }                                                                         from '../../src/builder';
import { JsfDocument, JsfLayoutDiv, JsfPropArray, JsfPropDate, JsfPropObject, JsfPropString } from '../../src';

const doc: JsfDocument = {
    schema: new JsfPropObject({
        type      : 'object',
        properties: {
            title      : new JsfPropString({
                type: 'string'
            }),
            description: new JsfPropString({
                type: 'string'
            }),
            time       : new JsfPropDate({
                type: 'date'
            }),
            nested     : new JsfPropObject({
                type      : 'object',
                properties: {
                    inside: new JsfPropString({
                        type: 'string'
                    }),
                }
            }),
            a          : new JsfPropObject({
                type      : 'object',
                properties: {
                    b: new JsfPropObject({
                        type      : 'object',
                        properties: {
                            c: new JsfPropObject({
                                type      : 'object',
                                properties: {
                                    d: new JsfPropString({
                                        type: 'string'
                                    }),
                                }
                            }),
                        }
                    }),
                }
            }),
            list       : new JsfPropArray({
                type : 'array',
                items: {
                    type: 'string'
                }
            }),
            listNested : new JsfPropArray({
                type : 'array',
                items: new JsfPropObject({
                    type      : 'object',
                    properties: {
                        a: new JsfPropObject({
                            type      : 'object',
                            properties: {
                                b: new JsfPropString({
                                    type: 'string'
                                }),
                            }
                        }),
                    }
                })
            })
        },
    }),

    layout: new JsfLayoutDiv({
        type : 'div',
        items: []
    }),

    value: {
        title: 'ABC',
        time : (new Date()).toString(),
        list : ['A']
    }
};

interface MyValueInterface {
    description: string,
    title: string,
    time: Date,
    list: string[],
    listNested: { a?: { b?: string } }[],
    nested: { inside: string },
    a: { b: { c: { d: string } } }
}

describe('JsfBuilder value proxy', () => {


    it('Basic proxy test', async (d) => {
        let val;
        const builder: JsfBuilder<MyValueInterface> = await JsfBuilder.create({ ...doc, } as any);

        val = builder.getValue();
        expect(val.title).toBe('ABC');
        expect(val.list[ 0 ]).toBe('A');

        builder.value.title = 'CHANGED VIA PROXY';
        val                 = builder.getValue();
        expect(val.title).toBe('CHANGED VIA PROXY');
        expect(builder.value.title).toBe('CHANGED VIA PROXY');

        builder.value.nested.inside = 'INSIDE CHANGED VIA PROXY';
        val                         = builder.getValue();
        expect(val.nested.inside).toBe('INSIDE CHANGED VIA PROXY');
        expect(builder.value.nested.inside).toBe('INSIDE CHANGED VIA PROXY');

        d();
    });

    it('Proxy test DEEP object', async (d) => {
        let val;
        const builder: JsfBuilder<MyValueInterface> = await JsfBuilder.create({ ...doc, } as any);
        builder.value.a.b.c.d                       = 'DEEP';
        val                                         = builder.getValue();
        expect(val.a.b.c.d).toBe('DEEP');
        expect(builder.value.a.b.c.d).toBe('DEEP');
        d();
    });

    it('Proxy test ARRAY', async (d) => {
        let val;
        const builder: JsfBuilder<MyValueInterface> = await JsfBuilder.create({ ...doc, } as any);

        builder.value.list[ 0 ] = 'ITEM CHANGED VIA PROXY';
        val                     = builder.getValue();
        expect(val.list[ 0 ]).toBe('ITEM CHANGED VIA PROXY');
        expect(builder.value.list[ 0 ]).toBe('ITEM CHANGED VIA PROXY');


        d();
    });

    it('Proxy test ARRAY + OBJECT', async (d) => {
        let val;
        const builder: JsfBuilder<MyValueInterface> = await JsfBuilder.create({ ...doc, } as any);

        builder.value.listNested = [];
        val                      = builder.getValue();
        expect(val.listNested).toEqual([]);
        expect(JSON.parse(JSON.stringify(val.listNested))).toEqual([]);

        builder.value.listNested = [{ a: {} }, { a: { b: null } }];
        val                      = builder.getValue();

        expect(JSON.parse(JSON.stringify(val.listNested[ 1 ])).a.b).toBe(null);
        expect(val.listNested[ 1 ].a.b).toBe(null);

        val.listNested[ 1 ].a.b = 'CCC';
        expect(val.listNested[ 1 ].a.b).toBe('CCC');

        d();
    });
});
