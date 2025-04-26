import React, { useEffect, useState } from "react";
import { Product } from "../../models/Product";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
} from "../../services/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./ProductManager.module.scss";
import ErrorBanner from "../ErrorBanner/ErrorBanner";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price must be positive"),
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [customError, setCustomError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await getAllProducts();
        setProducts(result);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const onSubmit = async (data: ProductFormData) => {
    setCustomError(null);
    try {
      const newProduct = await createProduct(data);
      setProducts([...products, newProduct]);
      reset();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data === "Product name must be unique"
      ) {
        setCustomError("A product with this name already exists.");
      } else {
        setCustomError("An unexpected error occurred.");
      }
    }
  };

  const handleDelete = async (productId: number) => {
    setCustomError(null);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error: any) {
      if (
        error.response &&
        error.response.data === "Cannot delete product with existing inventory."
      ) {
        setCustomError("Cannot delete product with existing inventory.");
      } else {
        setCustomError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>📦 Product Manager</h2>
      {/* Show the error banner if customError exists */}
      {customError && (
        <ErrorBanner
          message={customError}
          onDismiss={() => setCustomError(null)}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input {...register("name")} />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className={styles.error}>{errors.price.message}</p>
          )}
        </div>

        <button type="submit" className={styles.button}>
          Add Product
        </button>
      </form>

      <h3>🧾 Product List</h3>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price (₱)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
              <td className={styles.actions}>
                <button
                  className={styles.deleteButton}
                  onClick={() => product.id && handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManager;
