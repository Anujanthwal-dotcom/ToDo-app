import { configureStore } from "@reduxjs/toolkit";
import BarStateReducer from './BarState';

const store = configureStore({
    reducer:{
        BarState : BarStateReducer,
    },
});

export default store;