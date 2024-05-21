import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { CustomBanner, CustomBannerAside, CustomBannerBox} from "../../Global.style";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import problemService from "../../service/ProblemService";
import {ProblemDataType} from "../../types/ProblemTypes";
import CommentComponent from "../comment/CommentComponent";
import cartService from "../../service/CartService";
import {message} from "antd";
import salesService from "../../service/SalesService";
import {SalesDataType} from "../../types/SalesTypes";
import {CartDataTypes} from "../../types/CartTypes";
import memberRepository from "../../repository/MemberRepository";
const initState = {
    problemId : null,
    title : "",
    price : 0,
    description : "",
    category : "",
    level : "",
    answer : 0,
    quizFileNames :  [],
    answerList :  [],
    delFlag : false,
    writerId : ""
}

function DetailComponent() {
    const navigate = useNavigate();
    const {problemId} = useParams();
    const [serverData, setServerData] = useState<ProblemDataType>(initState);
    const userId = memberRepository.getUserId()
    const [messageApi, contextHolder] = message.useMessage();
    const [answer, setAnswer] = useState<number>(0);
    const loginCheck = memberRepository.getLoginCheck()
    const [salesCheck, setSalesCheck] = useState<boolean>(false)
    // alert 에러 생성 함수
    const error = (content:string) => {
        messageApi.open({
            type: 'error',
            content: `${content}`,
            duration : 1,
        });
    };
    // alert success 생성 함수
    const success = (content:string) => {
        messageApi.open({
            type: 'success',
            content: `${content}`,
            duration : 1,
        });
    };
    const info = (content : string) => {
        messageApi.info(`${content}`);
    };
    // 장바구니 데이터
    const cartData = {
        problemId : problemId,
        ownerId : userId
    }
    // 구매 데이터
    const salesData = {
        problemId : problemId,
        memberId : userId
    }
    const answerData = {
        answer : answer,
        problemId : problemId,
        memberId : userId
    }
    const checkAnswer = () => {
        if (!loginCheck){
            info("로그인을 먼저 진행해주세요!")
        } else {
            salesService.answerCheck(answerData).then(response => {
                if (response === "INCORRECT") {
                    info("정답이 아닙니다")
                    setAnswer(0)
                } else if (response === "CORRECT") {
                    success("정답입니다! 100코인 지급 완료")
                    setAnswer(0)
                }
            })
        }
    }
    const moveToModify = (problemId: number | null) => {
        if (!loginCheck){
            info("로그인이 필요합니다")
        } else {
            navigate(`/problems/modify/${problemId}`)
        }
    }
    const cartHandleClick = (cartData : CartDataTypes) => {
        cartService.register(cartData).then(response=>{
            if (response === "ERROR"){
                error("에러가 발생했습니다!")
            } else if (response === "SUCCESS"){
                success("장바구니 추가 완료")
            }
        })
    }
    const registerCheck = () => {
        if (!loginCheck){
            error("로그인을 해주세요!")
        } else {
            cartService.registerCheck(cartData).then((response) => {
                if (response === "ALREADY_EXIST") {
                    error("이미 장바구니에 추가된 상품입니다")
                } else {
                    cartHandleClick(cartData)
                }
            }).catch((error) => {
                error("장바구니 추가 중 오류가 발생했습니다")
            })
        }
    }
    const purchase = (salesData:SalesDataType) => {
        salesService.purchase(salesData).then(response=>{
            if (response === "SUCCESS"){
                alert("답지 구매 완료")
                navigate(`/sales/items/answer/${problemId}`)
            } else if (response === "ERROR"){
                error("답지 구매 중 에러 발생!")
            }
        })
    }
    const purchaseCheck = () => {
        if (!loginCheck){
            error("로그인을 먼저 해주세요")
        } else {
            salesService.purchaseCheck(salesData).then(response => {
                if (response === "SUCCESS") {
                    purchase(salesData)
                } else if (response === "ALREADY_PURCHASED") {
                    error("이미 구매한 답지입니다")
                } else {
                    error("문제 등록 중 오류가 발생했습니다")
                }
            }).catch(err => {
                error("에러 발생")
            })
        }
    }
    const handleDelete = () => {
        if (typeof problemId === "string") {
            problemService.deleteOne(problemId, userId).then(response=>{
                alert("문제 삭제 완료")
                navigate(`../${serverData.category}/1`)
            }).catch(()=>error("삭제 중 오류 발생"))
        }
    }
    useEffect(() => {
        if (problemId != null) {
            problemService.getOne(problemId).then((response) => {
                let copy = {...response}
                setServerData(copy)
            })
        }
        if(userId!==undefined){
            if (typeof problemId === "string"){
                salesService.checkSalesOne(userId, problemId).then((response)=>{
                    if(response){
                        setSalesCheck(response)
                    }
                })
            }
        }
    }, [problemId]);
    return (
        <>
            <CustomBannerBox>
                {contextHolder}
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
                    {
                        serverData.quizFileNames.length !== 0 ?
                        serverData.quizFileNames.map((item:string)=>{
                            return (
                                <QuizImg key={item} src={`http://localhost:8080/mp/problems/view/${item}`}/>
                            )
                        }) :  <QuizImg src={"https://placehold.co/600x400"}/>
                    }
                </div>
            </DetailBox>
            <AsideBox>
                {
                    userId === serverData.writerId ?
                        <Aside style={{height:"300px"}}>
                            <div style={{width: "90%", margin: "0 auto"}}>
                                <CartAddBtn style={{marginTop:"30px"}} onClick={()=>moveToModify(serverData.problemId)}>
                                    문제 수정하기
                                </CartAddBtn>
                                <ProblemDeleteBtn onClick={handleDelete}>
                                    문제 삭제하기
                                </ProblemDeleteBtn>
                                <h4 className={"font-xl mt-20"}>{serverData.price}C</h4>
                            </div>
                        </Aside> :
                        salesCheck ?
                            <SmallAsideBox>
                                <div style={{width: "90%", margin: "0 auto"}}>
                                    <WatchAnswerBtn onClick={()=>navigate(`/sales/items/answer/${problemId}`)}>
                                        답지 보기
                                    </WatchAnswerBtn>
                                </div>
                            </SmallAsideBox>
                            :<Aside>
                                <div style={{width: "90%", margin: "0 auto"}}>
                                    <PurchaseBtn onClick={purchaseCheck}>
                                        답지 구매하기
                                    </PurchaseBtn>
                                    <CartAddBtn onClick={registerCheck}>
                                        장바구니 추가
                                    </CartAddBtn>
                                    <h4 className={"font-xl mt-20"}>{serverData.price}C</h4>
                                    <div><AnswerInput type={"number"} value={answer} onChange={(e:any)=>setAnswer(e.target.value)}
                                                      name={"answer"} placeholder={"정답을 맞춰보세요!!"}/></div>
                                    <div>
                                        <AnswerBtn onClick={checkAnswer}>
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
const SmallAsideBox = styled.aside`
    width: 95%;
    height: 230px;
    margin: 10px auto;
    border: 1px solid rgb(230,230,230);
    background-color: rgb(250,250,250);
    text-align: center;
`
const Aside = styled.aside`
    width: 95%;
    height: 430px;
    margin: 10px auto;
    border: 1px solid rgb(230,230,230);
    background-color: rgb(250,250,250);
    text-align: center;

`
const WatchAnswerBtn = styled.button`
    height: 70px;
    border-radius: 5px;
    margin: 70px 0 auto;
    background-color: rgb(99, 191, 203);
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    border: none;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        background-color: rgb(81, 183, 196);
    }
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