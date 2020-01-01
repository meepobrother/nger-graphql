import { NgModule, ModuleWithProviders, Type, Injector } from "@nger/core";
import { SchemaBuilder } from "./core";
import { resolvers } from "./handlers/resolver";
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { GRAPHQL_SUBSCRIPTION_SERVER, MAIN_PATH } from './tokens'
import { SERVER_WS, ServerWsModule } from '@nger/server-ws'
import { ServerModule } from '@nger/server'

import { DevSchemaBuilder } from "./devSchemaBuilder";
@NgModule({
  providers: [...resolvers, {
    provide: GRAPHQL_SUBSCRIPTION_SERVER,
    useFactory: async (injector: Injector) => {
      const wsServer = injector.get(SERVER_WS)
      const builder = injector.get(SchemaBuilder)
      const schema = await builder.buildSchema();
      return SubscriptionServer.create({
        schema,
        execute,
        subscribe
      }, wsServer)
    },
    deps: [Injector]
  }],
  imports: [
    ServerModule,
    ServerWsModule
  ]
})
export class GraphqlModule {
  static forRoot(main: string): ModuleWithProviders {
    return {
      ngModule: GraphqlModule,
      providers: [{
        provide: MAIN_PATH,
        useValue: main
      }, {
        provide: SchemaBuilder,
        useClass: DevSchemaBuilder
      }]
    }
  }
  /**
   * 远程
   */
  static forCloud(): ModuleWithProviders {
    return {
      ngModule: GraphqlModule,
      providers: []
    }
  }
  static forSchemaBuilder(cls: Type<SchemaBuilder>): ModuleWithProviders {
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
