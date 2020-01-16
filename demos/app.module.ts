import { NgModule } from '@nger/core'
import { DemoModule } from './demo.module';
import { GraphqlModule } from '../packages/core/lib/index';
import { ServerModule } from '@nger/server'
@NgModule({
    imports: [
        ServerModule,
        GraphqlModule,
        DemoModule
    ],
    providers: []
})
export class AppModule {

}