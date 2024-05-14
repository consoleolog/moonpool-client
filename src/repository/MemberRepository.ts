import cookieUtil from "../util/CookieUtil";
import {MemberDataType} from "../types/MemberTypes";

class MemberRepository {

    public static saveUserData = (userData:object) => {
        cookieUtil.saveCookie("userCookie",JSON.stringify(userData));
    }
    public static getUserData = () => {
        return cookieUtil.getCookie("userCookie")
    }
    public static getUserCookie = () => {
        let userData = cookieUtil.getCookie("userCookie")
        return {
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken,
        }
    }
    public static removeUserData = ()=>{
        cookieUtil.removeCookie("userCookie")
    }
    public static getUserId = () => {
        return cookieUtil.getCookie("userCookie").memberId
    }
    public static getUserName = () => {
        return cookieUtil.getCookie("userCookie").username
    }

}
export default MemberRepository;