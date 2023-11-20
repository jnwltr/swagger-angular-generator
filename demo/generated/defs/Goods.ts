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
  status?: StatusGoodsEnum;
  refStatus?: RefStatusGoodsEnum;
}

export type CurrencyGoodsEnum =
  'CZK';

export type StatusGoodsEnum =
  1 |
  2 |
  3;

export type RefStatusGoodsEnum =
  1 |
  2 |
  3;
