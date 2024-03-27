import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _server, postRequest } from "../../services/http";

const initialState = {
    isModalOpen: false,
    targetOrder: null,
    modalDataState: 'idle',
    isGalleryOpen: false
};

export const approveOrder = createAsyncThunk(
    'customerOrderModal/approveOrder',
    async (id) => {
        return await postRequest(`${_server}/api/v1/order-complete/${id}/status/`, {status: "Approved"}, {
            "Accept": "application/json",
            'Authorization': `JWT ${localStorage.getItem('access_token')}`
        });
    }
);

const customerOrderModal = createSlice({
    name: 'customerOrderModal',
    initialState,
    reducers: {
        setIsModalOpen: (state, action) => {state.isModalOpen = action.payload},
        setTargetOrder: (state, action) => {state.targetOrder = action.payload},
        setIsGalleryOpen: (state, action) => {state.isGalleryOpen = action.payload},
    },
    extraReducers: (builder) => {
        builder
        .addCase(approveOrder.pending, state => {state.modalDataState = 'sending'})
        .addCase(approveOrder.fulfilled, state => {
            state.modalDataState = 'idle';
        })
        .addCase(approveOrder.rejected, (state, action) => {
            state.modalDataState = 'idle';
            console.error(action.error);
        })
        .addDefaultCase(() => {})
    }
});

export default customerOrderModal.reducer;
export const { setIsModalOpen, setTargetOrder, setIsGalleryOpen } = customerOrderModal.actions;