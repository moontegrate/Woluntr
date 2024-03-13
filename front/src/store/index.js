import { configureStore } from '@reduxjs/toolkit';

import appMode from '../components/AppMode/appModeSlice';

const store = configureStore({
    reducer: {
        appMode
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;