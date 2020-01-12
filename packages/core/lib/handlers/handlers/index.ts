import { StaticProvider } from '@nger/di';
import { mutationProvicer } from "./mutation";
import { queryProvicer } from "./query";
import { subscriptionProvicer } from "./subscription";
import { scalarHandler } from './scalar';
export const handlers: StaticProvider[] = [
    mutationProvicer,
    queryProvicer,
    subscriptionProvicer,
    scalarHandler
]