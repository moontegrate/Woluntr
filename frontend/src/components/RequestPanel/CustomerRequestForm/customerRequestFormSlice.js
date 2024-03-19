import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { postRequest, _apiBase } from "../../../services/http";

// Исходные состояния (состояния по умолчанию)
const initialState = {
    formData: {
        orderDesc: '',
        orderAddress: '',
        note: ''
    },
    formState: 'idle'
};

export const sendFormData = createAsyncThunk(
    'customRequestForm/sendFormData',
    async (data) => {
        return await postRequest(`${_apiBase}order/`, data, {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        });
    }
);

const customerRequestFormSlice = createSlice({
    name: 'customerRequestForm',
    initialState,
    reducers: {
        setFormData: (state, action) => {state.formData = action.payload}
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendFormData.pending, state => {state.formState = 'sending'})
        .addCase(sendFormData.fulfilled, state => {state.formState = 'idle'})
        .addCase(sendFormData.rejected, state => {state.formState = 'error'})
    }
});

export default customerRequestFormSlice.reducer;
export const { setFormData } = customerRequestFormSlice.actions;