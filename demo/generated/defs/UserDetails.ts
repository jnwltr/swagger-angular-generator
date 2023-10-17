/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

export interface UserDetails {
  readonly pk?: number;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  /** format: email */
  readonly email?: string;
  first_name?: string;
  last_name?: string;
}
