import { Config } from './generate';
import { Schema } from './types';
export interface Definition {
    properties: {
        [key: string]: Schema;
    };
    required?: string[];
    description?: string;
}
export interface ProcessDefinition {
    name: string;
    def: Definition;
}
/**
 * Entry point, processes all definitions and exports them
 * to individual files
 * @param defs definitions from the schema
 */
export declare function processDefinitions(defs: {
    [key: string]: Definition;
}, config: Config): ProcessDefinition[];
