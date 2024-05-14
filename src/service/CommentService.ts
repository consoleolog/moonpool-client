import axios from "axios";
import {CommentDataType} from "../types/CommentTypes";

const host =`http://localhost:8080/mp/comments`

class CommentService {
    public static getList = async (problemId: string | undefined, pageNum: string) => {
        let result = await axios.get(`${host}/${problemId}/${pageNum }`);
        return result.data;
    }
    public static post = async (commentData : CommentDataType) => {
        if ( commentData.content===""){
            return "내용을 채워주세요!"
        }
        const result = await axios.post(`${host}/post`, commentData)
        return result.data;
    }
}
export default CommentService;