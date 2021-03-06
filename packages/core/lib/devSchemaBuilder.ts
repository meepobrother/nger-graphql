import { SchemaBuilder } from "./core";
import { Injector, isDevMode, Injectable, MAIN_PATH } from '@nger/core';
import { RESOLVER } from './handlers/tokens'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { DocumentNode, parse, GraphQLSchema } from "graphql";
import { extname, join, dirname } from 'path'
import { buildFederatedSchema } from '@apollo/federation'
import { PubSub } from 'graphql-subscriptions'
export function getTsconfig(path: string) {
    const dir = join(path, 'tsconfig.json')
    if (existsSync(dir) || existsSync(join(path, 'package.json'))) return dir;
    return getTsconfig(join(path, '..'))
}
@Injectable()
export class DevSchemaBuilder extends SchemaBuilder {
    private _schema: GraphQLSchema;
    private _node: DocumentNode;
    constructor(private injector: Injector) {
        super();
    }
    async buildDocument(): Promise<DocumentNode> {
        if(this._node) return this._node;
        const path = this.injector.get<string>(MAIN_PATH)
        const ext = extname(path)
        const graphqlPath = path.replace(ext, '.graphql')
        let ast: DocumentNode;
        if (isDevMode()) {
            const graphql = await import('@nger/ast.ts-graphql').then(res => res.toGraphql(path, getTsconfig(dirname(path))));
            writeFileSync(graphqlPath, graphql)
            ast = parse(graphql)
        } else {
            ast = parse(readFileSync(graphqlPath).toString('utf8'))
        }
        this._node = ast;
        return this._node;
    }
    async buildSchema(): Promise<GraphQLSchema> {
        if (this._schema) return this._schema;
        const ast = await this.buildDocument();
        const resolver = this.injector.get(RESOLVER)
        this._schema = buildFederatedSchema([{
            typeDefs: ast,
            resolvers: resolver
        }]);
        return this._schema;
    }
    async buildRoot<T>(): Promise<T> {
        return undefined;
    }
    async buildContext(): Promise<any> {
        return ({ req, res }) => {
            return {
                req, res, pubsub: new PubSub()
            }
        }
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