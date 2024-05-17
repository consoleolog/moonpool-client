import jwtAxios from "../util/jwtUtil";
import {CartDataTypes} from "../types/CartTypes";

const host = `http://localhost:8080/mp/carts`

class CartService {

    static register = async (cartData: CartDataTypes)=>{
        const result = await jwtAxios.post(`${host}/register`,cartData)
        return result.data;
    }
    static getList = async (memberId : string) => {
        const result = await jwtAxios.get(`${host}?memberId=${memberId}`)
        return result.data;
    }
    static delete = async (cartId : string,memberId : string) => {
        const result = await jwtAxios.delete(`${host}/delete/${cartId}?memberId=${memberId}`)
        return result.data;
    }
    static registerCheck = async (cartData: CartDataTypes)=> {
        const result = await jwtAxios.post(`${host}/register-check`, cartData)
        return result.data;
    }
    static deleteAll = async (memberId:string) => {
        const result = await jwtAxios.delete(`${host}/delete/all?memberId=${memberId}`)
        return result.data;
    }

}
export default CartService;