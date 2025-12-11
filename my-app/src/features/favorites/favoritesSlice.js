import { createSlice } from "@reduxjs/toolkit";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../../services/favoritesService";

const initialState = {
  favorites: getFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const item = action.payload;
      const exists = state.favorites.find(f => f.id === item.id);

      if (exists) {
        state.favorites = removeFavorite(item.id);
      } else {
        state.favorites = addFavorite(item);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
