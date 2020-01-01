import { PgGraphqlModule } from '@nger/graphql-pg'
import { corePlatform } from '@nger/core'
import { } from 'postgraphile-core'
import { Module } from '@nger/core'
import { SchemaBuilder } from '@nger/graphql'
import { ApolloServer } from 'apollo-server'
@Module({
    imports: [
        PgGraphqlModule.forFeature({
            name: 'default',
            uuidExtension: 'pgcrypto',
            database: `zp`,
            entities: [],
            schema: 'public',
            replication: {
                master: {
                    host: `193.112.55.191`,
                    port: 5432,
                    username: `magnus`,
                    password: `magnus`
                }
            }
        })
    ]
})
export class AppModule { }
const platform = corePlatform([])
platform.bootstrapModule(AppModule)
    .then(async res => {
        const ref = res.getModuleRef(PgGraphqlModule)!
        const builder = ref!.get(SchemaBuilder)
        const schema = await builder.buildSchema();
        const apollo = new ApolloServer({
            schema,
            context: builder.buildContext()
        })
        apollo.listen().then(({ url }) => {
            console.log(url)
        })
    })