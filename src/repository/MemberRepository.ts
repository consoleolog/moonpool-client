import cookieUtil from "../util/CookieUtil";
import {MemberDataType} from "../types/MemberTypes";

class MemberRepository {

    public static saveUserData = (userData:object) => {
        cookieUtil.saveCookie("userCookie",JSON.stringify(userData));
    }
    public static getUserData = () => {
        let userData :MemberDataType =  cookieUtil.getCookie("userCookie")

        return {
            memberId: userData.memberId,
            username: userData.username,
            displayName: userData.displayName,
            intro: userData.intro,
            educationState: userData.educationState,
            coin: userData.coin,
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