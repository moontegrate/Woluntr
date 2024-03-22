import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { postRequest } from "../../services/http";

import { setIsAuthorized } from "../App/appUserSlice";
import { setIsModalOpen } from "../LoginModal/loginModalSlice";

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
    async (data, {dispatch}) => {
        const result = await postRequest('http://localhost:8000/auth/jwt/create/', data, {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
        });

        if (result.refresh && result.access) {
            dispatch(setIsAuthorized(true));
            dispatch(setIsModalOpen(false));
        };

        return result;
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
        .addCase(authorize.pending, state => {
            state.formState = 'fetching';
        })
        .addCase(authorize.fulfilled, (state, action) => {
            state.formState = 'idle';
            localStorage.setItem('refresh_token', action.payload.refresh)
            localStorage.setItem('access_token', action.payload.access)
        })
        .addCase(authorize.rejected, state => {state.formState = 'error'})
    }
});

export default loginFormSlice.reducer;
export const { setFormData } = loginFormSlice.actions;