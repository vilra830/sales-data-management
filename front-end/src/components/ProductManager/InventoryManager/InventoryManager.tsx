import React, { useEffect, useState } from "react";
import styles from "./InventoryManager.module.scss";
import { Inventory } from "../../../models/Inventory";
import { Product } from "../../../models/Product";
import {
  getAllProducts,
  createInventoryEntry,
  getInventoryByDate,
  getInventoryByProduct,
  getDateRangeReportByProduct,
  getDailyReportByProductAndDate,
} from "../../../services/api";
import { format } from "date-fns";
import axios from "axios";
import ErrorBanner from "../../ErrorBanner/ErrorBanner";
import { ChartData } from "../../../models/ChartData";
import SalesChart from "../../SalesChart/SalesChart";

const InventoryManager: React.FC = () => {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [customError, setCustomError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | "">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formData, setFormData] = useState<Inventory>({
    product: { id: undefined, name: "", price: 0 },
    date: format(new Date(), "yyyy-MM-dd"),
    openingStock: 0,
    additions: 0,
    deliveries: 0,
    cookedProducts: 0,
    remainingStock: 0,
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleFilter = async () => {
    setError(null); //

    try {
      if (selectedProductId) {
        if (startDate && endDate) {
          const data = await getDateRangeReportByProduct(
            selectedProductId as number,
            startDate,
            endDate
          );
          setInventory(data);
          const mappedChartData = data.map((entry) => ({
            date: entry.date,
            sold: entry.sold || 0,
            totalSales: entry.totalSalesPerProduct || 0,
          }));
          setChartData(mappedChartData);
        } else if (startDate) {
          const data = await getDailyReportByProductAndDate(
            selectedProductId as number,
            startDate
          );
          setInventory(data);
        } else {
          setError("Please select at least one date.");
        }
      } else if (selectedProductId === 0 && startDate) {
        const data = await getInventoryByDate(startDate);
        setInventory(data);
      } else {
        setError("Please select at least one date.");
      }
    } catch (err) {
      console.error("Filter error:", err);

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data || "Something went wrong. Please try again."
        );
      } else {
        setError("An unexpected error occurred.");
      }

      setInventory([]); //clear inventory on error
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "product") {
      const product = products.find((p) => p.id === Number(value));
      if (product) {
        setFormData({ ...formData, product });
      }
    } else {
      setFormData({ ...formData, [name]: Number(value) || value });
    }
  };

  //
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomError(null);
    try {
      const result = await createInventoryEntry(formData);
      alert("Inventory created!");
      setInventory([...inventory, result]);
    } catch (error: any) {
      console.error("Error creating inventory:", error);

      if (axios.isAxiosError(error)) {
        setCustomError(
          error.response?.data || "Something went wrong. Please try again."
        );
      } else {
        setCustomError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Inventory Manager</h2>
      {/* Show the error banner if customError exists */}
      {customError && (
        <ErrorBanner
          message={customError}
          onDismiss={() => setCustomError(null)}
        />
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="product">Product</label>
          <select
            id="product"
            name="product"
            value={formData.product.id || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="additions">Additions</label>
          <input
            type="number"
            id="additions"
            name="additions"
            placeholder="Additions"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="deliveries">Deliveries</label>
          <input
            type="number"
            id="deliveries"
            name="deliveries"
            placeholder="Deliveries"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cookedProducts">Cooked Products</label>
          <input
            type="number"
            id="cookedProducts"
            name="cookedProducts"
            placeholder="Cooked Products"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="remainingStock">Remaining Stock</label>
          <input
            type="number"
            id="remainingStock"
            name="remainingStock"
            placeholder="Remaining Stock"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit">Create Inventory</button>
        </div>
      </form>

      <div className={styles.filters}>
        <h4>Filter Inventory</h4>
        <select
          onChange={(e) => setSelectedProductId(Number(e.target.value) || 0)}
          value={selectedProductId}
        >
          <option value="">All Products</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <div className={styles.dateGroup}>
          <label>Please select a date or a range of dates</label>
          <div className={styles.dates}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleFilter}>Apply Filters</button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {!error && inventory.length === 0 && (
        <p className={styles.noData}>No inventory entries found.</p>
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Opening</th>
            <th>Additions</th>
            <th>Deliveries</th>
            <th>Total Stock</th>
            <th>Cooked</th>
            <th>Remaining</th>
            <th>Sold</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.product.name}</td>
              <td>{entry.openingStock}</td>
              <td>{entry.additions}</td>
              <td>{entry.deliveries}</td>
              <td>{entry.totalStock}</td>

              <td>{entry.cookedProducts}</td>
              <td>{entry.remainingStock}</td>
              <td>{entry.sold}</td>
              <td>₱{entry.totalSalesPerProduct?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {chartData.length > 0 && (
        <>
          <h3>Sales Performance for {selectedProduct?.name}</h3>
          <SalesChart data={chartData} />
        </>
      )}
    </div>
  );
};

export default InventoryManager;
