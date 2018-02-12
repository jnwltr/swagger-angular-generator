import { ProcessDefinition } from '../definitions';
import { Config } from '../generate';
import { Parameter } from '../types';
export interface Validator {
    type: string;
    errorDescription: string;
}
export declare function createComponentHTML(config: Config, name: string, paramGroups: Parameter[], schemaObjectDefinitions: ProcessDefinition[], formSubDirName: string, simpleName: string): void;
