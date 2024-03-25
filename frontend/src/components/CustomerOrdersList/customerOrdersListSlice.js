// RTK
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// http
import { getRequest, _server } from "../../services/http";

// notifications
import toast from "react-hot-toast";

const initialState = {
    orders: null,
    ordersLoadingState: 'idle',
};

export const getAllPersonalOrders = createAsyncThunk(
    'customerOrdersList/getAllPersonalOrders',
    async () => {
        return await getRequest(`${_server}/api/v1/orders/my/`, {
            "Accept": "application/json",
            'Authorization': `JWT ${localStorage.getItem('access_token')}`
        });
    }
);

const customerOrdersList = createSlice({
    name: 'customerOrdersList',
    initialState,
    reducers: {
        setOrders: (state, action) => {state.orders = action.payload}
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllPersonalOrders.pending, (state) => {state.ordersLoadingState = 'fetching'})
        .addCase(getAllPersonalOrders.fulfilled, (state, action) => {
            state.ordersLoadingState = 'idle';
            state.orders = action.payload;
        })
        .addCase(getAllPersonalOrders.rejected, () => {
            toast('Упс! Что-то пошло не так.', {
                position: 'bottom-right',
                icon: '😰'
            });
        })
        .addDefaultCase(() => {})
    }
});

export default customerOrdersList.reducer;
export const { setOrders } = customerOrdersList.actions;