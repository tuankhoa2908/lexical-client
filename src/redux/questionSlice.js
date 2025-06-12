import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: null,
  inputs: [],
  audioUrl: null,
  preview: null,
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestionData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetQuestionData: () => initialState,
  },
});

export const { setQuestionData, resetQuestionData } = questionSlice.actions;
export default questionSlice.reducer;