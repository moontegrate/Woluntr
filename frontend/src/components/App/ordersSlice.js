// RTK
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// http
import { getRequest } from "../../services/http";

// notifications
import toast from "react-hot-toast";

const initialState = {
    orders: [],
    ordersLoadingState: 'idle',
};

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
        setOrders: (state, action) => {state.orders = action.payload}
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllOrders.pending, (state) => {state.ordersLoadingState = 'fetching'})
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.ordersLoadingState = 'idle';
            state.orders = action.payload;
        })
        .addCase(getAllOrders.rejected, () => {
            toast('Упс! Что-то пошло не так.', {
                position: 'bottom-right',
                icon: '😰'
            });
        })
        .addDefaultCase(() => {})
    }
});

export default orders.reducer;
export const { setOrders } = orders.actions;