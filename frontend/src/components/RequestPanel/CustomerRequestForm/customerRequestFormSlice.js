import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { postRequest } from "../../../services/http";

// Исходные состояния (состояния по умолчанию)
const initialState = {
    formData: {
        orderDesc: '',
        orderAddress: null,
        note: ''
    },
    orderCoordinates: null,
    formState: 'idle',
    addressSearchResult: null
};

export const sendFormData = createAsyncThunk(
    'customRequestForm/sendFormData',
    async (data) => {
        return await postRequest('http://localhost:8000/api/v1/order/', data, {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            'Authorization': `JWT ${localStorage.getItem('access_token')}`
        });
    }
);

const customerRequestFormSlice = createSlice({
    name: 'customerRequestForm',
    initialState,
    reducers: {
        setFormData: (state, action) => {state.formData = action.payload},
        setCoordinates: (state, action) => {state.orderCoordinates = action.payload},
        setSearchResult: (state, action) => {state.addressSearchResult = action.payload}
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendFormData.pending, state => {state.formState = 'sending'})
        .addCase(sendFormData.fulfilled, state => {state.formState = 'idle'})
        .addCase(sendFormData.rejected, state => {state.formState = 'error'})
    }
});

export default customerRequestFormSlice.reducer;
export const { setCoordinates, setFormData, setSearchResult } = customerRequestFormSlice.actions;