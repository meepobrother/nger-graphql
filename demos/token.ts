import { InjectionToken } from '@nger/core'
import { ApolloServer} from 'apollo-server-express'
import { Application} from 'express'
export const APOLLO = new InjectionToken<ApolloServer>(`APOLLO`)
export const EXPRESS = new InjectionToken<Application>(`EXPRESS`)
