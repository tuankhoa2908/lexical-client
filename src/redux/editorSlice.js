import { createSlice } from "@reduxjs/toolkit";

const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    rawHTML: {},
  },
  reducers: {
    saveRawHTML: (state, action) => {
      state.rawHTML = action.payload;
    }
  }
});

export const {saveRawHTML} = editorSlice.actions;
export default editorSlice.reducer;