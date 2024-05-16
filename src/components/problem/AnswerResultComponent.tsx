import React, {useEffect, useState} from 'react';
import {CustomBanner, CustomBannerAside, CustomBannerBox, CustomBannerBtn} from "../../Global.style";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import problemService from "../../service/ProblemService";
import {ProblemDataType, ProblemDetailType} from "../../types/ProblemTypes";
const initState = {
    problemId : "",
    title : "",
    price : 0,
    description : "",
    category : "",
    level : "",
    answer : 0,
    quizFileNames :  [],
    answerList :  [],
    answerFileNames : [],
    writerId : ""
}

function AnswerResultComponent() {
    const [serverData, setServerData] = useState<ProblemDetailType>(initState);
    const {problemId} = useParams()
    useEffect(() => {
        if (typeof problemId === "string") {
            problemService.getOne(problemId).then(response=>{
                let copy = {...response}
                setServerData(copy)
            })
        }
    }, []);
    console.log(serverData)
    return (
        <>
            <CustomBannerBox>
                <CustomBanner>
                    <Link to={"/"}><small>HOME</small></Link><br/><br/><br/>
                    <p style={{fontSize:"25px"}}>답지 이미지</p>
                </CustomBanner>
                <CustomBannerAside>
                    <CustomBannerBtn>
                        돌아가기
                    </CustomBannerBtn>
                </CustomBannerAside>
            </CustomBannerBox>

            <DetailBox>
                <div style={{width: "95%", margin: "0 auto"}}><br/><br/><br/>
                    {
                        serverData.answerFileNames.length !== 0 ?
                            serverData.answerFileNames.map((item:string)=>{
                                return (
                                    <QuizImg key={item} src={`http://localhost:8080/mp/problems/view/${item}`}/>
                                )
                            }) :  <QuizImg src={"https://placehold.co/600x400"}/>
                    }
                </div>
            </DetailBox>
        </>
    );
}
const DetailBox = styled.div`
    width: 90%;
    height: 100%;
    margin: 0 auto;
`
const QuizImg = styled.img`
    width: 100%;
    border-radius: 5px;
    margin: 40px auto;
`
export default AnswerResultComponent;