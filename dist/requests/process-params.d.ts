import { Parameter } from '../types';
export interface ProcessParamsOutput {
    paramDef: string;
    usesGlobalType: boolean;
    isInterfaceEmpty: boolean;
}
/**
 * Transforms input parameters to interfaces definition
 * @param def definition
 * @param paramsType name of the type
 */
export declare function processParams(def: Parameter[], paramsType: string): ProcessParamsOutput;
