import {combineReducers, configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { persistReducer } from "redux-persist";
import loginSlice from "./silce/loginSlice";
import memberSlice from "./silce/memberSlice";
import storage from "redux-persist/lib/storage"
const reducers = combineReducers({
    member : memberSlice
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['member'],
}

const persistedReducer = persistReducer(persistConfig, reducers)



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
        "member" : memberSlice,
        persistedReducer,
    },

})
export let { changeIconOpen } = isIconOpen.actions;
export let { changeIsNavOpenTrue , changeIsNavOpenFalse }  = isNavOpen.actions
export let {changeIsModalOpenTrue, changeIsModalOpenFalse}  = isModalOpen.actions;
export let { changeIsLoginModalOpenTrue, changeIsLoginModalOpenFalse } = isLoginModalOpen.actions;