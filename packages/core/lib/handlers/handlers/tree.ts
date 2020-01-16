import { StaticProvider, Injector, InjectionToken } from "@nger/core";
import { ArgsMetadataKey, ArgsOptions } from "../../decorators";
import { IParameterDecorator } from '@nger/decorator'
import { RESOLVE_TREE } from "../tokens";

export const treeProvider: StaticProvider = {
    provide: ArgsMetadataKey,
    useValue: (handler: Function, parameters: Array<any>, instance: any, injector: Injector, parameter: IParameterDecorator<any, ArgsOptions>) => {
        const args = injector.get(RESOLVE_TREE)
        Reflect.set(parameters, parameter.parameterIndex, args)
    }
}