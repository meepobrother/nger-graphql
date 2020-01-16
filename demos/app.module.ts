import { NgModule } from '@nger/core'
import { DemoModule } from './demo.module';
import { GraphqlModule } from '../packages/core/lib/index';
@NgModule({
    imports: [
        GraphqlModule,
        DemoModule
    ],
    providers: []
})
export class AppModule {

}