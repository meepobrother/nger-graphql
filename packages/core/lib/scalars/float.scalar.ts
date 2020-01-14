import { ScalarBase, ValueNode, ScalarVariables } from "../core";
import { Scalar } from "../decorators";
import * as util from './util'
import { Kind, GraphQLError } from "graphql";

@Scalar({
    name: `Float`,
    description: "The `Float` scalar type"
})
export class FloatScalar extends ScalarBase<any, any>{
    serialize(val: any): any {
        return processValue(val);
    }
    parseValue(val: any) {
        return processValue(val);
    }
    parseLiteral(ast: ValueNode, variables: ScalarVariables) {
        if (ast.kind !== Kind.FLOAT && ast.kind !== Kind.INT) {
            throw new GraphQLError(
                `Can only validate floating point numbers as negative floating point numbers but got a: ${
                ast.kind
                }`,
            );
        }
        return processValue(ast.value);
    }
}

function processValue(value: any) {
    if (
        value === null ||
        typeof value === 'undefined' ||
        isNaN(value) ||
        Number.isNaN(value) ||
        value === Number.NaN
    ) {
        throw new TypeError(`Value is not a number: ${value}`);
    }
    const parsedValue = parseFloat(value);
    _validateFloat(parsedValue)
    return parsedValue;
}

function _validateFloat(value: any) {
    if (!Number.isFinite(value)) {
        throw new TypeError(`Value is not a finite number: ${value}`);
    }
}