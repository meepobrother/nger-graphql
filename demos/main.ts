import { corePlatform, MAIN_PATH, setDevMode } from '@nger/core'
import { AppModule } from './app.module'
import { SchemaBuilder } from '../packages/core/lib';
import { ApolloServer } from 'apollo-server'
setDevMode(true)
corePlatform([{
    provide: MAIN_PATH,
    useValue: __filename
}]).bootstrapModule(AppModule).then(async res => {
    const builder = res.get(SchemaBuilder)
    const schema = await builder.buildSchema();
    const options: any = {
        schema,
        context: await builder.buildContext(),
        cors: true,
        subscriptions: '/'
    }
    const apollo = new ApolloServer(options)
    apollo.listen(4001, '0.0.0.0').then(({ url }) => {
        console.log(url)
    })
})
