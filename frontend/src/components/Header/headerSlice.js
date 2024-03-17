import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hamburgerToggled: false
};

const header = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setHamburgerToggled: (state) => {state.hamburgerToggled = !state.hamburgerToggled}
    }
});

export default header.reducer;
export const { setHamburgerToggled } = header.actions;