import { StaticProvider } from '@nger/di';
import { mutationProvicer } from "./mutation";
import { queryProvicer } from "./query";
import { subscriptionProvicer } from "./subscription";
import { scalarHandler } from './scalar';
import { argsProvider } from './args';
import { infoProvider } from './info';
import { treeProvider } from './tree';
import { sourceProvider } from './source';
export const handlers: StaticProvider[] = [
    mutationProvicer,
    queryProvicer,
    subscriptionProvicer,
    scalarHandler,
    argsProvider,
    infoProvider,
    treeProvider,
    sourceProvider
]