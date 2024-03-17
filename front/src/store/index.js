import { configureStore } from '@reduxjs/toolkit';

import appMode from '../components/AppMode/appModeSlice';
import header from '../components/Header/headerSlice';
import loginModal from '../components/LoginModal/loginModalSlice';

const store = configureStore({
    reducer: {
        appMode,
        header,
        loginModal
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;