import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/Product";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../../services/api";

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  return await getAllProducts();
});

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: number) => {
    return await getProductById(id);
  }
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (product: Product) => {
    return await createProduct(product);
  }
);

export const modifyProduct = createAsyncThunk(
  "products/update",
  async ({ id, product }: { id: number; product: Product }) => {
    return await updateProduct(id, product);
  }
);

export const removeProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    await deleteProduct(id);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      // Fetch product by ID
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.currentProduct = action.payload;
          state.loading = false;
        }
      )
      // Add product
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
          state.loading = false;
        }
      )
      // Update product
      .addCase(
        modifyProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (p) => p.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
          state.loading = false;
        }
      )
      // Delete product
      .addCase(
        removeProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.products = state.products.filter(
            (p) => p.id !== action.payload
          );
          state.loading = false;
        }
      );
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
