import {AnswerDataType, SalesDataType, SalesListDataTotalType, SalesListDataType} from "../types/SalesTypes";
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
    static purchaseAll = async (salesListData : SalesListDataTotalType) => {
        const result = await jwtAxios.post(`${host}/purchase-all`, salesListData)
        return result.data;
    }
    static answerCheck = async (answerData: AnswerDataType) => {
        const result = await jwtAxios.post(`${host}/answer/check`, answerData)
        return result.data;
    }
    static purchaseCheckAll = async (salesListData : SalesListDataType) => {
        if (salesListData.problemIdList.length === 0){
            return "LIST_BLANK"
        }
        const result = await jwtAxios.post(`${host}/purchased-check`, salesListData)
        return result.data;
    }
    static getSalesList = async (memberId : string)=>{
        const result = await jwtAxios.get(`${host}/get-sales-list/${memberId}`)
        return result.data;
    }
    static checkSalesOne = async (memberId : string, problemId : string) => {
        const result = await jwtAxios.get(`${host}/check-sales-one/${memberId}?problemId=${problemId}`)
        return result.data;
    }
}
export default SalesService;