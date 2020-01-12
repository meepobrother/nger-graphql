import { ScalarBase, ValueNode, ScalarVariables } from "../core";
import { Scalar } from "../decorators";
import { GraphQLError, Kind } from "graphql";

@Scalar({
    name: 'Date',
    description: "The `Date` scalar type"
})
export class DateScalar extends ScalarBase<Date, string> {
    serialize(val: any) {
        let v: Date = val;
        if (!(v instanceof Date) && typeof v !== 'string' && typeof v !== 'number') {
            throw new TypeError(
                `Value is not an instance of Date, Date string or number: ${JSON.stringify(v)}`,
            );
        }
        if (typeof v === 'string') {
            v = new Date();
            v.setTime(Date.parse(val));
        } else if (typeof v === 'number') {
            v = new Date(v);
        }
        // eslint-disable-next-line no-restricted-globals
        if (Number.isNaN(v.getTime())) {
            throw new TypeError(`Value is not a valid Date: ${JSON.stringify(v)}`);
        }
        return v.toJSON();
    }
    parseLiteral(ast: ValueNode, variables: ScalarVariables): Date {
        if (ast.kind !== Kind.STRING && ast.kind !== Kind.INT) {
            throw new GraphQLError(
                `Can only parse strings & integers to dates but got a: ${ast.kind}`,
            );
        }
        const result = new Date(ast.kind === Kind.INT ? Number(ast.value) : ast.value);
        // eslint-disable-next-line no-restricted-globals
        if (Number.isNaN(result.getTime())) {
            throw new GraphQLError(`Value is not a valid Date: ${ast.value}`);
        }
        return result;
    }
    parseValue(value: any): Date {
        const date = new Date(value);
        // eslint-disable-next-line no-restricted-globals
        if (Number.isNaN(date.getTime())) {
            throw new TypeError(`Value is not a valid Date: ${value}`);
        }
        return date;
    }
}
