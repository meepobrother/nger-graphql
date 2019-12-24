import { SchemaBuilder } from "@nger/graphql";
export { sql } from 'graphile-build-pg';
import { graphql } from "graphql";
import { Injectable, Injector } from "@nger/core";

@Injectable()
export class PgGraphql {
    constructor(
        private schemaBuilder: SchemaBuilder
    ) { }
    async run(query: string, variables: any = {}) {
        const schema = await this.schemaBuilder.buildSchema();
        return graphql({
            schema,
            source: query,
            rootValue: await this.schemaBuilder.buildRoot(),
            contextValue: await this.schemaBuilder.buildContext(),
            variableValues: variables
        });
    }
}
