import { SchemaBuilder } from "./core";
import { Injector, isDevMode, Injectable } from '@nger/core';
import { MAIN_PATH } from "./tokens";
import { RESOLVER } from './handlers/tokens'
import { readFileSync, writeFileSync } from 'fs'
import { DocumentNode, parse, GraphQLSchema } from "graphql";
import { makeExecutableSchema } from 'graphql-tools'
import { extname } from 'path'

@Injectable()
export class DevSchemaBuilder extends SchemaBuilder {
    constructor(private injector: Injector) {
        super();
    }
    async buildSchema(): Promise<GraphQLSchema> {
        const path = this.injector.get(MAIN_PATH)
        const ext = extname(path)
        const graphqlPath = path.replace(ext, '.graphql')
        let ast: DocumentNode | undefined = undefined;
        if (isDevMode) {
            const graphql = await import('@nger/ast.ts-graphql').then(res => res.toGraphql(path));
            writeFileSync(graphqlPath, graphql)
            ast = parse(graphql)
        } else {
            ast = parse(readFileSync(graphqlPath).toString('utf8'))
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
    async buildContext(): Promise<any> {
        return ({ req, res }) => ({
            req, res
        })
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