// RTK
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

// Запросы на сервер
import { getRequest } from "../../services/http";

// Уведомления
import toast from "react-hot-toast";

export const appUserAdapter = createEntityAdapter();

const initialState = appUserAdapter.getInitialState({
    data: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        profilePic: ''
    },
    dataState: 'idle',
    isAuthorized: false
});

export const getCurrentUserInfo = createAsyncThunk(
    'appUser/getCurrentUserInfo',
    async () => {
        return await getRequest('http://localhost:8000/api/v1/users/me/', {
            "Accept": "application/json",
            'Authorization': `JWT ${localStorage.getItem('access_token')}`
        });
    }
);

const appUser = createSlice({
    name: 'appUser',
    initialState,
    reducers: {
        setData: (state, action) => {state.data = action.payload},
        setIsAuthorized: (state, action) => {state.isAuthorized = action.payload}
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCurrentUserInfo.pending, (state) => {state.dataState = 'fetching'})
        .addCase(getCurrentUserInfo.fulfilled, (state, action) => {
            state.dataState = 'idle';
            state.data = action.payload;
        })
        .addCase(getCurrentUserInfo.rejected, () => {
            toast('Упс! Что-то пошло не так.', {
                position: 'bottom-right',
                icon: '😰'
            });
        })
    }
});

export default appUser.reducer;
export const { setData, setIsAuthorized } = appUser.actions;