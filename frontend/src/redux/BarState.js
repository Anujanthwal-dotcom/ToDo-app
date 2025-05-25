import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value:'today',
};

const slice=createSlice({
    name : 'sidebarState',
    initialState,
    reducers:{
        setToday : (state)=>{
            state.value = 'today'
        },
        setLatest:(state)=>{
            state.value = 'latest'
        },
        setPriority:(state)=>{
            state.value = 'priority'
        }
    }
});

export const {setToday,setLatest,setPriority} = slice.actions;

export default slice.reducer;


