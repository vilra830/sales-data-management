import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ProductSalesChartDataProps } from "../../models/ChartData";
import { parseISO, format } from "date-fns";

export default function ProductSalesBarChart({data}: ProductSalesChartDataProps) {
    return (
        <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(dateStr) => {
              const date = parseISO(dateStr);
              return format(date, "MMM d"); // <- Format here
            }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sold" fill="#8884d8" name="Units Sold" />
          <Bar dataKey="totalSales" fill="#82ca9d" name="Total Sales (₱)" />
        </BarChart>
      </ResponsiveContainer>
    );
}