import { ScalarBase, ValueNode, ScalarVariables } from "../core";
import { Scalar } from "../decorators";
import * as util from './util'
import { ObjectValueNode } from "graphql";
@Scalar({
    name: `ObjectLiteral`,
    description: "The `ObjectLiteral` scalar type"
})
export class ObjectLiteralScalar extends ScalarBase<any, object>{
    serialize(val: any): object {
        return util.ensureObject(val)
    }
    parseValue(val: any) {
        return util.ensureObject(val)
    }
    parseLiteral(ast: ValueNode, variables: ScalarVariables) {
        return util.parseObject(ast as ObjectValueNode, variables)
    }
}