import { ScalarBase, ValueNode, ScalarVariables } from "../core";
import { Scalar } from "../decorators";
import * as util from './util'
@Scalar({
    name: `Void`,
    description: "The `Void` scalar type"
})
export class VoidScalar extends ScalarBase<any, any>{
    serialize(val: any): any {
        return val;
    }
    parseValue(val: any) {
        return val;
    }
    parseLiteral(ast: ValueNode, variables: ScalarVariables) {
        return void 0;
    }
}