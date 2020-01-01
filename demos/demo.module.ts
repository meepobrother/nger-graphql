import { Module } from "@nger/core";
import { DemoController } from "./demo.controller";
import { ServerModule } from '@nger/server'
@Module({
    controllers: [
        DemoController
    ],
    imports: [
        ServerModule,
        
    ]
})
export class DemoModule { }
