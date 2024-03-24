import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false
};

const profileModal = createSlice({
    name: 'profileModal',
    initialState,
    reducers: {
        setIsModalOpen: (state, action) => {state.isModalOpen = action.payload}
    }
});

export default profileModal.reducer;
export const { setIsModalOpen } = profileModal.actions;