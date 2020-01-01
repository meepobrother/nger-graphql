import { NgModule, ModuleWithProviders, Type, APP_INITIALIZER, Injector, Config } from "@nger/core";
import { SchemaBuilder } from "./core";
import { resolvers } from "./handlers/resolver";
import { MAIN_PATH, APOLLO } from './tokens';
import { ServerWsModule } from '@nger/server-ws';
import { ServerModule, SERVER } from '@nger/server';
import { DevSchemaBuilder } from "./devSchemaBuilder";
@NgModule({
  providers: [...resolvers, {
    provide: APP_INITIALIZER,
    useFactory: (res: Injector) => {
      return async () => {
        const config = res.get(Config)
        const apollo = await res.get(APOLLO)
        const server = res.get(SERVER)
        apollo.installSubscriptionHandlers(server)
        const port = config.get(`PORT`, 9000);
        server.listen(port, '0.0.0.0', () => {
          console.log(`http://0.0.0.0:${port}/graphql`)
        });
      }
    },
    deps: [Injector],
    multi: true
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
