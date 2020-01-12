import { ScalarBase, ValueNode, ScalarVariables } from "../core";
import { Scalar } from "../decorators";
import { GraphQLError, Kind } from "graphql";
const PHONE_NUMBER_REGEX = /^\+[1-9]\d{1,14}$/;

@Scalar({
    name: `URL`,
    description: "The `URL` scalar type"
})
export class URLScalar extends ScalarBase<URL, string>{
    serialize(value: any): string {
        return new URL(value.toString()).toString();
    }
    parseValue(value: any) {
        return new URL(value.toString())
    }
    parseLiteral(ast: ValueNode, variables: ScalarVariables) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Can only validate strings as URLs but got a: ${ast.kind}`,
            );
        }
        return new URL(ast.value.toString());
    }
}