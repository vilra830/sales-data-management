import { Product } from "./Product";

export interface Inventory {
  id?: number;
  product: Product;
  date: string; // ISO FORMAT 'YYYY-MM-DD'
  openingStock: number;
  additions?: number;
  deliveries?: number;
  cookedProducts?: number;
  remainingStock?: number;

  //Calculated Fields
  totalStock?: number;
  sold?: number;
  totalSalesPerProduct?: number;
  totalluto?: number;
  totalHilaw?: number;
}
