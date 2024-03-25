// RTK
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// http
import { _server, postRequest } from "../../../services/http";

// notifications
import toast from "react-hot-toast";

// initial state (default state)
const initialState = {
    formData: {
        title: '',
        location: null,
        latitude: null,
        longitude: null,
        description: ''
    },
    formState: 'idle',
    addressSearchResult: null
};

export const sendFormData = createAsyncThunk(
    'customRequestForm/sendFormData',
    async (data) => {
        return await postRequest(`${_server}/api/v1/orders/`, data, {
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
        setSearchResult: (state, action) => {state.addressSearchResult = action.payload}
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendFormData.pending, state => {state.formState = 'sending'})
        .addCase(sendFormData.fulfilled, state => {
            state.formState = 'idle';
            toast('Ура! Задание успешно создано.', {
                position: 'bottom-right',
                icon: '🤩'
            });
            state.formData = initialState.formData;
        })
        .addCase(sendFormData.rejected, state => {
            state.formState = 'error';
            toast('Упс! Что-то пошло не так. Повторите попытку.', {
                position: 'bottom-right',
                icon: '🫢'
            });
            state.formState = 'idle';
        })
        .addDefaultCase(() => {})
    }
});

export default customerRequestFormSlice.reducer;
export const { setFormData, setSearchResult } = customerRequestFormSlice.actions;