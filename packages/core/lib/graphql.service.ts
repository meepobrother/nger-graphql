import { Injectable, Injector } from '@nger/core';
import { buildSchema, graphql } from 'graphql';
@Injectable()
export class GraphqlService {
    private _root: any;
    private _graphql: string;
    constructor(private injector: Injector) { }
    run(query: string, variables: any = {}, operationName?: string | null) {
        const schema = buildSchema(this.buildGraphql(), {
            commentDescriptions: true,
            assumeValidSDL: true
        });
        return graphql({
            schema,
            source: query,
            rootValue: this.buildRoot(),
            contextValue: {
                injector: this.injector
            },
            variableValues: variables,
            operationName: operationName
        });
    }
    buildGraphql(): string {
        if (this._graphql) {
            return this._graphql;
        }
        this._graphql = `type Query {
            username: String
            age: Int!
        }`;
        return this._graphql;
    }
    buildRoot() {
        if (this._root) {
            return this._root
        }
        this._root = {
            username: () => {
                return '李华'
            },
            age: () => {
                return Math.ceil(Math.random() * 100)
            }
        }
        return this._root;
    }
}