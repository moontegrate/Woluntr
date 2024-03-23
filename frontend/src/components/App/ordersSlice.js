// RTK
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

// http
import { getRequest } from "../../services/http";

// notifications
import toast from "react-hot-toast";

export const ordersAdapter = createEntityAdapter();

const initialState = ordersAdapter.getInitialState({
    ordersLoadingState: 'idle',
});

export const getAllOrders = createAsyncThunk(
    'orders/getAllOrders',
    async () => {
        return await getRequest('http://localhost:8000/api/v1/orders/', {
            "Accept": "application/json"
        });
    }
);

const orders = createSlice({
    name: 'orders',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllOrders.pending, (state) => {state.ordersLoadingState = 'fetching'})
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.ordersLoadingState = 'idle';
            ordersAdapter.setAll(state, action.payload);
        })
        .addCase(getAllOrders.rejected, () => {
            toast('Упс! Что-то пошло не так.', {
                position: 'bottom-right',
                icon: '😰'
            });
        })
    }
});

export default orders.reducer;
export const { selectAll, selectById } = ordersAdapter.getSelectors(state => state.orders);