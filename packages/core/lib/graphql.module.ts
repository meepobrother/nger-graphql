import { NgModule, ModuleWithProviders, Type } from "@nger/core";
import { GraphqlController } from "./graphql.controller";
import { SchemaBuilder } from "./core";
import { HttpModule } from "@nger/http";
import { HttpNodeModule } from "@nger/http-node";
import { resolvers } from "./handlers/resolver";
@NgModule({
  controllers: [GraphqlController],
  providers: [...resolvers],
  imports: [HttpModule, HttpNodeModule]
})
export class GraphqlModule {
  static forFeature(cls: Type<SchemaBuilder>): ModuleWithProviders {
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
