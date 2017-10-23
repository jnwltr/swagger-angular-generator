/**
 * Recursively deletes the path
 * @param path
 * @param removeSelf whether to remove the directory itself or just its content
 */
export declare function emptyDir(path: string, removeSelf?: boolean): void;
/**
 * Recursively copies the src to dest
 * @param src file or directory
 * @param dst directory
 */
export declare function copyDir(src: string, dst: string): void;
/**
 * Indents the input
 * @param input string (with new-line separation) or array of lines
 * @param level of indentation, takes into account `conf` indentation setting
 */
export declare function indent(input: string | string[], level?: number): string;
/**
 * Serializes the content to the file including global header
 * @param file
 * @param content
 */
export declare function writeFile(file: string, content: string, header: string): void;
/**
 * Makes the string commented, supports single/multi-line and empty output
 * @param input string (with new-line separation) or array of lines
 */
export declare function makeComment(input: string | string[]): string;
/**
 * Creates a unified header for all serialized files
 * @param schemaDef input schema header
 */
export declare function processHeader(schemaDef: any): string;
export declare type Color = 'green' | 'red';
export declare type TermColors = {
    [key in Color]: string;
};
export declare const termColors: TermColors;
/**
 * Outputs text in optional color
 * @param text
 * @param color
 */
export declare function out(text: string | string[], color?: Color): void;
