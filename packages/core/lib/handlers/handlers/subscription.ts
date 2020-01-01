import { SUBSCRIPTION_RESOLVER, SOURCE, INFO, ARGS, CONTEXT } from "../tokens";
import { MergeInfo, IResolverOptions } from "../types";
import { SubscriptionMetadataKey, SubscriptionOptions } from "../../decorators";

import { StaticProvider, Injector, InjectionToken, NgerRef } from "@nger/di";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { GraphQLResolveInfo } from "graphql";
import { ControllerOptions } from "@nger/core";

export const subscriptionProvicer: StaticProvider = {
  provide: SubscriptionMetadataKey,
  useValue: handler
};

function handler(
  injector: Injector,
  it: IMethodDecorator<any, SubscriptionOptions>,
  ctrl: IClassDecorator<any, ControllerOptions>,
  nger: NgerRef<any>
) {
  const options = it.options;
  if (options) {

    let path = options.path;
    if (options.path instanceof InjectionToken) {
      path = injector.get(options.path);
    }
    const root = injector.getInjector("root");
    const resolver: IResolverOptions<any, any, any> = {
      subscribe: (
        source: any,
        args: any,
        context: any,
        info: GraphQLResolveInfo & {
          mergeInfo: MergeInfo;
        }
      ) => {
        const _injector = injector.create([
          {
            provide: SOURCE,
            useValue: source
          },
          {
            provide: INFO,
            useValue: info
          },
          {
            provide: ARGS,
            useValue: args
          },
          {
            provide: CONTEXT,
            useValue: context
          }
        ]);
        return nger.create(_injector)[it.property]()
      }
    };
    root.setStatic([
      {
        provide: SUBSCRIPTION_RESOLVER,
        useValue: {
          path,
          handler: resolver
        },
        multi: true
      }
    ]);
  }
}
