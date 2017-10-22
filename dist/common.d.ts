import { Schema } from './types';
export interface PropertyOutput {
    property: string;
    enumDeclaration: string;
    native: boolean;
}
/**
 * Processes one property of the type
 * @param prop property definition
 * @param name property name
 * @param namespace usage context for type name uniqueness
 */
export declare function processProperty(prop: Schema, name?: string, namespace?: string, required?: (string[] | boolean), exportEnums?: boolean): PropertyOutput;
/**
 * - recursive inside-out unwrapping of generics
 * - space removal e.g.
 *   getFilename('PagedResources«Page«ItemCategoryDto»»') =>
 *               'ItemCategoryDtoPagePagedResources'
 * @param type original type name
 * @return normalized type name
 */
export declare function normalizeDef(type: string): string;
