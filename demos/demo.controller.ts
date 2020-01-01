import { Controller } from "@nger/core";
import { Query, Subscription } from '@nger/graphql'
import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub()
interface User {
    username: string;
}
interface Message {
    data: string;
}

@Controller()
export class DemoController {

    @Subscription()
    myMessages(): AsyncIterator<Message> {
        let i = 0;
        setInterval(() => {
            i += 1;
            pubsub.publish(`myMessages`, {
                myMessages: {
                    data: `${i}`
                }
            })
        }, 1000)
        return pubsub.asyncIterator([`myMessages`])
    }

    @Query()
    async getUser(): Promise<User> {
        return {
            username: `username`
        }
    }
}