import { QUERY_RESOLVER } from "../tokens";
import { IFieldResolver, MergeInfo } from "../types";
import { QueryMetadataKey, QueryOptions } from "../../decorators";

import { StaticProvider, Injector, InjectionToken, NgerRef } from "@nger/di";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { GraphQLResolveInfo } from "graphql";
import { ControllerOptions } from "@nger/core";
import { createInjector } from "./util";

export const queryProvicer: StaticProvider = {
  provide: QueryMetadataKey,
  useValue: handler
};

function handler(
  injector: Injector,
  it: IMethodDecorator<any, QueryOptions>,
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
    const resolver: IFieldResolver<any, any, any> = (
      source: any,
      args: any,
      context: any,
      info: GraphQLResolveInfo & {
        mergeInfo: MergeInfo;
      }
    ) => {
      const _injector = createInjector(injector, source, info, args, context)
      return nger.create(_injector)[it.property]()
    };
    root.setStatic([
      {
        provide: QUERY_RESOLVER,
        useValue: {
          path,
          handler: resolver
        },
        multi: true
      }
    ]);
  }
}
