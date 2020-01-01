import { Module, Injector } from '@nger/core'
import { DemoModule } from './demo.module';
import express from 'express'
import { SERVER_LISTENER } from '@nger/server'
import { ApolloServer } from 'apollo-server-express'
import { SchemaBuilder } from '@nger/graphql';
import { APOLLO, EXPRESS } from '@nger/graphql';
import { GraphqlModule } from '@nger/graphql';
import { join } from 'path';
@Module({
    imports: [
        DemoModule,
        GraphqlModule.forRoot(join(__dirname, 'main.ts'))
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
        deps: []
    }]
})
export class AppModule {

}