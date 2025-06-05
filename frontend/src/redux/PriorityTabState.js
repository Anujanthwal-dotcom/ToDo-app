import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:'high',
}

const slice = createSlice({
    name : 'priorityTabState',
    initialState,
    reducers:{
        setHigh : (state)=>{
            state.value = 'high'
        },
        setMedium:(state)=>{
            state.value = 'medium'
        },
        setLow:(state)=>{
            state.value = 'low'
        }
    }
})

export const {setHigh,setMedium,setLow} = slice.actions;

export default slice.reducer;
