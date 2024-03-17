import { configureStore } from '@reduxjs/toolkit';

import appMode from '../components/AppMode/appModeSlice';
import header from '../components/Header/headerSlice';
import loginModal from '../components/LoginModal/loginModalSlice';
import registerModal from '../components/RegisterModal/registerModalSlice';

const store = configureStore({
    reducer: {
        appMode,
        header,
        loginModal,
        registerModal
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;