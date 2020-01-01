import { corePlatform } from '@nger/core'
import { AppModule } from './app.module'
import { SERVER } from '@nger/server'
import { APOLLO } from './token'
corePlatform()
    .bootstrapModule(AppModule).then(async res => {
        const apollo = await res.get(APOLLO)
        const server = res.get(SERVER)
        apollo.installSubscriptionHandlers(server)
        server.listen(4200,()=>{
            console.log(`hello word`)
        });
    });
