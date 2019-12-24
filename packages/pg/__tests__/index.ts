import { PgGraphqlModule } from '../lib'
import { corePlatform } from '@nger/core'
import { } from 'postgraphile-core'
import { Module } from '@nger/core'
import { SchemaBuilder, GraphqlService } from '@nger/graphql'
@Module({
    imports: [
        PgGraphqlModule.forFeature({
            name: 'default',
            uuidExtension: 'pgcrypto',
            database: `zp`,
            entities: [],
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
        debugger;
        await builder.buildSchema();
        debugger;
    })