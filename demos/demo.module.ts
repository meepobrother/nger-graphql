import { NgModule } from "@nger/core";
import { DemoController } from "./demo.controller";
import { DemoScalar } from "./demo.scalar";
@NgModule({
    controllers: [
        DemoController,
        DemoScalar
    ]
})
export class DemoModule { }
