import { Config } from '../../generate';
import { ResponseDef } from '../../requests/requests.models';
import { Parameter } from '../../types';
export declare function GenerateHttpActions(config: Config, name: string, responseDef: ResponseDef, actionClassNameBase: string, actionTypeNameBase: string, simpleName: string, formSubDirName: string, paramGroups: Parameter[]): void;
export declare function getActionTypeNameBase(name: string, simpleName: string, operationPrefix: string): string;
export declare function getActionClassNameBase(name: string, simpleName: string, operationPrefix: string): string;
export declare function getClassName(name: string, simpleName: string): string;
