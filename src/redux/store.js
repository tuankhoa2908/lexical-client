import { configureStore } from '@reduxjs/toolkit';
import editorReducer from "./editorSlice";
import questionReducer from "./questionSlice";

export const store = configureStore({
    reducer: {
        editor: editorReducer,
        questionState: questionReducer,
    }
});