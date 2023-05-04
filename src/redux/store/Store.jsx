import { configureStore } from "@reduxjs/toolkit";
import linkslice from "../future/LinkSlice";

export const store = configureStore({

    reducer: {
        link: linkslice
    }
})