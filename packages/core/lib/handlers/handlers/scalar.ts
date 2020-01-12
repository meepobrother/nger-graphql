import { StaticProvider, Injector, InjectionToken } from "@nger/core";
import { ScalarMetadataKey, ScalarOptions } from "../../decorators";
import { IClassDecorator } from '@nger/decorator'
import { SCALAR_RESOLVER } from "../tokens";
import { GraphQLScalarType } from 'graphql'
export const scalarHandler: StaticProvider = {
    provide: ScalarMetadataKey,
    useValue: (init: any, current: IClassDecorator<any, ScalarOptions>, injector: Injector) => {
        injector.setStatic([{
            provide: SCALAR_RESOLVER,
            useFactory: (injector: Injector) => {
                const options = current.options;
                let name: string = current.type.name;
                if (options) {
                    if (options.name instanceof InjectionToken) {
                        name = injector.get(options.name)
                    } else {
                        name = options.name || name;
                    }
                }
                const instance = injector.get(current.type)
                const scalar = new GraphQLScalarType({
                    name: name,
                    description: options.description || '',
                    serialize: instance.serialize.bind(instance),
                    parseLiteral: instance.parseLiteral.bind(instance),
                    parseValue: instance.parseValue.bind(instance)
                })
                return scalar;
            },
            deps: [Injector],
            multi: true
        }])
    }
}