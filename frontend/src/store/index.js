import { configureStore } from '@reduxjs/toolkit';

import appMode from '../components/AppMode/appModeSlice';
import appUser from '../components/App/appUserSlice';
import customerRequestForm from '../components/RequestPanel/CustomerRequestForm/customerRequestFormSlice';
import header from '../components/Header/headerSlice';
import loginForm from '../components/LoginForm/loginFormSlice';
import loginModal from '../components/LoginModal/loginModalSlice';
import map from '../components/Map/mapSlice';
import profileModal from '../components/ProfileModal/profileModalSlice';
import registerModal from '../components/RegisterModal/registerModalSlice';
import settingsModal from '../components/SettingsModal/settingsModalSlice';

const store = configureStore({
    reducer: {
        appMode,
        appUser,
        customerRequestForm,
        header,
        loginForm,
        loginModal,
        map,
        profileModal,
        registerModal,
        settingsModal
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;