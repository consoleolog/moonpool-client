import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import commentService from "../../service/CommentService";
import {useQuery} from "react-query";
import {CommentDataType} from "../../types/CommentTypes";
import {message} from "antd";

interface CommentComponentProps {
    userId?: any
}
function CommentComponent({userId}: CommentComponentProps) {
    const {problemId} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const commentPage = searchParams.get("commentPage");
    const navigate = useNavigate();
    const [sendCheck, setSendCheck] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const error = (content:string) => {
        messageApi.open({
            type: 'error',
            content: `${content}`,
            duration : 1,
        });
    };
    const initState: CommentDataType = {
        content: "",
        parentId: problemId,
        writerId: userId,
    }
    const [commentData, setCommentData] = useState<CommentDataType>(initState);
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        commentData[e.target.name] = e.target.value;
        setCommentData({...commentData});
    }
    let result = useQuery([problemId, searchParams.get("commentPage"),sendCheck], async () => {
        if ( commentPage !== null ){
            return commentService.getList(problemId, commentPage)
        }
    })
    const handleClick = () => {
        commentService.post(commentData).then((response) => {
            if (response === "내용을 채워주세요!"){error(response)}
            setSendCheck(!sendCheck)
            setCommentData({
                content: "",
                parentId: problemId,
                writerId: userId,
            })
        }).catch(()=>{
            error("댓글 작성 중 오류 발생")
        })
    }
    return (
        <CommentBoxContainer>
            {contextHolder}
            <CommentBox>
                {
                    result.isLoading ? <></> :
                        result.data.commentList.map((item: any, i: number) => {
                            return (
                                <div key={i}>
                                    <ProfileBox><br/>
                                        <strong>{item[1].displayName}</strong>
                                    </ProfileBox><br/>
                                    <Comment>
                                        <p>{item[0].content}</p>
                                    </Comment>
                                </div>
                            )
                        })
                }
            </CommentBox><br/>
            <PageNationBox>
                {
                    result.isLoading ? <></> :
                        result.data.numList.map((item: any, i: number) => {
                            return (
                                <PageBtn key={i} onClick={() => {
                                    navigate(`../detail/${problemId}?commentPage=${item}`)
                                }}>
                                    {item}
                                </PageBtn>
                            )
                        })
                }
            </PageNationBox>
            <CommentInput value={commentData.content} name={"content"} onChange={handleChange}/>
            <CommentBtn onClick={handleClick}>전송</CommentBtn>
            <br/><br/><br/><br/><br/><br/>
        </CommentBoxContainer>
    );
}

const CommentBoxContainer = styled.div`
    width: 70%;
    height: 100%;
    left: 50px;
    float: left;
    @media screen and (max-width: 975px) {
        width: 100%;
        float: none;
    }
`
const CommentBox = styled.div`
    width: 100%;
    height: 100%;
`
const ProfileBox = styled.div`
    width: 20%;
`
const CommentInput = styled.input`
    width: 300px;
    padding: 5px 10px;
    margin-top: 30px;
    height: 30px;
    border: solid 2px rgb(225, 225, 225);
    color: rgb(129, 129, 129);

    &:focus {
        outline: none;
    }

    @media screen and (max-width: 725px) {
        width: 200px;
    }
    @media screen and (max-width: 975px) {
        width: 150px;
    }
`
const Comment = styled.div`
    width: 70%;
    text-align: start;
    border-bottom: 1px solid rgb(235, 235, 235);

`
const CommentBtn = styled.button`
    width: 80px;
    height: 40px;
    border-radius: 2px;
    margin-left: 10px;
    background-color: #fff;
    color: rgb(82, 138, 207);
    font-size: 16px;
    font-weight: 400;
    border: solid 2px rgb(82, 138, 207);
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
        background-color: rgb(82, 138, 207);;
        color: #fff;
    }
`
const PageBtn = styled.button`
    width: 30px;
    height: 30px;
    font-weight: 550;
    border: solid 2px rgb(69, 136, 245);;
    background-color: transparent;
    color: rgb(69, 136, 245);
    margin: 0 5px;
    cursor: pointer;

    &:hover {
        background-color: rgb(69, 136, 245);
        color: #fff;
    }
`
const PageNationBox = styled.div`
    width: 80%;
    height: 35px;
    display: flex;
    justify-content: start;
    @media screen and (max-width: 725px) {
        width: 100%;
    }
`
export default CommentComponent;