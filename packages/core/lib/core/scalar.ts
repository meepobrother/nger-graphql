import { ValueNode } from 'graphql'
export interface ScalarVariables {
    [key: string]: any
}
export abstract class ScalarBase<TInternal, TExternal> {
    abstract serialize(val: any): TExternal;
    abstract parseValue(val: any): TInternal;
    abstract parseLiteral(ast: ValueNode, variables: ScalarVariables): TInternal;
}
export { ValueNode }