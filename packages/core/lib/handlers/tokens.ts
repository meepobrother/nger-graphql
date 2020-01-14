import {
  IFieldResolver,
  IResolverOptions,
  IResolverObject
} from "./types";
import { InjectionToken } from "@nger/di";
import { GraphQLScalarType } from "graphql";
import { DirectiveResolverFn } from "graphql-tools";
export const OBJECT_RESOLVER = new InjectionToken<
  { path: string; handler: IResolverObject<any, any, any> }[]
>(`@nger/graphql OBJECT_RESOLVER`);
export const QUERY_RESOLVER = new InjectionToken<
  { path: string; handler: IFieldResolver<any, any, any> }[]
>(`@nger/graphql QUERY_RESOLVER`);
export const MUTATION_RESOLVER = new InjectionToken<
  { path: string; handler: IFieldResolver<any, any, any> }[]
>(`@nger/graphql MUTATION_RESOLVER`);
export const SUBSCRIPTION_RESOLVER = new InjectionToken<
  { path: string; handler: IResolverOptions<any, any, any> }[]
>(`@nger/graphql SUBSCRIPTION_RESOLVER`);
export const SCALAR_RESOLVER = new InjectionToken<GraphQLScalarType[]>(
  `@nger/graphql SCALAR_RESOLVER`
);
export const DIRECTIVE_RESOLVER = new InjectionToken<
  {
    path: string;
    handler: DirectiveResolverFn<any, any>;
  }[]
>(`@nger/graphql DIRECTIVE_RESOLVER`);

export const RESOLVER = new InjectionToken<{
  resolvers: any;
  directiveResolvers: any;
}>(`@nger/graphql RESOLVER`);
export const SOURCE = new InjectionToken(`@nger/graphql SOURCE`);
export const INFO = new InjectionToken(`@nger/graphql INFO`);
export const CONTEXT = new InjectionToken(`@nger/graphql CONTEXT`);
export const ARGS = new InjectionToken<any>(`@nger/graphql ARGS`);
