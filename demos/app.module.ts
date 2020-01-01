import { Module, Injector } from '@nger/core'
import { DemoModule } from './demo.module';
import { SERVER_WS_OPTIONS } from '@nger/server-ws'
import express from 'express'
import { SERVER_LISTENER } from '@nger/server'
import { ApolloServer } from 'apollo-server-express'
import { SchemaBuilder } from '@nger/graphql';
import { APOLLO, EXPRESS } from './token'
@Module({
    imports: [
        DemoModule
    ],
    providers: [{
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
        deps: []   },
    {
        provide: SERVER_WS_OPTIONS,
        useValue: {
            path: '/graphql'
        }
    }
    ]
})
export class AppModule {

}