import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  id: null,
  user: null,
  token: null,
  category: null,
  query: null,
  records: [],
  record: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setId: (state, action) => {
      state.id = action.payload.id;
    },
    setRecords: (state, action) => {
      state.records = action.payload.records;
    },
    setCategory: (state, action) => {
      state.category = action.payload.category;
    },
    setRecord: (state, action) => {
      state.record = action.payload.record;
    },
    setQuery: (state, action) => {
      state.query = action.payload.query;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  setMode,
  setCategory,
  setQuery,
  setName,
  setRecord,
  setId,
  setRecords,
  setLogin,
  setLogout
} = authSlice.actions;
export default authSlice.reducer;
