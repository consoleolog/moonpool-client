import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const loginCheck = createSlice({
    name : "loginCheck",
    initialState : false,
    reducers : {
        changeLoginCheck : (state,action:PayloadAction<boolean>)=>{
            sessionStorage.setItem("loginCheck",JSON.stringify(action.payload));
            return action.payload;
        }
    }
})

export default loginCheck.reducer;
export const {changeLoginCheck} = loginCheck.actions