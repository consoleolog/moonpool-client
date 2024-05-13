import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MemberLoginType} from "../../types/MemberTypes";
import CookieUtil from "../../util/CookieUtil";

const initLoginData:MemberLoginType = {
    username : "",
    password : "",
}

const loginSlice = createSlice({
    name: "loginSlice",
    initialState : initLoginData,
    reducers : {
        handleChange : (state, action) => {

        },
        login : (state:MemberLoginType, action:PayloadAction<any>)=>{

        },
        logout : () => {
            CookieUtil.removeCookie("memberInfo");
        }
    }
})
export const {login} = loginSlice.actions
export default loginSlice.reducer