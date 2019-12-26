import { StaticProvider } from '@nger/di';
import { mutationProvicer } from "./mutation";
import { queryProvicer } from "./query";
import { subscriptionProvicer } from "./subscription";
export const handlers: StaticProvider[] = [
    mutationProvicer,
    queryProvicer,
    subscriptionProvicer
]