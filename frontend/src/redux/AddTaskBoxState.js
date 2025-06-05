import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value:false,
};

const slice=createSlice({
    name : 'addTaskBoxState',
    initialState,
    reducers:{
        setBoxActive : (state)=>{
            state.value = true
        },
        setBoxInactive:(state)=>{
            state.value = false
        }
    }
});

export const {setBoxActive,setBoxInactive} = slice.actions;

export default slice.reducer;


