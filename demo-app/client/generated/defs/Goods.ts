/* tslint:disable:max-line-length no-empty-interface */
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

export enum CurrencyGoodsEnum {
  CZK = 'CZK'
}

export enum StatusGoodsEnum {
  _NR_1 = 1,
  _NR_2 = 2,
  _NR_3 = 3
}

export enum RefStatusGoodsEnum {
  _NR_1 = 1,
  _NR_2 = 2,
  _NR_3 = 3
}
