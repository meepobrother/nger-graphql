import { Injectable, Injector } from '@nger/core';
import { graphql, DocumentNode, GraphQLResolveInfo, GraphQLScalarType, GraphQLIsTypeOfFn, GraphQLTypeResolver, GraphQLSchema, ExecutionResult } from 'graphql';
import { SchemaBuilder } from './core';
interface KeyValue {
    [key: string]: any;
}
export type Operation = 'query' | 'mutation' | 'subscription';
export type Result = ExecutionResult & {
    extensions?: Record<string, any>;
};
export declare type Request = {
    document: DocumentNode;
    variables: Record<string, any>;
    extensions?: Record<string, any>;
};
export type Transform = {
    transformSchema?: (schema: GraphQLSchema) => GraphQLSchema;
    transformRequest?: (originalRequest: Request) => Request;
    transformResult?: (result: Result) => Result;
};
export interface IGraphQLToolsResolveInfo extends GraphQLResolveInfo {
    mergeInfo?: MergeInfo;
}
export interface IDelegateToSchemaOptions {
    schema: GraphQLSchema;
    operation: Operation;
    fieldName: string;
    args?: {
        [key: string]: any;
    };
    context: Injector;
    info: IGraphQLToolsResolveInfo;
    transforms?: Array<Transform>;
    skipValidation?: boolean;
}
export type MergeInfo = {
    delegate: (type: Operation, fieldName: string, args: KeyValue, context: KeyValue, info: GraphQLResolveInfo, transforms?: Array<Transform>) => any;
    delegateToSchema(options: IDelegateToSchemaOptions): any;
    fragments: Array<{
        field: string;
        fragment: string;
    }>;
};
export type IFieldResolver<TSource, TContext, TArgs = Record<string, any>> = (source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo & {
    mergeInfo: MergeInfo;
}) => any;
export interface IResolverOptions<TSource = any, TContext = any, TArgs = any> {
    fragment?: string;
    resolve?: IFieldResolver<TSource, TContext, TArgs>;
    subscribe?: IFieldResolver<TSource, TContext, TArgs>;
    __resolveType?: GraphQLTypeResolver<TSource, TContext>;
    __isTypeOf?: GraphQLIsTypeOfFn<TSource, TContext>;
}
export type IResolverObject<TSource = any, TContext = any, TArgs = any> = {
    [key: string]: IFieldResolver<TSource, TContext, TArgs> | IResolverOptions<TSource, TContext> | IResolverObject<TSource, TContext>;
};
export declare type IEnumResolver = {
    [key: string]: string | number;
};
export interface IResolvers<TSource = any, TContext = any> {
    [key: string]: (() => any) | IResolverObject<TSource, TContext> | IResolverOptions<TSource, TContext> | GraphQLScalarType | IEnumResolver;
}
@Injectable()
export class GraphqlService {
    constructor(private schemaBuilder: SchemaBuilder, private injector: Injector) { }
    run(query: string, variables: any = {}, operationName?: string | null) {
        const schema = this.schemaBuilder.buildSchema();
        return graphql({
            schema,
            source: query,
            rootValue: this.schemaBuilder.buildRoot(),
            contextValue: this.injector,
            variableValues: variables,
            operationName: operationName
        });
    }
}