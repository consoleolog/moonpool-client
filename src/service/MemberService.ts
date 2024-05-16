import {MemberLoginType, MemberRegisterType} from "../types/MemberTypes";
import axios from "axios";
import memberRepository from "../repository/MemberRepository";
import cookieUtil from "../util/CookieUtil";
export const host = `http://localhost:8080/mp/members`
class MemberService {

    public static login = async (loginData : MemberLoginType) => {
        if (loginData.username === ""){
            return "Username_Blank"
        }
        if ( loginData.password  === ""){
            return "Password_Blank"
        }
        let formData = new FormData();
        formData.append("username",loginData.username)
        formData.append("password",loginData.password)
        let result = await axios.post(`${host}/login`,formData)
        return result.data;
    }
    public static logout = () => {
        memberRepository.removeUserData()
    }
    static loginCheck = ():boolean => {
        return !!cookieUtil.getCookie("userCookie");
    }
    public static getUserData = async (username : string, memberId : string) => {
        let result = await axios.get(`${host}/get-user-data?username=${username}&memberId=${memberId}`)
        return result.data
    }
    public static register = async (registerData : MemberRegisterType) => {
        if (registerData.username === ""){
            return "Username_Blank"
        }
        if (registerData.displayName === ""){
            return "DisplayName_Blank"
        }
        if (registerData.intro === ""){
            return "Intro_Blank"
        }
        if (registerData.password  === ""){
            return "Password_Blank"
        }
        if (registerData.password !== registerData.passwordCheck) {
            return "Password_Error"
        }
        let result = await axios.post(`${host}/register`,registerData)
        return result.data;
    }

}
export default MemberService;