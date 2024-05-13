import React, {lazy, useEffect, useState} from 'react';
import styled from "styled-components";
import { CustomBanner, CustomBannerAside, CustomBannerBox} from "../../Global.style";
import {Link, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../index";
import problemService from "../../service/ProblemService";
import {ProblemDataType} from "../../types/ProblemTypes";
import memberRepository from "../../repository/MemberRepository";
import CommentComponent from "../comment/CommentComponent";

const initState = {
    problemId : null,
    title : "",
    price : 0,
    description : "",
    category : "",
    level : "",
    answer : 0,
    quizList :  [],
    answerList :  [],
    delFlag : false,
    writerId : ""
}

function DetailComponent() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {problemId} = useParams();
    const [serverData, setServerData] = useState<ProblemDataType>(initState);
    const [userId, setUserId] = useState<any>();
    const check = useSelector((state:RootState)=>{return state.loginCheck})
    useEffect(() => {
        if (problemId != null) {
            problemService.getOne(problemId).then((response) => {
                console.log(response)
                let copy = {...response}
                setServerData(copy)
            })
        }
        if(check){
            setUserId(memberRepository.getUserId())
        }
    }, [problemId]);

    return (
        <>
            <CustomBannerBox>
                <CustomBanner>
                    <Link to={"/"}><small>HOME</small></Link><br/><br/><br/>
                    <p style={{fontSize: "25px"}}>{serverData.title}</p><br/>
                    <small>{serverData.category}</small>&nbsp;
                    <small>{serverData.level}</small>
                </CustomBanner>
                <CustomBannerAside>
                </CustomBannerAside>
            </CustomBannerBox>

            <DetailBox>
                <div style={{width: "95%", margin: "0 auto"}}><br/><br/><br/>
                    <div style={{padding:"0 50px"}}>
                        <strong>문제 설명</strong><br/><br/><br/>
                        <p>{serverData.description}</p>
                    </div>
                    {/*<QuizImg src={"https://placehold.co/600x400"}/>*/}
                    {/*<QuizImg src={`http://localhost:8080/mp/problems/view/${serverData.quizImgName}`} />*/}

                </div>
            </DetailBox>
            <AsideBox>
                {
                    userId === serverData.writerId ?
                        <Aside style={{height:"300px"}}>
                            <div style={{width: "90%", margin: "0 auto"}}>
                                <CartAddBtn style={{marginTop:"30px"}} onClick={()=>{

                                }}>
                                    문제 수정하기
                                </CartAddBtn>
                                <ProblemDeleteBtn onClick={()=>{

                                }}>
                                    문제 삭제하기
                                </ProblemDeleteBtn>
                                <h4 className={"font-xl mt-20"}>100C</h4>
                            </div>
                        </Aside> :
                        <Aside>
                            <div style={{width: "90%", margin: "0 auto"}}>
                                <PurchaseBtn onClick={()=>{

                                }}>
                                    답지 구매하기
                                </PurchaseBtn>
                                <CartAddBtn onClick={()=>{

                                }}>
                                    장바구니 추가
                                </CartAddBtn>
                                <h4 className={"font-xl mt-20"}>100C</h4>
                                <div><AnswerInput
                                                  name={"answer"} placeholder={"정답을 맞춰보세요!!"}/></div>
                                <div>
                                    <AnswerBtn onClick={()=>{

                                    }}>
                                        정답 제출하기
                                    </AnswerBtn>
                                </div>

                            </div>
                        </Aside>
                }
            </AsideBox>

            <CommentComponent userId={userId}/>

        </>
    );
}
const QuizImg = styled.img`
    width: 100%;
    border-radius: 5px;
    margin: 40px auto;
`
const DetailBox = styled.div`
    width: 70%;
    height: 100%;
    float: left;
    @media screen and (max-width : 975px) {
        width: 100%;
        float: none;
    }
    background-color: #fff;
`
const AsideBox = styled.aside`
    width: 30%;
    height: 100%;
    float: right;
    background-color: #fff;
    @media screen and (max-width : 975px) {
        width: 100%;
        float: none;
    }
`
const Aside = styled.aside`
    width: 95%;
    height: 430px;
    margin: 10px auto;
    border: 1px solid rgb(230,230,230);
    background-color: rgb(250,250,250);
    text-align: center;

`
const PurchaseBtn = styled.button`
    height: 70px;
    border-radius: 5px;
    margin: 40px 0 auto;
    background-color: rgb(82, 138, 207);
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    border: none;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        background-color: rgb(66, 116, 174);
    }
`
const CartAddBtn = styled.button`
    height: 70px;
    border-radius: 5px;
    margin: 10px auto;
    background-color: rgb(93, 93, 93);
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    border: none;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        background-color: rgb(66, 66, 66);
    }
`
const ProblemDeleteBtn = styled.button`
    height: 70px;
    border-radius: 5px;
    margin: 10px auto;
    background-color: rgb(237,98,91);
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    border: none;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        background-color: rgb(223, 79, 73);
    }
`
const AnswerInput = styled.input`
    width: 200px;
    padding: 5px 10px;
    margin-top: 30px;
    height: 30px;
    border: solid 1.5px rgb(225, 225, 225);
    color: rgb(161, 161, 161);
    &:focus {
        outline: none;
    }
`
const AnswerBtn = styled.button`
    width: 180px;
    padding: 5px 10px;
    height: 50px;
    border: none;
    background-color: rgb(237,98,91);
    color: #fff;
    border-radius: 3px;
    margin-top: 20px;
    font-weight: 300;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
        background-color: rgb(223, 79, 73);
    }
`
export default DetailComponent;