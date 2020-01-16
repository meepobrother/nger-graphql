import { StaticProvider, Injector, InjectionToken } from "@nger/core";
import { ArgsMetadataKey, ArgsOptions } from "../../decorators";
import { IParameterDecorator } from '@nger/decorator'
import { INFO } from "../tokens";

export const infoProvider: StaticProvider = {
    provide: ArgsMetadataKey,
    useValue: (handler: Function, parameters: Array<any>, instance: any, injector: Injector, parameter: IParameterDecorator<any, ArgsOptions>) => {
        const args = injector.get(INFO)
        Reflect.set(parameters, parameter.parameterIndex, args)
    }
}