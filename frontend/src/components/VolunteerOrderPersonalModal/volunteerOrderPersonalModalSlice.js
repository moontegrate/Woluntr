import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _server, postRequest } from "../../services/http";

const initialState = {
    isModalOpen: false,
    targetOrder: null,
    modalDataState: 'idle'
};

export const markAsDone = createAsyncThunk(
    'volunteerOrderPersonalModal/markAsDone',
    async (data) => {
        const temp = new FormData();
        temp.append('order', data)
        return await postRequest(`${_server}/api/v1/order/`, temp, {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            'Authorization': `JWT ${localStorage.getItem('access_token')}`
        });
    }
);

const volunteerOrderPersonalModal = createSlice({
    name: 'volunteerOrderPersonalModal',
    initialState,
    reducers: {
        setIsModalOpen: (state, action) => {state.isModalOpen = action.payload},
        setModalDataState: (state, action) => {state.modalDataState = action.payload},
        setTargetOrder: (state, action) => {state.targetOrder = action.payload}
    },
    extraReducers: (builder) => {
        builder
        .addCase(markAsDone.pending, state => {state.modalDataState = 'sending'})
        .addCase(markAsDone.fulfilled, state => {
            state.modalDataState = 'idle';
        })
        .addCase(markAsDone.rejected, (state, action) => {
            state.modalDataState = 'idle';
            console.error(action.error);
        })
        .addDefaultCase(() => {})
    }
});

export default volunteerOrderPersonalModal.reducer;
export const { setIsModalOpen, setModalDataState, setTargetOrder } = volunteerOrderPersonalModal.actions;