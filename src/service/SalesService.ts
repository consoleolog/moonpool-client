import {SalesDataType} from "../types/SalesTypes";
import jwtAxios from "../util/jwtUtil";
import {Params} from "react-router-dom";
import axios from "axios";

const host = `http://localhost:8080/mp/sales`

class SalesService {

    static purchase = async (salesData : SalesDataType) => {
        const result = await jwtAxios.post(`${host}/purchase`, salesData)
        return result.data;
    }
    static purchaseCheck = async (salesData : SalesDataType) => {
        const result = await jwtAxios.post(`${host}/purchase-check`, salesData)
        return result.data;
    }
    static purchasedList = async (pageNum: string | undefined, memberId: string) => {
        const result = await jwtAxios.get(`${host}/purchased-list/${pageNum}?memberId=${memberId}`)
        return result.data;
    }
    static getMadeList = async (pageNum:string, memberId :string) => {
        const result = await jwtAxios.get(`${host}/made-list/${pageNum}?memberId=${memberId}`)
        return result.data;
    }
}
export default SalesService;