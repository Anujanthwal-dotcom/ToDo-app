import { configureStore } from "@reduxjs/toolkit";
import BarStateReducer from './BarState';
import PriorityTabStateReducer from './PriorityTabState';
import AddTaskBoxStateReducer from './AddTaskBoxState';
const store = configureStore({
    reducer:{
        BarState : BarStateReducer,
        PriorityTabState : PriorityTabStateReducer,
        AddTaskBoxState : AddTaskBoxStateReducer
    },
});

export default store;