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

<<<<<<< HEAD
export default favoritesSlice.reducer;
=======
export default favoritesSlice.reducer;
>>>>>>> 050baeacb83dc6bf839195b1372424d2f8a92a41
