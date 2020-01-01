import { corePlatform, MAIN_PATH ,Module} from '@nger/core'
import { GraphqlModule } from './graphql.module'

corePlatform([{
    provide: MAIN_PATH,
    useValue: __filename
}]).bootstrapModule(GraphqlModule)