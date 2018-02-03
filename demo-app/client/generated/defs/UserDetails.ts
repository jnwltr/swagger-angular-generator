/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

export interface UserDetails {
  pk?: number;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  /** format: email */
  email?: string;
  first_name?: string;
  last_name?: string;
}
