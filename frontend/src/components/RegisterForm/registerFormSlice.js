import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { postRequest } from "../../services/http";

// Исходные состояния (состояния по умолчанию)
const initialState = {
    formData: {
        firstName: '',
        email: '',
        password: '',
        repassword: ''
    },
    formState: 'idle'
};

export const register = createAsyncThunk(
    'registerForm/register',
    async (data, {dispatch}) => {
        const response = await postRequest('http://localhost:8000/auth/users/', data, {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
        });

        return response;
    }
);

const registerFormSlice = createSlice({
    name: 'registerForm',
    initialState,
    reducers: {
        resetForm: (state) => {state.formData = initialState.formData},
        setFormData: (state, action) => {state.formData = action.payload}
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, state => {state.formState = 'sending'})
        .addCase(register.fulfilled, (state) => {state.formState = 'idle'})
        .addCase(register.rejected, state => {state.formState = 'error'})
    }
});

export default registerFormSlice.reducer;
export const { resetForm, setFormData } = registerFormSlice.actions;