import { NestFactory } from '@nestjs/core'
import { Module } from '@nestjs/common';
import { GraphQLModule } from '../lib';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { HttpAdapterHost } from '@nestjs/core';
import { setContext } from 'apollo-link-context';
import { makeRemoteExecutableSchema, introspectSchema, mergeSchemas } from 'graphql-tools';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
@Module({
    imports: [
        GraphQLModule.forRootAsync({
            useFactory: async (http: HttpAdapterHost) => {
                const link = new HttpLink({ uri: 'http://localhost:9001/graphql', fetch: fetch as any });
                const wapperLink = setContext((req, previousContext) => {
                    console.log({
                        context: previousContext.graphqlContext
                    })
                    return {
                        auth: previousContext.graphqlContext && previousContext.graphqlContext.auth,
                        body: previousContext.graphqlContext && previousContext.graphqlContext.body
                    }
                }).concat(link)
                const schema = await introspectSchema(wapperLink);
                const remoteSchema = makeRemoteExecutableSchema({
                    schema,
                    link: wapperLink
                });
                return {
                    schema: mergeSchemas({
                        schemas: [
                            remoteSchema
                        ]
                    }),
                    context: ({ req, body, auth }) => {
                        return {
                            auth: auth || req.headers.auth,
                            body: body || req.body
                        }
                    }
                };
            },
            inject: [HttpAdapterHost]
        })
    ]
})
export class AppModule { }
export async function bootstrap() {
    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.listen(9000, `0.0.0.0`, () => {
        console.log(`http://0.0.0.0:9000`)
    })
}
bootstrap();
