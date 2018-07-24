/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

export interface Goods {
  readonly id?: number;
  name?: string;
  /** format: uri */
  photo_url?: string;
  description?: string;
  /** format: decimal */
  price: string;
  currency: CurrencyGoodsEnum;
}

export type CurrencyGoodsEnum =
  'CZK';
