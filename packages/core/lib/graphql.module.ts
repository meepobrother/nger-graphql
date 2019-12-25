import { NgModule, ModuleWithProviders, Type } from '@nger/core'
import { GraphqlController } from './graphql.controller';
import { SchemaBuilder } from './core';
import { HttpModule } from '@nger/http';
import { HttpNodeModule } from '@nger/http-node';

@NgModule({
    controllers: [GraphqlController],
    imports: [
        HttpModule,
        HttpNodeModule
    ]
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
