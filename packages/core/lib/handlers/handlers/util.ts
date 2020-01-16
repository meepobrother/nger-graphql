import { Injector, InjectFlags } from "@nger/core";
import { SOURCE, INFO, ARGS, CONTEXT, REQ, RES, RESOLVE_TREE, AUTHENTICATION, AUTHENTICATION_FILTER } from "../tokens";
import { PubSub } from 'graphql-subscriptions'
import { parseResolveInfo } from 'graphql-parse-resolve-info';
export function createInjector(injector: Injector, source: any, info: any, args: any, context: any) {
    const filter = injector.get(AUTHENTICATION_FILTER, null, InjectFlags.Optional)
    const auth = injector.get(AUTHENTICATION, null, InjectFlags.Optional)
    let _injector = injector.create([
        {
            provide: SOURCE,
            useValue: source
        },
        {
            provide: INFO,
            useValue: info
        },
        {
            provide: RESOLVE_TREE,
            useFactory: () => {
                return parseResolveInfo(info)
            }
        },
        {
            provide: ARGS,
            useValue: args
        },
        {
            provide: CONTEXT,
            useValue: context
        },
        {
            provide: REQ,
            useValue: context.req
        },
        {
            provide: RES,
            useValue: context.res
        },
        {
            provide: PubSub,
            useValue: context.pubsub
        }
    ], 'graphql');
    if (filter) _injector = filter(_injector)
    if (auth) auth(_injector)
    return _injector;
}

import { $$asyncIterator } from 'iterall';

type AsyncIterator<T> = {
    next(value?: any): Promise<IteratorResult<T>>;
    return(): any;
    throw(error: any): any;
};

export const createAsyncIterator = async <T = any>(
    lazyFactory: Promise<AsyncIterator<T>>,
    filterFn: Function,
): Promise<AsyncIterator<T>> => {
    const asyncIterator = await lazyFactory;
    const getNextValue = async () => {
        if (!asyncIterator || typeof asyncIterator.next !== 'function') {
            return Promise.reject(asyncIterator);
        }
        const payload = await asyncIterator.next();
        if (payload.done === true) {
            return payload;
        }
        return Promise.resolve(filterFn(payload.value))
            .catch(() => false)
            .then(result => (result ? payload : getNextValue()));
    };

    return {
        next() {
            return getNextValue();
        },
        return() {
            const isAsyncIterator =
                asyncIterator && typeof asyncIterator.return === 'function';
            return isAsyncIterator
                ? asyncIterator.return()
                : Promise.resolve({
                    done: true,
                    value: asyncIterator,
                });
        },
        throw(error: any) {
            return asyncIterator.throw(error);
        },
        [$$asyncIterator]() {
            return this;
        },
    } as any;
};