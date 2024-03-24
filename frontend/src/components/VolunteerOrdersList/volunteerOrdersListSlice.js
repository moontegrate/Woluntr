// RTK
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// http
import { getRequest, _server } from "../../services/http";

// notifications
import toast from "react-hot-toast";

// Redux
import { setTargetOrder } from "../VolunteerOrderPersonalModal/volunteerOrderPersonalModalSlice";

const initialState = {
    orders: null,
    ordersLoadingState: 'idle',
};

export const getAllPersonalOrders = createAsyncThunk(
    'volunteerOrdersList/getAllPersonalOrders',
    async () => {
        return await getRequest(`${_server}/api/v1/order-complete/`, {
            "Accept": "application/json",
            'Authorization': `JWT ${localStorage.getItem('access_token')}`
        });
    }
);

export const getOrder = createAsyncThunk(
    'volunteerOrdersList/getOrder',
    async (id, {dispatch}) => {
        const data = await getRequest(`${_server}/api/v1/orders/${id}`, {
            "Accept": "application/json",
            'Authorization': `JWT ${localStorage.getItem('access_token')}`
        });

        dispatch(setTargetOrder(data));
    }
);

const volunteerOrdersList = createSlice({
    name: 'volunteerOrdersList',
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

export default volunteerOrdersList.reducer;
export const { setOrders } = volunteerOrdersList.actions;