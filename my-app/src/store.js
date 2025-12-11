import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./features/items/itemsSlice";
import favoritesReducer from "./features/favorites/favoritesSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    favorites: favoritesReducer,
    auth: authReducer,
  },
});