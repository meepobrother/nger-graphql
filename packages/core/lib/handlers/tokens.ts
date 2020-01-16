import {
  IFieldResolver,
  IResolverOptions,
  IResolverObject
} from "./types";
import { ResolveTree, FieldsByTypeName } from 'graphql-parse-resolve-info'
import { InjectionToken, Injector } from "@nger/di";
import { GraphQLScalarType, GraphQLResolveInfo } from "graphql";
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

export const RESOLVER = new InjectionToken<any>(`@nger/graphql RESOLVER`);
export const SOURCE = new InjectionToken<any>(`@nger/graphql SOURCE`);
export const INFO = new InjectionToken<GraphQLResolveInfo>(`@nger/graphql INFO`);
export const RESOLVE_TREE = new InjectionToken<ResolveTree | FieldsByTypeName>(`@nger/graphql PARSE_INFO`)
export const CONTEXT = new InjectionToken(`@nger/graphql CONTEXT`);
export const ARGS = new InjectionToken<any>(`@nger/graphql ARGS`);
export const REQ = new InjectionToken<any>(`@nger/graphql REQ`)
export const RES = new InjectionToken<any>(`@nger/graphql RES`)

/**
 * 鉴别权限 没有权限抛401 forbidden
 */
export interface Authentication {
  (injector: Injector): void;
}
export const AUTHENTICATION = new InjectionToken<Authentication>(`@nger/graphql AUTHENTICATION`)
/**
 * 过滤器
 */
export interface AuthenticationFilter {
  (injector: Injector): Injector;
}
export const AUTHENTICATION_FILTER = new InjectionToken<AuthenticationFilter>(`@nger/graphql AUTHENTICATION`);
