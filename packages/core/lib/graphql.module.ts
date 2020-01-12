import { NgModule, ModuleWithProviders, Type, Injector } from "@nger/core";
import { SchemaBuilder } from "./core";
import { resolvers } from "./handlers/resolver";
import { DevSchemaBuilder } from "./devSchemaBuilder";
import { GraphqlService } from "./graphql.service";
import { AnyScalar, BigIntScalar, DateScalar, EmailScalar, Ipv4Scalar, Ipv6Scalar, MobileScalar, ObjectScalar, URLScalar } from "./scalars";
export interface ServerCloud {
  name: string;
  url: string;
}
@NgModule({
  providers: [
    ...resolvers,
    GraphqlService,
    {
      provide: SchemaBuilder,
      useClass: DevSchemaBuilder,
      deps: [Injector]
    }
  ],
  controllers: [
    AnyScalar,
    BigIntScalar,
    DateScalar,
    EmailScalar,
    Ipv4Scalar,
    Ipv6Scalar,
    MobileScalar,
    ObjectScalar,
    URLScalar
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
