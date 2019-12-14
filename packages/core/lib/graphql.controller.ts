import { Controller, Post, Body, Injector } from '@nger/core'
import { GraphqlService } from './graphql.service';
@Controller({
    path: `/graphql`,
    providers: [GraphqlService]
})
export class GraphqlController {
    constructor(private injector: Injector) { }
    @Post(`/`)
    handler(
        @Body({
            property: `operationName`
        }) operationName: string | null, // 方法名
        @Body({
            property: `query`
        }) query: string, // graphql
        @Body({
            property: `variables`
        }) variables: any // 变量
    ) {
        const graphqlService = this.injector.get(GraphqlService)
        return graphqlService.run(query, variables, operationName)
    }
}
