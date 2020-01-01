import { Injector } from "@nger/di";
import {
  RESOLVER,
  QUERY_RESOLVER,
  MUTATION_RESOLVER,
  SUBSCRIPTION_RESOLVER,
  SCALAR_RESOLVER,
  DIRECTIVE_RESOLVER,
  OBJECT_RESOLVER
} from "./tokens";
import { StaticProvider } from "@nger/di";
import { handlers } from "./handlers";
export const resolvers: StaticProvider[] = [
  ...handlers,
  {
    provide: RESOLVER,
    useFactory: (injector: Injector) => {
      const query = injector.get(QUERY_RESOLVER, []);
      const mutation = injector.get(MUTATION_RESOLVER, []);
      const subscription = injector.get(SUBSCRIPTION_RESOLVER, []);
      const scalar = injector.get(SCALAR_RESOLVER, []);
      const directive = injector.get(DIRECTIVE_RESOLVER, []);
      const objects = injector.get(OBJECT_RESOLVER, []);
      const resolvers = {};
      const directiveResolvers = {};
      if (scalar.length > 0) {
        scalar.map(s => Reflect.set(resolvers, s.name, s));
      }
      if (objects.length > 0) {
        objects.map(o => Reflect.set(resolvers, o.path, o.handler));
      }
      if (directive.length > 0) {
        directive.map(d => Reflect.set(directiveResolvers, d.path, d.handler));
      }
      if (query.length > 0) {
        const Query = {};
        query.map(it => {
          Reflect.set(Query, it.path, it.handler);
        });
        Reflect.set(resolvers, "Query", Query);
      }
      if (mutation.length > 0) {
        const Mutation = {};
        mutation.map(it => {
          Reflect.set(Mutation, it.path, it.handler);
        });
        Reflect.set(resolvers, "Mutation", Mutation);
      }
      if (subscription.length > 0) {
        const Subscription = {};
        subscription.map(it => {
          Reflect.set(Subscription, it.path, it.handler);
        });
        Reflect.set(resolvers, "Subscription", Subscription);
      }
      return { resolvers, directiveResolvers };
    },
    deps: [Injector]
  }
];
