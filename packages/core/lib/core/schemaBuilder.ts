import { GraphQLSchema } from 'graphql';
export abstract class SchemaBuilder {
    abstract buildSchema(): Promise<GraphQLSchema>;
    abstract buildRoot<T>(): Promise<T>;
}
