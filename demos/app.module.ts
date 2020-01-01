import { NgModule } from '@nger/core'
import { DemoModule } from './demo.module';
import { GraphqlModule } from '@nger/graphql';
import { join } from 'path';
import { ApolloExpressModule } from '@nger/apollo-express'
import { ServerModule } from '@nger/server'
@NgModule({
    imports: [
        ServerModule,
        ApolloExpressModule,
        GraphqlModule.forRoot(join(__dirname, 'main.ts')),
        DemoModule
    ],
    providers: []
})
export class AppModule {

}