/** Shared types */
export declare type MethodName = 'get' | 'patch' | 'post' | 'put' | 'delete';
export declare type HttpCode = '200' | '201' | '204' | '400' | '401' | '403' | '404' | '409' | '417' | '500';
export interface Method {
    tags: [string];
    summary: string;
    operationId: string;
    description: string;
    parameters: Parameter[];
    responses: HttpResponse;
}
export declare type HttpResponse = {
    [key in HttpCode]?: Response;
};
export interface Parameter {
    description: string;
    in: string;
    name: string;
    required: boolean;
    enum?: string[];
    items?: Schema;
    schema?: Schema;
    type?: string;
    format?: string;
}
export interface Schema {
    type?: string;
    $ref?: string;
    enum?: string[];
    additionalProperties?: Schema;
    items?: Schema;
    description?: string;
    example?: any;
    format?: string;
}
export interface Response {
    description?: string;
    schema?: Schema;
}
export declare type NativeNames = 'binary' | 'boolean' | 'byte' | 'date' | 'dateTime' | 'double' | 'file' | 'float' | 'integer' | 'long' | 'number' | 'object' | 'password' | 'string';
