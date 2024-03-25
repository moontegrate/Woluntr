import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLocation: null,
    zoom: 9,
    center: [51.12, 71.43]
};

const map = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setCurrentLocation: (state, action) => {state.currentLocation = action.payload},
        incZoom: (state, action) => {
            if (state.zoom < 20) {
                state.zoom = ++state.zoom;
            }
        },
        decZoom: (state, action) => {
            if (state.zoom > 4) {
                state.zoom = --state.zoom;
            }
        },
        setCenter: (state, action) => {state.center = action.payload},
        setZoom: (state, action) => {state.zoom = action.payload}
    }
});

export default map.reducer;
export const { setCurrentLocation, incZoom, decZoom, setCenter, setZoom } = map.actions;