import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MemberDataType} from "../../types/MemberTypes";
import {RootState} from "../../index";



const initState : MemberDataType = {
    memberId : "",
    username : "",
    displayName : "",
    intro : "",
    educationState : "",
    coin : 0
}

const memberSlice = createSlice({
    name: "member",
    initialState: initState || "",
    reducers : {
        changeMember : (state:MemberDataType, action:PayloadAction<MemberDataType>) => {
            state.memberId = action.payload.memberId;
            state.username = action.payload.username;
            state.displayName = action.payload.displayName;
            state.intro = action.payload.intro;
            state.educationState = action.payload.educationState;
            state.coin = action.payload.coin;
        },
        logout : () => {
            return initState
        }
    }
})
export const {changeMember,logout} = memberSlice.actions;
export const selectMemberId = (state :RootState ) => {return state.member.memberId}
export const selectUsername = (state :RootState ) => {return state.member.username}
export const selectDisplayName = (state:RootState ) => {return state.member.displayName}
export default memberSlice.reducer