import { ScalarBase, ValueNode, ScalarVariables } from "../core";
import { Scalar } from "../decorators";
import * as util from './util'

@Scalar({
    name: `Empty`,
    description: "The `Empty` scalar type"
})
export class EmptyScalar extends ScalarBase<any, any>{
    serialize(val: any): any {
        return val;
    }
    parseValue(val: any) {
        return val;
    }
    parseLiteral(ast: ValueNode, variables: ScalarVariables) {
        return {}
    }
}