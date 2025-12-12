import { createSlice } from "@reduxjs/toolkit";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  mergeFavoritesOnLogin,
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
      const exists = state.favorites.find((f) => f.id === item.id);

      if (exists) {
        state.favorites = removeFavorite(item.id);
      } else {
        state.favorites = addFavorite(item);
      }
    },

    loadMerged(state, action) {
      state.favorites = action.payload;
    },
  },
});

export const { toggleFavorite, loadMerged } = favoritesSlice.actions;

export const syncFavoritesOnLogin = () => async (dispatch) => {
  const merged = await mergeFavoritesOnLogin();
  dispatch(loadMerged(merged));
};

export default favoritesSlice.reducer;