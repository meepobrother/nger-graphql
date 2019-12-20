
import { Module, ModuleWithProviders, InjectionToken, Injector } from '@nger/core';
import { PgGraphql } from './pg_graphql';
import { PostgresOrmModule, PostgresConnectionOptions, POSTGRES_OPTIONS } from '@nger/orm.postgres';
import { GraphqlModule, SchemaBuilder, GraphqlService } from '@nger/graphql';
import { PgSchemaBuilder } from './schemaBuilder';

@Module({
    imports: [
        PostgresOrmModule,
        GraphqlModule
    ],
    providers: [
        {
            provide: GraphqlService,
            useClass: PgGraphql,
            deps: [Injector]
        },
        {
            provide: SchemaBuilder,
            useClass: PgSchemaBuilder,
            deps: [Injector]
        }
    ]
})
export class PgGraphqlModule {
    static forFeature(options: PostgresConnectionOptions | InjectionToken<PostgresConnectionOptions>): ModuleWithProviders {
        return {
            ngModule: PgGraphqlModule,
            providers: [{
                provide: POSTGRES_OPTIONS,
                useValue: options
            }]
        }
    }
}