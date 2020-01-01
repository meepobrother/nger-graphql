import { Module, Injector, InjectionToken } from '@nger/core'
import { APOLLO, SchemaBuilder } from '@nger/graphql'
import { ApolloServer } from 'apollo-server-express'
import express, { Application } from 'express'
export const EXPRESS = new InjectionToken<Application>(`EXPRESS`)
import { SERVER_LISTENER } from '@nger/server'
@Module({
    providers: [
        {
            provide: APOLLO,
            useFactory: async (injector: Injector) => {
                const builder = injector.get(SchemaBuilder)
                const schema = await builder.buildSchema();
                const apollo = new ApolloServer({
                    schema,
                    playground: true
                });
                const app = injector.get<any>(EXPRESS)
                apollo.applyMiddleware({ app })
                return apollo;
            },
            deps: [Injector]
        }, {
            provide: SERVER_LISTENER,
            useExisting: EXPRESS
        },
        {
            provide: EXPRESS,
            useFactory: () => {
                return express();
            },
            deps: []
        }
    ]
})
export class ApolloExpressModule { }
