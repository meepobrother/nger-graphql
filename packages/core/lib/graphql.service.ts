import { Injectable, Injector } from '@nger/core';
import { graphql } from 'graphql';
import { SchemaBuilder } from './core';

@Injectable()
export class GraphqlService {
    constructor(private schemaBuilder: SchemaBuilder, private injector: Injector) { }
    async run(query: string, variables: any = {}) {
        const schema = await this.schemaBuilder.buildSchema();
        return graphql({
            schema,
            source: query,
            rootValue: await this.schemaBuilder.buildRoot(),
            contextValue: this.injector,
            variableValues: variables
        });
    }
}