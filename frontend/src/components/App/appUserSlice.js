// RTK
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// http
import { getRequest, _server } from "../../services/http";

// notifications
import toast from "react-hot-toast";

const initialState = {
    data: {
        id: null,
        firstN_nme: '',
        last_name: '',
        email: '',
        avatar: ''
    },
    dataState: 'idle',
    isAuthorized: false
};

export const getCurrentUserInfo = createAsyncThunk(
    'appUser/getCurrentUserInfo',
    async () => {
        return await getRequest(`${_server}/api/v1/users/me/`, {
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
        .addDefaultCase(() => {})
    }
});

export default appUser.reducer;
export const { setData, setIsAuthorized } = appUser.actions;