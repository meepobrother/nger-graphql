import { MUTATION_RESOLVER, SOURCE, INFO, ARGS, CONTEXT } from "../tokens";
import { IFieldResolver, MergeInfo } from "../types";
import { MutationMetadataKey, MutationOptions } from "../../decorators";
import { StaticProvider, Injector, InjectionToken } from "@nger/di";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { GraphQLResolveInfo } from "graphql";

export const mutationProvicer: StaticProvider = {
  provide: MutationMetadataKey,
  useValue: handler
};

function handler(
  injector: Injector,
  it: IMethodDecorator<any, MutationOptions>,
  parent: IClassDecorator,
  path: string
) {
  const options = it.options;
  if (options) {
    const instance = injector.get(it.type);
    const handler = instance[it.property];
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
      injector.setStatic([
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
      return handler();
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
