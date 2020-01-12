import { ScalarBase, ValueNode, ScalarVariables } from "../core";
import { Scalar } from "../decorators";
import * as util from './util'
@Scalar({
    name: `Any`,
    description: "The `Any` scalar type"
})
export class AnyScalar extends ScalarBase<any, any>{
    serialize(val: any): object {
        return val;
    }
    parseValue(val: any) {
        return val;
    }
    parseLiteral(ast: ValueNode, variables: ScalarVariables) {
        return util.parseLiteral(ast, variables)
    }
}