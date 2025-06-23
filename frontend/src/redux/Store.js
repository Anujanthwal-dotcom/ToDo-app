import { configureStore } from "@reduxjs/toolkit";
import BarStateReducer from './BarState';
import PriorityTabStateReducer from './PriorityTabState';
import AddTaskBoxStateReducer from './AddTaskBoxState';
import EditTaskBoxStateReducer from './EditTaskBoxState';
const store = configureStore({
    reducer:{
        EditTaskBoxState : EditTaskBoxStateReducer,
        BarState : BarStateReducer,
        PriorityTabState : PriorityTabStateReducer,
        AddTaskBoxState : AddTaskBoxStateReducer
    },
});

export default store;