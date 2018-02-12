import { ProcessDefinition } from '../definitions';
import { Config } from '../generate';
import { Parameter } from '../types';
export interface FieldDefinitionObj {
    content: string;
    paramsArray: string[];
}
export declare function createComponentTs(config: Config, name: string, paramGroups: Parameter[], schemaObjectDefinitions: ProcessDefinition[], simpleName: string, formSubDirName: string, className: string): void;
