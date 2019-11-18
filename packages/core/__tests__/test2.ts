import { NestFactory } from '@nestjs/core'
import { Module } from '@nestjs/common';
import { GraphQLModule } from '../lib';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { HttpAdapterHost } from '@nestjs/core';
import Jwt from 'jsonwebtoken';
import { makeRemoteExecutableSchema, introspectSchema, mergeSchemas } from 'graphql-tools';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
const link = new HttpLink({ uri: 'http://localhost:3002/graphql', fetch: fetch as any });
@Module({
    imports: [
        GraphQLModule.forRootAsync({
            useFactory: async (http: HttpAdapterHost) => {
                const schema = await introspectSchema(link);
                const remoteSchema = makeRemoteExecutableSchema({
                    schema,
                    link
                });
                return {
                    schema: mergeSchemas({
                        schemas: [
                            remoteSchema
                        ]
                    }),
                    context: (res) => {
                        console.log({
                            res
                        })
                        return res
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
    app.listen(9001, `0.0.0.0`, () => {
        console.log(`http://0.0.0.0:9001`)
    })
}
bootstrap();
