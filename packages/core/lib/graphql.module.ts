import { NgModule, ModuleWithProviders, Type } from "@nger/core";
import { SchemaBuilder } from "./core";
import { resolvers } from "./handlers/resolver";
import { DevSchemaBuilder } from "./devSchemaBuilder";
import { VersionController } from "./version.controller";
export interface ServerCloud {
  name: string;
  url: string;
}
@NgModule({
  providers: [
    ...resolvers,
    {
      provide: SchemaBuilder,
      useClass: DevSchemaBuilder
    }
  ],
  controllers: [
    VersionController
  ]
})
export class GraphqlModule {
  static forRoot(cls: Type<SchemaBuilder>): ModuleWithProviders {
    return {
      ngModule: GraphqlModule,
      providers: [
        {
          provide: SchemaBuilder,
          useClass: cls
        }
      ]
    };
  }
}
