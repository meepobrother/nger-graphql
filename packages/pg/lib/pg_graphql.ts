import { SchemaBuilder } from "@nger/graphql";
export { sql } from 'graphile-build-pg';
import { graphql, ExecutionResult, Source } from "graphql";
import pg from "pg";
import { Driver } from "@nger/orm";
import { Injectable, Injector } from "@nger/core";

@Injectable()
export class PgGraphql {
    private driver: Driver<pg.Pool>;
    constructor(
        private injector: Injector
    ) { }
    async query<T>(query: string | Source, variables: any = {}): Promise<ExecutionResult<T>> {
        const builder = this.injector.get(SchemaBuilder)
        return await graphql(
            await builder.buildSchema(),
            query,
            await builder.buildRoot(),
            {
                pgClient: this.driver.master,
                injector: this.injector
            },
            variables
        );
    }
}
