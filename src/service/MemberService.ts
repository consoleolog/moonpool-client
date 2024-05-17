import {MemberDataType, MemberLoginType, MemberRegisterType} from "../types/MemberTypes";
import axios from "axios";
import memberRepository from "../repository/MemberRepository";
import cookieUtil from "../util/CookieUtil";
import jwtAxios from "../util/jwtUtil";
export const host = `http://localhost:8080/mp/members`
const host1 = `http://localhost:8080/mp/login/members`
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
    static getUserData = async (memberId : string) => {
        const result = await jwtAxios.get(`${host1}-data?memberId=${memberId}`)
        return result.data
    }
    static editUserData = async (memberData :MemberDataType)=>{
        if (memberData.displayName === ""){
            return "DisplayName_Blank"
        }
        const result = await jwtAxios.post(`${host1}/update`,memberData)
        return result.data;
    }
}
export default MemberService;