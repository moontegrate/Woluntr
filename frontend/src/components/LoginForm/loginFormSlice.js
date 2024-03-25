import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { _server, postRequest } from "../../services/http";

// Исходные состояния (состояния по умолчанию)
const initialState = {
    formData: {
        email: '',
        password: '',
        rememberMe: false
    },
    formState: 'idle'
};

export const authorize = createAsyncThunk(
    'loginForm/authorize',
    async (data) => {
        return await postRequest(`${_server}/auth/jwt/create/`, data, {
            "Accept": "application/json"
        });
    }
);

const loginFormSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        setFormData: (state, action) => {state.formData = action.payload}
    },
    extraReducers: (builder) => {
        builder
        .addCase(authorize.pending, state => {state.formState = 'sending'})
        .addCase(authorize.fulfilled, (state, action) => {
            state.formState = 'idle';
        })
        .addCase(authorize.rejected, state => {
            state.formState = 'idle';
        })
    }
});

export default loginFormSlice.reducer;
export const { setFormData } = loginFormSlice.actions;