// RTK
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Запросы на сервер
import { getRequest, _apiBase } from "../../services/http";

// Уведомления
import toast from "react-hot-toast";

const initialState = {
    data: {
        firstName: '',
        lastName: '',
        email: ''
    },
    dataState: 'idle'
};

export const getCurrentUserInfo = createAsyncThunk(
    'appUser/getCurrentUserInfo',
    async (data) => {
        return await getRequest(`${_apiBase}user/`, data, {
            "Accept": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        });
    }
);

const appUser = createSlice({
    name: 'appUser',
    initialState,
    reducers: {
        setData: (state, action) => {state.data = action.payload}
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCurrentUserInfo.pending, (state) => {state.dataState = 'fetching'})
        .addCase(getCurrentUserInfo.fulfilled, (state, action) => {
            state.dataState = 'idle';
            setData(action.payload);
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
export const { setData } = appUser.actions;