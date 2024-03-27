import { configureStore } from '@reduxjs/toolkit';

import appMode from '../components/AppMode/appModeSlice';
import appUser from '../components/App/appUserSlice';
import customerOrderModal from '../components/CustomerOrderModal/customerOrderModalSlice';
import customerOrdersList from '../components/CustomerOrdersList/customerOrdersListSlice';
import customerRequestForm from '../components/RequestPanel/CustomerRequestForm/customerRequestFormSlice';
import header from '../components/Header/headerSlice';
import loginForm from '../components/LoginForm/loginFormSlice';
import loginModal from '../components/LoginModal/loginModalSlice';
import map from '../components/Map/mapSlice';
import orders from '../components/App/ordersSlice';
import registerForm from '../components/RegisterForm/registerFormSlice';
import registerModal from '../components/RegisterModal/registerModalSlice';
import settingsModal from '../components/SettingsModal/settingsModalSlice';
import volunteerOrderModal from '../components/VolunteerOrderModal/volunteerOrderModalSlice';
import volunteerOrderPersonalModal from '../components/VolunteerOrderPersonalModal/volunteerOrderPersonalModalSlice';
import volunteerOrdersList from '../components/VolunteerOrdersList/volunteerOrdersListSlice';

const store = configureStore({
    reducer: {
        appMode,
        appUser,
        customerOrderModal,
        customerOrdersList,
        customerRequestForm,
        header,
        loginForm,
        loginModal,
        map,
        orders,
        registerForm,
        registerModal,
        settingsModal,
        volunteerOrderModal,
        volunteerOrderPersonalModal,
        volunteerOrdersList
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;