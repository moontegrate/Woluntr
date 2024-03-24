import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    targetOrder: null
};

const customerOrderModal = createSlice({
    name: 'customerOrderModal',
    initialState,
    reducers: {
        setIsModalOpen: (state, action) => {state.isModalOpen = action.payload},
        setTargetOrder: (state, action) => {state.targetOrder = action.payload},
    }
});

export default customerOrderModal.reducer;
export const { setIsModalOpen, setTargetOrder } = customerOrderModal.actions;