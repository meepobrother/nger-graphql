import { ScalarBase, ValueNode, ScalarVariables } from "../core";
import { Scalar } from "../decorators";
import { Kind, GraphQLError } from "graphql";
/* eslint-disable no-useless-escape */
const EMAIL_ADDRESS_REGEX = new RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
);
/* eslint-enable */
@Scalar({
    name: `Email`,
    description: "The `Email` scalar type"
})
export class EmailScalar extends ScalarBase<any, string>{
    serialize(value: any): string {
        if (typeof value !== 'string') {
            throw new TypeError(`Value is not string: ${value}`);
        }
        if (!EMAIL_ADDRESS_REGEX.test(value)) {
            throw new TypeError(`Value is not a valid email address: ${value}`);
        }
        return value;
    }
    parseValue(value: any) {
        if (typeof value !== 'string') {
            throw new TypeError('Value is not string');
        }
        if (!EMAIL_ADDRESS_REGEX.test(value)) {
            throw new TypeError(`Value is not a valid email address: ${value}`);
        }
        return value;
    }
    parseLiteral(ast: ValueNode, variables: ScalarVariables) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Can only validate strings as email addresses but got a: ${ast.kind}`,
            );
        }
        if (!EMAIL_ADDRESS_REGEX.test(ast.value)) {
            throw new TypeError(`Value is not a valid email address: ${ast.value}`);
        }
        return ast.value;
    }
}