import { Inventory } from "./Inventory";

export interface ChartData {
  date: string;
  sold: number;
  totalSales: number;
}

export interface ProductSalesChartDataProps {
  data: ChartData[];
}
