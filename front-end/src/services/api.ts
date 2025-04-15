import axios from "axios";
import { Product } from "../models/Product";
import { Inventory } from "../models/Inventory";

const API_URL = "http://localhost:8080";

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (
  id: number,
  product: Product
): Promise<Product> => {
  const response = await axios.put(`${API_URL}/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}`);
};

//Inventory API calls
export const getInventoryByDate = async (
  date: string
): Promise<Inventory[]> => {
  const response = await axios.get(`${API_URL}/inventory/${date}`);
  return response.data;
};

export const getInventoryByProduct = async (
  productId: number
): Promise<Inventory[]> => {
  const response = await axios.get(`${API_URL}/inventory/product/${productId}`);
  return response.data;
};

export const createInventoryEntry = async (
  inventory: Inventory
): Promise<Inventory> => {
  if (!inventory.product.id) {
    throw new Error("Product ID is required");
  }

  const latestInventory = await getLatestInventoryBeforeDate(
    inventory.product.id,
    inventory.date
  );

  // Calculate opening stock if previous day exists
  if (latestInventory) {
    inventory.openingStock = latestInventory.remainingStock || 0;
  } else {
    inventory.openingStock = 0;
  }
  const payload = {
    productId: inventory.product.id,
    date: inventory.date,
    openingStock: inventory.openingStock,
    additions: inventory.additions,
    deliveries: inventory.deliveries,
    cookedProducts: inventory.cookedProducts,
    remainingStock: inventory.remainingStock,
  };

  const response = await axios.post(`${API_URL}/inventory`, payload);
  return response.data;
};

export const updateInventoryEntry = async (
  id: number,
  inventory: Inventory
): Promise<Inventory> => {
  const response = await axios.put(`${API_URL}/inventory/${id}`, inventory);
  return response.data;
};

// Reports API calls
export const getDailyReportByProductAndDate = async (
  id: number,
  date: string
): Promise<Inventory[]> => {
  const response = await axios.get(
    `${API_URL}/inventory/reports/${id}/date?date=${date}`
  );
  return response.data;
};

export const getDateRangeReportByProduct = async (
  id: number,
  startDate: string,
  endDate: string
): Promise<Inventory[]> => {
  const response = await axios.get(
    `${API_URL}/inventory/reports/${id}/range?start=${startDate}&end=${endDate}`
  );
  return response.data;
};

export const getDateRangeReport = async (
  startDate: string,
  endDate: string
): Promise<Inventory[]> => {
  const response = await axios.get(
    `${API_URL}/inventory/reports/range?start=${startDate}&end=${endDate}`
  );
  return response.data;
};

export const getLatestInventoryBeforeDate = async (
  productId: number,
  date: string
): Promise<Inventory | null> => {
  const response = await axios.get(
    `${API_URL}/inventory/latest-before?productId=${productId}&date=${date}`
  );
  return response.data;
};
