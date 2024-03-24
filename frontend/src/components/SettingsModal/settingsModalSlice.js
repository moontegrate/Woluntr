import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false
};

const settingsModal = createSlice({
    name: 'settingsModal',
    initialState,
    reducers: {
        setIsModalOpen: (state, action) => {state.isModalOpen = action.payload}
    }
});

export default settingsModal.reducer;
export const { setIsModalOpen } = settingsModal.actions;