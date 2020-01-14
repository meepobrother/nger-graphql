import { StaticProvider, Injector, InjectionToken } from "@nger/core";
import { ArgsMetadataKey, ArgsOptions } from "../../decorators";
import { IParameterDecorator } from '@nger/decorator'
import { ARGS } from "../tokens";

export const argsProvider: StaticProvider = {
    provide: ArgsMetadataKey,
    useValue: (handler: Function, parameters: Array<any>, instance: any, injector: Injector, parameter: IParameterDecorator<any, ArgsOptions>) => {
        const options = parameter.options;
        if (options) {
            const args = injector.get(ARGS)
            let path: string = ``
            if (options.path instanceof InjectionToken) {
                path = injector.get(options.path)
            } else {
                path = options.path;
            }
            const val = Reflect.get(args, path)
            Reflect.set(parameters, parameter.parameterIndex, val)
        }
    }
}