import { StaticProvider, Injector, InjectionToken } from "@nger/core";
import { ArgsMetadataKey, ArgsOptions } from "../../decorators";
import { IParameterDecorator } from '@nger/decorator'
import { SOURCE } from "../tokens";

export const sourceProvider: StaticProvider = {
    provide: ArgsMetadataKey,
    useValue: (handler: Function, parameters: Array<any>, instance: any, injector: Injector, parameter: IParameterDecorator<any, ArgsOptions>) => {
        const args = injector.get(SOURCE)
        Reflect.set(parameters, parameter.parameterIndex, args)
    }
}