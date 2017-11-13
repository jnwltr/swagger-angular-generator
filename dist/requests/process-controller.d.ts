import { Config } from '../generate';
import { ControllerMethod } from './requests.models';
/**
 * Creates and serializes class for api communication for controller
 * @param controllers list of methods of the controller
 * @param name
 */
export declare function processController(methods: ControllerMethod[], name: string, config: Config): void;
