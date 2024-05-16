import axios from "axios";
import {ProblemDataType, ProblemEditParamType, ProblemParamTypes} from "../types/ProblemTypes";
import jwtAxios from "../util/jwtUtil";

const host = `http://localhost:8080/mp/problems`
const host1 = `http://localhost:8080/mp/login/problems`
class ProblemService {

    public static getList = async (pageNum: string | undefined, category: string | undefined)=>{
        let result = await axios.get(`${host}/${category}/${pageNum}`)
        return result.data;
    }
    public static changeCategory = (category:string | undefined)=>{
        switch(category){
            case "korean":
                return category = "국어"

            case "math":
                return category = "수학"

            case "english":
                return category="영어"

            case "social":
                return category="사회 탐구"

            case "science":
                return category="과학 탐구"

        }
    }
    public static getOne = async (problemId : string) =>{
        let result = await axios.get(`${host}/detail/${problemId}`)
        return result.data;
    }
    public static deleteOne = async (problemId : string, memberId : string) =>{
        const result = await jwtAxios.delete(`${host1}-user/delete/${problemId}?memberId=${memberId}`)
        return result.data;
    }
    static modify = async (problemData : ProblemEditParamType, quizList :any[], answerList :any) => {
        if (problemData.title === ""){
            return "제목을 확인해주세요!"
        }
        if (problemData.price < 0){
            return "가격은 음수일수 없습니다!"
        }
        const price = problemData.price as unknown as string
        const category = problemData.category as unknown as string
        const writerId = problemData.writerId as unknown as string
        const answer = problemData.answer as unknown as unknown as string
        let formData = new FormData();
        formData.append("problemId",problemData.problemId)
        formData.append("title",problemData.title)
        formData.append("price",price)
        formData.append("description",problemData.description)
        formData.append("level",problemData.level)
        formData.append("category",category)
        formData.append("writerId",writerId)
        formData.append("answer",answer)
        for (let i = 0; i < quizList.length; i++) {
            formData.append("quizFiles", quizList[i])
        }
        for (let i = 0; i < answerList.length; i++) {
            formData.append("answerFiles", answerList[i])
        }
        const headers = {headers : {'Content-Type':'multipart/form-data'}}
        let result = await jwtAxios.post(`${host1}-user/modify`,formData,headers)
        return result.data;
    }
    public static  register = async (problemData: ProblemParamTypes, quizList: any[], answerList: any[])=>{
        if (problemData.title === ""){
            return "제목을 확인해주세요!"
        }
        if (problemData.price < 0){
            return "가격은 음수일수 없습니다!"
        }
        if (quizList.length < 0 || quizList.length === 0){
            return "문제 사진을 확인해주세요! 사진은 최소 한장은 입력해야합니다!"
        }
        if (answerList.length < 0 || answerList.length === 0){
            return "답지 사진을 확인해주세요!"
        }
        const price = problemData.price as unknown as string
        const category = problemData.category as unknown as string
        const writerId = problemData.writerId as unknown as string
        const answer = problemData.answer as unknown as unknown as string
        let formData = new FormData();
        formData.append("title",problemData.title)
        formData.append("price",price)
        formData.append("description",problemData.description)
        formData.append("level",problemData.level)
        formData.append("category",category)
        formData.append("writerId",writerId)
        formData.append("answer",answer)
        for (let i = 0; i < quizList.length; i++) {
            formData.append("quizFiles", quizList[i])
        }
        for (let i = 0; i < answerList.length; i++) {
            formData.append("answerFiles", answerList[i])
        }
        const headers = {headers : {'Content-Type':'multipart/form-data'}}
        let result = await jwtAxios.post(`${host1}-user/post`,formData,headers)
        return result.data;
    }

}
export default ProblemService;