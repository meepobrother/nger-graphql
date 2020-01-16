import { MUTATION_RESOLVER } from "../tokens";
import { IFieldResolver, MergeInfo } from "../types";
import { MutationMetadataKey, MutationOptions } from "../../decorators";
import { StaticProvider, Injector, InjectionToken } from "@nger/di";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { GraphQLResolveInfo } from "graphql";
import { ControllerOptions, NgerRef } from "@nger/core";
import { createInjector } from "./util";
export const mutationProvicer: StaticProvider = {
  provide: MutationMetadataKey,
  useValue: handler
};
function handler(
  injector: Injector,
  it: IMethodDecorator<any, MutationOptions>,
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
      const instance = nger.create(_injector)
      return instance[it.property]();
    };
    root.setStatic([
      {
        provide: MUTATION_RESOLVER,
        useValue: {
          path,
          handler: resolver
        },
        multi: true
      }
    ]);
  }
}
