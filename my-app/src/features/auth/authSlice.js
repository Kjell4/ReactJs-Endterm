import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  repeatPassword: "",
  error: "",
  loading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setRepeatPassword(state, action) {
      state.repeatPassword = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    resetForm(state) {
      state.email = "";
      state.password = "";
      state.repeatPassword = "";
      state.error = "";
      state.loading = false;
    }
  }
});

export const {
  setEmail,
  setPassword,
  setRepeatPassword,
  setError,
  setLoading,
  resetForm
} = authSlice.actions;

export default authSlice.reducer;