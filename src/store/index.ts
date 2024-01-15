import idReducer from "./reducers/reducer";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: idReducer
});

export type RootState = ReturnType<typeof idReducer>