import axios from "axios";

const host =`http://localhost:8080/mp/comments`

class CommentService {
    public static getList = async (problemId: string | undefined, pageNum: string) => {
        let result = await axios.get(`${host}/${problemId}/${pageNum }`);
        return result.data;
    }
}
export default CommentService;