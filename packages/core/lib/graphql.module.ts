import { NgModule, ModuleWithProviders, Type } from '@nger/core'
import { GraphqlController } from './graphql.controller';
import { SchemaBuilder } from './core';
@NgModule({
    controllers: [GraphqlController]
})
export class GraphqlModule {
    static forFeature(cls: Type<SchemaBuilder>): ModuleWithProviders {
        return {
            ngModule: GraphqlModule,
            providers: [{
                provide: SchemaBuilder,
                useClass: cls
            }]
        }
    }
}
