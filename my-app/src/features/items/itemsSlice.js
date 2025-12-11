import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/itemsService";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ query = "", page = 1 }, { rejectWithValue }) => {
    try {
      const data = await api.getAll({ name: query, page });
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch characters");
    }
  }
);

export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.getById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Character not found");
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    selectedItem: null,
    loadingList: false,
    loadingItem: false,
    errorList: null,
    errorItem: null,
    query: "",
    page: 1,
    totalPages: 1,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearSelected(state) {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchItems
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
        state.list = [];
      })
      // fetchItemById
      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.payload;
      });
  },
});

export const { setQuery, setPage, clearSelected } = itemsSlice.actions;
export default itemsSlice.reducer;