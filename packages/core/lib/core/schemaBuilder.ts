import { GraphQLSchema } from 'graphql';
export abstract class SchemaBuilder {
    abstract buildSchema(): GraphQLSchema;
    abstract buildRoot<T>(): T;
}
