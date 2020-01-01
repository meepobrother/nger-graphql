import { Module } from "@nger/core";
import { DemoController } from "./demo.controller";
import { GraphqlModule } from '@nger/graphql'
import { join } from 'path'
import { ServerModule } from '@nger/server'
@Module({
    controllers: [
        DemoController
    ],
    imports: [
        ServerModule,
        GraphqlModule.forRoot(join(__dirname, 'main.ts'))
    ]
})
export class DemoModule { }
