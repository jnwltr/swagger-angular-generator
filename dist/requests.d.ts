import { Config } from './generate';
import { Method, MethodName } from './types';
export interface Paths {
    [key: string]: {
        [key in MethodName]?: Method;
    };
}
/**
 * Entry point, processes all possible api requests and exports them
 * to files devided ty controllers (same as swagger web app sections)
 * @param paths paths from the schema
 * @param swaggerPath swagger base url
 */
export declare function processPaths(paths: Paths, swaggerPath: string, config: Config): void;
