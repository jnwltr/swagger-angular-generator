export interface Config {
    header: string;
    dest: string;
    baseUrl: string;
}
/**
 * Generates API layer for the project based on src to dest
 * @param src source swagger json schema
 * @param dest destination directory
 */
export declare function generate(src?: string, dest?: string): void;
