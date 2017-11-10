import { ControllerMethod, MethodOutput } from './requests.models';
/**
 * Transforms method definition to typescript method
 * with single typed param object that is separated into several objects
 * and passed to api service
 * @param controller
 */
export declare function processMethod(method: ControllerMethod): MethodOutput;
