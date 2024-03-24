import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLocation: null
};

const map = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setCurrentLocation: (state, action) => {state.currentLocation = action.payload}
    }
});

export default map.reducer;
export const { setCurrentLocation } = map.actions;