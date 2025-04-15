import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Inventory } from "../../models/Inventory";
import {
  getInventoryByDate,
  getInventoryByProduct,
  createInventoryEntry,
  updateInventoryEntry,
  getDailyReportByProductAndDate,
  getDateRangeReportByProduct,
  getDateRangeReport
} from "../../services/api";

interface InventoryState {
  inventoryItems: Inventory[];
  currentInventory: Inventory | null;
  dailyReport: Inventory[];
  rangeReport: Inventory[];
  loading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  inventoryItems: [],
  currentInventory: null,
  dailyReport: [],
  rangeReport: [],
  loading: false,
  error: null,
};

// Fetch inventory by date
export const fetchInventoryByDate = createAsyncThunk(
  "inventory/fetchByDate",
  async (date: string) => {
    return await getInventoryByDate(date);
  }
);

// Fetch inventory by product
export const fetchInventoryByProduct = createAsyncThunk(
  "inventory/fetchByProduct",
  async (productId: number) => {
    return await getInventoryByProduct(productId);
  }
);

// Create inventory entry
export const addInventoryEntry = createAsyncThunk(
  "inventory/create",
  async (inventory: Inventory) => {
    return await createInventoryEntry(inventory);
  }
);

// Update inventory entry
export const modifyInventoryEntry = createAsyncThunk(
  "inventory/update",
  async ({ id, inventory }: { id: number; inventory: Inventory }) => {
    return await updateInventoryEntry(id, inventory);
  }
);

// Get daily report by product and date
export const fetchDailyReport = createAsyncThunk(
  "reports/dailyByProductAndDate",
  async ({ productId, date }: { productId: number; date: string }) => {
    return await getDailyReportByProductAndDate(productId, date);
  }
);

// Get date range report by product
export const fetchDateRangeReportByProduct = createAsyncThunk(
  "reports/rangeByProduct",
  async ({ productId, startDate, endDate }: { productId: number; startDate: string; endDate: string }) => {
    return await getDateRangeReportByProduct(productId, startDate, endDate);
  }
);

// Get date range report for all products
export const fetchDateRangeReport = createAsyncThunk(
  "reports/range",
  async ({ startDate, endDate }: { startDate: string; endDate: string }) => {
    return await getDateRangeReport(startDate, endDate);
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    clearCurrentInventory: (state) => {
      state.currentInventory = null;
    },
    clearReports: (state) => {
      state.dailyReport = [];
      state.rangeReport = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch by date
      .addCase(fetchInventoryByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchInventoryByDate.fulfilled,
        (state, action: PayloadAction<Inventory[]>) => {
          state.inventoryItems = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchInventoryByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch inventory by date";
      })
      // Fetch by product
      .addCase(fetchInventoryByProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchInventoryByProduct.fulfilled,
        (state, action: PayloadAction<Inventory[]>) => {
          state.inventoryItems = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchInventoryByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch inventory by product";
      })
      // Create inventory entry
      .addCase(addInventoryEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addInventoryEntry.fulfilled,
        (state, action: PayloadAction<Inventory>) => {
          state.inventoryItems.push(action.payload);
          state.currentInventory = action.payload;
          state.loading = false;
        }
      )
      .addCase(addInventoryEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create inventory entry";
      })
      // Update inventory entry
      .addCase(modifyInventoryEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        modifyInventoryEntry.fulfilled,
        (state, action: PayloadAction<Inventory>) => {
          const index = state.inventoryItems.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.inventoryItems[index] = action.payload;
          }
          state.currentInventory = action.payload;
          state.loading = false;
        }
      )
      .addCase(modifyInventoryEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update inventory entry";
      })
      // Daily report
      .addCase(fetchDailyReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDailyReport.fulfilled,
        (state, action: PayloadAction<Inventory[]>) => {
          state.dailyReport = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchDailyReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch daily report";
      })
      // Date range report by product
      .addCase(fetchDateRangeReportByProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDateRangeReportByProduct.fulfilled,
        (state, action: PayloadAction<Inventory[]>) => {
          state.rangeReport = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchDateRangeReportByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch date range report by product";
      })
      // Date range report for all products
      .addCase(fetchDateRangeReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDateRangeReport.fulfilled,
        (state, action: PayloadAction<Inventory[]>) => {
          state.rangeReport = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchDateRangeReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch date range report";
      });
  },
});

export const { clearCurrentInventory, clearReports } = inventorySlice.actions;
export default inventorySlice.reducer;