import { InjectionToken } from "@nger/core";
import {
  createMethodDecorator,
  IMethodDecorator,
  createParameterDecorator,
  IParameterDecorator,
  createClassDecorator,
  IClassDecorator,
  createPropertyDecorator,
  IPropertyDecorator
} from "@nger/decorator";

export const DirectiveMetadataKey = `DirectiveMetadataKey`;
export interface DirectiveOptions {
  name: string | InjectionToken<string>;
}
export const Directive = createClassDecorator<
  DirectiveOptions | string | InjectionToken<string>
>(DirectiveMetadataKey);

export const ScalarMetadataKey = `ScalarMetadataKey`;
export interface ScalarOptions {
  name: string | InjectionToken<string>;
  description: string;
}
export const Scalar = createClassDecorator<
  ScalarOptions | string | InjectionToken<string>
>(ScalarMetadataKey);

export const QueryMetadataKey = `@nger/graphql QueryMetadataKey`;
export interface QueryOptions {
  path: string | InjectionToken<string>;
}
export const Query = createMethodDecorator<
  QueryOptions | string | InjectionToken<string>
>(QueryMetadataKey, handler);

export const MutationMetadataKey = `@nger/graphql MutationMetadataKey`;
export interface MutationOptions {
  path: string | InjectionToken<string>;
}
export const Mutation = createMethodDecorator<
  MutationOptions | string | InjectionToken<string>
>(MutationMetadataKey, handler);

export const SubscriptionMetadataKey = `@nger/graphql SubscriptionMetadataKey`;
export interface SubscriptionOptions {
  path: string | InjectionToken<string>;
}
export const Subscription = createMethodDecorator<
  SubscriptionOptions | string | InjectionToken<string>
>(SubscriptionMetadataKey, handler);

export const ArgsMetadataKey = `ArgsMetadataKey`;
export interface ArgsOptions {
  path: string | InjectionToken<string>;
}
export const Args = createParameterDecorator<
  ArgsOptions | string | InjectionToken<string>
>(ArgsMetadataKey, (it: IParameterDecorator<any, any>) => {
  const options = it.options;
  if (options instanceof InjectionToken || typeof options === "string") {
    it.options = {
      path: options
    };
  } else if (options) {
    it.options = {
      ...options
    };
  } else {
    it.options = {
      path: it.property as string
    };
  }
});
export interface ResolvePropertyOptions {
  path: string | InjectionToken<string>
}
export const ResolveProperty = createPropertyDecorator<ResolvePropertyOptions | string | InjectionToken<string>>(`@nger/graphql ResolveProperty`, (it: IPropertyDecorator<any, any>) => {
  const options = it.options;
  if (options instanceof InjectionToken || typeof options === "string") {
    it.options = {
      path: options
    };
  } else if (options) {
    it.options = {
      ...options
    };
  } else {
    it.options = {
      path: it.property as string
    };
  }
})

function handler(it: IMethodDecorator<any, any>) {
  const options = it.options;
  if (options instanceof InjectionToken || typeof options === "string") {
    it.options = {
      path: options
    };
  } else if (options) {
    it.options = {
      ...options
    };
  } else {
    it.options = {
      path: it.property as string
    };
  }
}
