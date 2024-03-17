import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false
};

const loginModal = createSlice({
    name: 'loginModal',
    initialState,
    reducers: {
        setIsModalOpen: (state, action) => {state.isModalOpen = action.payload}
    }
});

export default loginModal.reducer;
export const { setIsModalOpen } = loginModal.actions;