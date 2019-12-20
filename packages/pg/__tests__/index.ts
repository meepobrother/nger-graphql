import { PgGraphqlModule } from '../lib'
import { platformNode } from '@nger/platform.node'
const platform = platformNode([])
platform.bootstrapModule(PgGraphqlModule)
    .then(res => {
        debugger;
    })