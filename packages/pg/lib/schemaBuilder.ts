import { SchemaBuilder } from "@nger/graphql";
import { GraphQLSchema } from 'graphql';
import { Driver } from "@nger/orm";
import { createPostGraphileSchema, PostGraphileCoreOptions } from "postgraphile-core";
import { Injector, Injectable } from "@nger/core";
import { AppendPluginsToken, PrependPluginsToken, SkipPluginsToken } from "./token";
@Injectable()
export class PgSchemaBuilder extends SchemaBuilder {
    _schema: GraphQLSchema;
    private driver: Driver;
    constructor(private injector: Injector) {
        super();
    }
    getOptions(): PostGraphileCoreOptions {
        const appendPlugins = this.injector.get(AppendPluginsToken, []);
        const prependPlugins = this.injector.get(PrependPluginsToken, []);
        const skipPlugins = this.injector.get(SkipPluginsToken, []);
        return {
            dynamicJson: true,
            enableTags: true,
            subscriptions: true,
            skipPlugins,
            prependPlugins,
            appendPlugins
        }
    }
    async buildSchema(): Promise<GraphQLSchema> {
        this.driver = this.injector.get(Driver)
        await this.driver.connect();
        if (this._schema) return this._schema;
        this._schema = await createPostGraphileSchema(
            this.driver.master,
            this.driver.options.schema!,
            this.getOptions()
        );
        return this._schema;
    }
    async buildRoot<T>(): Promise<T> {
        return undefined;
    }

    async buildContext() {
        return {
            pgClient: this.driver.master
        } as any
    }

    async buildApollo() {
        return {
            schema: await this.buildSchema(),
            playground: true,
            context: await this.buildContext(),
            subscriptions: true
        } as any;
    }
}
