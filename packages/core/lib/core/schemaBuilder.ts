import { GraphQLSchema, DocumentNode } from 'graphql';
export abstract class SchemaBuilder {
    abstract buildSchema(): Promise<GraphQLSchema>;
    abstract buildRoot<T>(): Promise<T>;
    abstract buildContext<T>(): Promise<T>;
    abstract buildApollo<T>(): Promise<T>;
    abstract buildDocument(): Promise<DocumentNode>;
}
