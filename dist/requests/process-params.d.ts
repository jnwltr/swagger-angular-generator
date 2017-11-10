import { Parameter } from '../types';
/**
 * Transforms input parameters to interfaces definition
 * @param def definition
 * @param paramsType name of the type
 */
export declare function processParams(def: Parameter[], paramsType: string): {
    paramDef: string;
    usesGlobalType: boolean;
};
