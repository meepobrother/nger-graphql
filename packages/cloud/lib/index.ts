import { Module, ModuleWithProviders, InjectionToken, Injector } from '@nger/core'
import { ApolloGateway, RemoteGraphQLDataSource, ServiceEndpointDefinition, GraphQLDataSource } from '@apollo/gateway'
import { isDevMode } from '@nger/core';
import { HeadersInit } from 'node-fetch'
export const GATEWAY = new InjectionToken<ApolloGateway>(`GATEWAY`)
export const SERVICE_LIST = new InjectionToken<ServerCloud[]>(`GATEWAY_CLOUD`)
export interface ServerCloud {
    name: string;
    url: string;
}
class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        request.http.headers.set('x-user-id', context.userId);
    }
}
/**
 * 不支持subscriptions
 */
@Module()
export class GraphqlCloudModule {
    static forFeature(cloud: ServerCloud | ServerCloud[]): ModuleWithProviders {
        return {
            ngModule: GraphqlCloudModule,
            providers: [{
                provide: SERVICE_LIST,
                useValue: cloud,
                multi: true
            }]
        }
    }
    static forRoot(
        cloud: ServerCloud | ServerCloud[],
        introspectionHeaders?: HeadersInit,
        buildService?: (definition: ServiceEndpointDefinition) => GraphQLDataSource
    ): ModuleWithProviders {
        const defaultBuildService = ({ name, url }) => {
            return new AuthenticatedDataSource({ url });
        }
        return {
            ngModule: GraphqlCloudModule,
            providers: [{
                provide: SERVICE_LIST,
                useValue: cloud,
                multi: true
            }, {
                provide: GATEWAY,
                useFactory: (injector: Injector) => {
                    const serviceList = injector.get(SERVICE_LIST, [])
                    return new ApolloGateway({
                        debug: isDevMode(),
                        serviceList: serviceList.flat(),
                        introspectionHeaders: introspectionHeaders,
                        buildService: buildService || defaultBuildService
                    })
                },
                deps: [Injector]
            }]
        }
    }
}
