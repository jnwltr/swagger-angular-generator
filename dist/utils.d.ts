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
export declare function writeFile(file: string, content: string): void;
/**
 * Makes the string commented, supports single/multi-line and empty output
 * @param input string (with new-line separation) or array of lines
 */
export declare function makeComment(input: string | string[]): string;
