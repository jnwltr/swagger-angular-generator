/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com
 */

import {InjectionToken} from '@angular/core';
export const BASE_URL = new InjectionToken<string>('baseUrl');
export * from './defs/Products'; // sources: products
export * from './defs/ProductDetail'; // sources: productDetail
export * from './defs/OrderDto'; // sources: orderDto
export * from './defs/LoginDto'; // sources: loginDto
