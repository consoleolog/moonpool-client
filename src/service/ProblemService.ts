import axios from "axios";

const host = `http://localhost:8080/mp/problems`

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
}
export default ProblemService;