import { ScalarBase, ValueNode, ScalarVariables } from "../core";
import { Scalar } from "../decorators";
import { GraphQLError, Kind } from "graphql";
const PHONE_NUMBER_REGEX = /^\+[1-9]\d{1,14}$/;

@Scalar({
    name: `Mobile`,
    description: "The `Mobile` scalar type"
})
export class MobileScalar extends ScalarBase<any, string>{
    serialize(value: any): string {
        if (typeof value !== 'string') {
            throw new TypeError(`Value is not string: ${value}`);
        }
        if (!(PHONE_NUMBER_REGEX.test(value))) {
            throw new TypeError(`Value is not a valid phone number of the form +17895551234 (10-15 digits): ${value}`);
        }
        return value;
    }
    parseValue(value: any) {
        if (typeof value !== 'string') {
            throw new TypeError(`Value is not string: ${value}`);
        }
        if (!(PHONE_NUMBER_REGEX.test(value))) {
            throw new TypeError(`Value is not a valid phone number of the form +17895551234 (10-15 digits): ${value}`);
        }
        return value;
    }
    parseLiteral(ast: ValueNode, variables: ScalarVariables) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
              `Can only validate strings as phone numbers but got a: ${ast.kind}`,
            );
          }
          if (!(PHONE_NUMBER_REGEX.test(ast.value))) {
            throw new TypeError(`Value is not a valid phone number of the form +17895551234 (10-15 digits): ${ast.value}`);
          }
          return ast.value;
    }
}