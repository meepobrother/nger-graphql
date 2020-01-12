import { ScalarBase, ValueNode, ScalarVariables } from "../core";
import { Scalar } from "../decorators";
import { Kind } from 'graphql';

@Scalar({
    name: 'BigInt',
    description: "The `BigInt` scalar type represents non-fractional signed whole numeric values."
})
export class BigIntScalar extends ScalarBase<any, BigInt> {
    serialize(val: any): BigInt {
        return BigInt(val)
    }
    parseLiteral(ast: ValueNode, variables: ScalarVariables): BigInt | null {
        if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT || ast.kind === Kind.STRING) {
            return BigInt(ast.value);
        }
        return null;
    }
    parseValue(val: any): BigInt {
        return BigInt(val);
    }
}
