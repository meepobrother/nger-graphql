
import { Module, ModuleWithProviders, InjectionToken, Injector } from '@nger/core';
import { PgGraphql } from './pg_graphql';
import { PostgresOrmModule, PostgresConnectionOptions, CONNECTION_OPTION_TOKEN } from '@nger/orm-postgres';
import { GraphqlModule, SchemaBuilder, GraphqlService } from '@nger/graphql';
import { PgSchemaBuilder } from './schemaBuilder';
import { AppendPluginsToken } from './token';
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
@Module({
    imports: [
        PostgresOrmModule,
        GraphqlModule
    ],
    providers: [
        {
            provide: AppendPluginsToken,
            useValue: ConnectionFilterPlugin,
            multi: true
        },
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
                provide: CONNECTION_OPTION_TOKEN,
                useValue: options
            }]
        }
    }
}