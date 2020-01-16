import { Controller } from "@nger/core";
import { Query, Subscription, Upload, File } from '../packages/core/lib/index'
import { PubSub } from 'graphql-subscriptions'
import { Mutation, Args } from "../packages/core/dist/@nger/graphql/lib";
const pubsub = new PubSub()
interface User {
    username: string;
}
interface Message {
    data: string;
}

@Controller()
export class DemoController {

    @Mutation()
    async upload(@Args('file') file: Upload): Promise<File> {
        return await file;
    }

    @Query()
    async getUser(): Promise<User> {
        return {
            username: `username`
        }
    }
}
