import { ScalarBase, ValueNode, ScalarVariables } from "../core";
import { Scalar } from "../decorators";
import { GraphQLError, Kind } from "graphql";
const IPV4_REGEX = /^(?:(?:(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\/(?:[0-9]|[1-2][0-9]|3[0-2]))?)$/;

const validate = (value: any) => {
    if (typeof value !== 'string') {
        throw new TypeError(`Value is not string: ${value}`);
    }
    if (!(IPV4_REGEX.test(value))) {
        throw new TypeError(`Value is not a valid IPv4 address: ${value}`);
    }
    return value;
};

@Scalar({
    name: `Ipv4`,
    description: "The `Ipv4` scalar type"
})
export class Ipv4Scalar extends ScalarBase<any, string>{
    serialize(val: any): string {
        return validate(val);
    }
    parseValue(val: any) {
        return validate(val);
    }
    parseLiteral(ast: ValueNode, variables: ScalarVariables) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(`Can only validate strings as IPv4 addresses but got a: ${ast.kind}`);
        }
        return validate(ast.value);
    }
}