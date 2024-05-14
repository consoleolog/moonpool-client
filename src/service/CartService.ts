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
    static delete = async (cartId : string) => {
        const result = await jwtAxios.delete(`${host}/delete/${cartId}`)
        return result.data;
    }

}
export default CartService;