import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as itemsService from "../../services/itemsService";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (query) => {
    const data = await itemsService.getAll(query);
    return data;
  }
);

export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (id) => {
    const data = await itemsService.getById(id);
    return data;
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
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    clearSelected(state) {
      state.selectedItem = null;
      state.errorItem = null;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.error.message;
      })


      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
        state.selectedItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.error.message;
      })
  },
});

export const { setQuery, clearSelected } = itemsSlice.actions;
export default itemsSlice.reducer;
