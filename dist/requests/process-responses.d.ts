import { HttpResponse } from '../types';
/**
 * Process all responses of one method
 * @param httpResponse response object
 * @param name of the context for type name uniqueness
 */
export declare function processResponses(httpResponse: HttpResponse, name: string): {
    type: string;
    enumDeclaration: string;
    usesGlobalType: boolean;
};
