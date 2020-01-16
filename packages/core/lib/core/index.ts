export * from './schemaBuilder';
export * from './scalar';
export type OrderValues = 'ASC' | 'DESC'
export interface Where<T> {
    AND: Where<T>[];
    OR: Where<T>[];
}
export type Order<T> = {
    [key in keyof T]: OrderValues
}

export type Email = string;
export type Ipv4 = string;
export type Ipv6 = string;
export type Float = number;
export type Mobile = string;
export type Empty = any;
export interface ObjectLiteral {
    [key: string]: any;
}
export interface File {
    filename: string;
    mimetype: string;
    encoding: string;
} 
export type Upload = Promise<File>;
