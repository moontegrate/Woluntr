import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appMode: 'customer'
};

const appMode = createSlice({
    name: 'appMode',
    initialState,
    reducers: {
        setMode: (state, action) => {state.appMode = action.payload}
    }
});

export default appMode.reducer;
export const { setMode } = appMode.actions;