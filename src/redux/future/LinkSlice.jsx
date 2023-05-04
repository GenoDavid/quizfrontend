import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    links: import.meta.env.VITE_APP_LINK
}

const linkslice = createSlice({
    name: "link",
    initialState,
    reducers: {

    }
})

export default linkslice.reducer