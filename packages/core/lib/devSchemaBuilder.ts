import { SchemaBuilder } from "./core";
import { Injector, isDevMode, Injectable } from '@nger/core';
import { MAIN_PATH } from "./tokens";
import { RESOLVER } from './handlers/tokens'
import { readFileSync, writeFileSync } from 'fs'
import { DocumentNode, parse } from "graphql";
import { makeExecutableSchema } from 'graphql-tools'
@Injectable()
export class DevSchemaBuilder extends SchemaBuilder {
    constructor(private injector: Injector) {
        super();
    }
    async buildSchema(): Promise<import("graphql").GraphQLSchema> {
        const path = this.injector.get(MAIN_PATH)
        let ast: DocumentNode | undefined = undefined;
        if (isDevMode) {
            const graphql = await import('@nger/ast.ts-graphql').then(res => res.toGraphql(path));
            writeFileSync(path + '.graphql', graphql)
            ast = parse(graphql)
        } else {
            ast = parse(readFileSync(path + '.graphql').toString('utf8'))
        }
        const resolver = this.injector.get(RESOLVER)
        return makeExecutableSchema({
            typeDefs: [ast],
            ...resolver
        });
    }
    async buildRoot<T>(): Promise<T> {
        return undefined;
    }
    async buildContext<T>(): Promise<T> {
        return {
            injector: this.injector
        } as any
    }
    async buildApollo<T>(): Promise<T> {
        return {
            schema: await this.buildSchema(),
            playground: true,
            context: await this.buildContext(),
            subscriptions: true
        } as any;
    }
}