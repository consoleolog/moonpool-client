import cookieUtil from "../util/CookieUtil";
import {MemberLoginResponseType} from "../types/MemberTypes";

class MemberRepository {

    static saveUserData = (userData:MemberLoginResponseType) => {
        cookieUtil.saveCookie("userCookie",JSON.stringify(userData));
        cookieUtil.saveCookie("userId",userData.memberId)
    }
    static removeUserData = ()=>{
        cookieUtil.removeCookie("userCookie")
        cookieUtil.removeCookie("userId")
    }
    static loginTrue = () => {
        sessionStorage.setItem("loginCheck",JSON.stringify(true))
    }
    static loginFalse = () => {
        sessionStorage.setItem("loginCheck",JSON.stringify(false))
    }
    static getLoginCheck = () :boolean => {
        return cookieUtil.getCookie("userId")
    }
    static getUserId = () => {
        return cookieUtil.getCookie("userId")
    }
    static getUserDisplayName = () => {

    }



}
export default MemberRepository;