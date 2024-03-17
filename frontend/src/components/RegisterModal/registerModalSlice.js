import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false
};

const registerModal = createSlice({
    name: 'registerModal',
    initialState,
    reducers: {
        setIsModalOpen: (state, action) => {state.isModalOpen = action.payload}
    }
});

export default registerModal.reducer;
export const { setIsModalOpen } = registerModal.actions;