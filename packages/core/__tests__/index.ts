import { expressPlatform } from '@nger/platform.express';
import { GraphqlModule } from '../lib'
expressPlatform([]).bootstrapModule(GraphqlModule).then(res => res.onInit()).then(res => {
    console.log(`res connection`)
});
