import { configureStore } from '@reduxjs/toolkit';

import appMode from '../components/AppMode/appModeSlice';
import header from '../components/Header/headerSlice';

const store = configureStore({
    reducer: {
        appMode,
        header
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;