import { InjectionToken } from '@nger/core'
export const MAIN_PATH = new InjectionToken<string>(`MAIN_PATH`)
import { ApolloServer} from 'apollo-server-express'
import { Application} from 'express'
export const APOLLO = new InjectionToken<ApolloServer>(`APOLLO`)
export const EXPRESS = new InjectionToken<Application>(`EXPRESS`)
