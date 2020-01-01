import { InjectionToken } from '@nger/core'
import { SubscriptionServer } from 'subscriptions-transport-ws';
export const GRAPHQL_SUBSCRIPTION_SERVER = new InjectionToken<Promise<SubscriptionServer>>(`@nger/graphql GRAPHQL_SUBSCRIPTION_SERVER`)
export const MAIN_PATH = new InjectionToken<string>(`MAIN_PATH`)