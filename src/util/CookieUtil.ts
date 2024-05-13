import {Cookies} from "react-cookie";

const cookies = new Cookies()

class CookieUtil {
    public static saveCookie = (name :string, value : string, days:number = 1)=>{
        const expires = new Date();
        expires.setUTCDate(expires.getUTCDate()+days)
        return cookies.set(name,value,{expires:expires,path:'/'})
    }
    public static getCookie = (name : string)=>{
        return cookies.get(name)
    }
    public static removeCookie = (name : string, path:string = '/')=>{
        cookies.remove(name, {path:path})
    }
}
export default CookieUtil;