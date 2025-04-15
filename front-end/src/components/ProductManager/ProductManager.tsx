import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { fetchProducts, addProduct } from "../../state/sales-data/productSlice";
import { Product } from "../../models/Product";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./ProductManager.module.scss";
import { deleteProduct, updateProduct } from "../../services/api";
import { useState } from "react";

// Zod schema for validation
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price must be positive"),
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductManager: React.FC = () => {
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);


  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onSubmit = (data: ProductFormData) => {
    dispatch(addProduct(data));
    reset();
  };

  const handleDelete = async (productId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product? This action is permanent and cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct(productId); // <- your API call
      dispatch(fetchProducts()); // <- refresh the product list
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleUpdate = (product: Product) => {
    setFormData(product);
    setIsEditing(true);
    setEditId(product.id || null);
  };

  return (
    <div className={styles.container}>
      <h2>📦 Product Manager</h2>

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
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() =>
                    product.id !== undefined && handleDelete(product.id)
                  }
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleUpdate(product)}
                >
                  Update
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
