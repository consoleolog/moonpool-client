import axios from "axios";
import cookieUtil from "./CookieUtil";

const jwtAxios = axios.create()

const refreshJWT = async (accessToken:string, refreshToken:string) => {
    const host = `http://localhost:8080/mp/refresh`
    // const host = `https://moonpool.shop/mp/refresh`
    const header = {headers:{'Authorization' : `Bearer ${accessToken}`}}
    const res = await axios.get(`${host}?refreshToken=${refreshToken}`, header)
    return res.data;
}

const beforeReq = (config:any ) => {
    const memberInfo = cookieUtil.getCookie("userCookie")

    if(!memberInfo){
        return Promise.reject(
            {response:{
                    data:
                        {error:"REQUIRE_LOGIN"}
                }
            }
        )
    }
    const accessToken = memberInfo.accessToken
    config.headers.Authorization = "Bearer " + accessToken
    return config
}

const requestFail = (err:any) => {
    return Promise.reject(err)
}

const beforeRes = async (res:any) => {

    const memberCookieValue = await cookieUtil.getCookie('userCookie')

    const data = res.data

    if(data && data.Error === "Error_Access_Token"){
        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)

        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken
        cookieUtil.saveCookie('userCookie', JSON.stringify(memberCookieValue), 1)
        const originalRequest = res.config
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return await axios(originalRequest);
    }
    return res
}

const responseFail = (err:any) => {
    return Promise.reject(err)
}

jwtAxios.interceptors.request.use(beforeReq,requestFail)
jwtAxios.interceptors.response.use(beforeRes,responseFail)

export default jwtAxios