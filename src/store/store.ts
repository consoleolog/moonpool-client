import { configureStore, createSlice} from '@reduxjs/toolkit'
import loginSlice from "./silce/loginSlice";

let isNavOpen = createSlice({
    name : "isNavOpen",
    initialState: "nav-close",
    reducers : {
        changeIsNavOpenTrue: (state : string) :string => {
            return "nav-open";
        },
        changeIsNavOpenFalse: (state : string) => {
            return "nav-close";
        }
    }
})
let isIconOpen = createSlice({
    name : "isIconOpen",
    initialState: false,
    reducers : {
        changeIconOpen : (state : boolean)=>{
            return !state;
        }
    }
})
let isModalOpen = createSlice({
    name : "isModalOpen",
    initialState : false,
    reducers : {
        changeIsModalOpenTrue : ()=>{
            return true;
        },
        changeIsModalOpenFalse : ()=> {
            return false;
        }
    }
})
let isLoginModalOpen = createSlice({
    name : "isLoginModalOpen",
    initialState : "opacity-0",
    reducers : {
        changeIsLoginModalOpenTrue : () => {
            return "opacity-1"
        },
        changeIsLoginModalOpenFalse : () => {
            return "opacity-0";
        }
    }
})


export default configureStore({
    reducer: {
        isModalOpen : isModalOpen.reducer,
        isIconOpen : isIconOpen.reducer,
        isNavOpen : isNavOpen.reducer,
        isLoginModalOpen : isLoginModalOpen.reducer,
        "loginSlice" : loginSlice,
    },

})
export let { changeIsNavOpenTrue , changeIsNavOpenFalse }  = isNavOpen.actions
export let {changeIsModalOpenTrue, changeIsModalOpenFalse}  = isModalOpen.actions;
export let { changeIsLoginModalOpenTrue, changeIsLoginModalOpenFalse } = isLoginModalOpen.actions;