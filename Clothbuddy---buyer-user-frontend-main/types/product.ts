export interface IProductList {
  id: number;
  src: string;
  name: string;
  price: number;
  ratings: number;
  description: string;
}

export interface IProductLists extends Array<IProductList> {}
