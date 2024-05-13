import React, {useEffect, useState} from 'react';
import {CustomBanner, CustomBannerAside, CustomBannerBox, CustomBannerBtn} from "../../Global.style";
import {Link} from "react-router-dom";
import styled from "styled-components";

function AnswerResultComponent() {
    const [serverData, setServerData] = useState<any>();

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
                    {/*<QuizImg src={"https://placehold.co/600x400"}/>*/}
                    {
                        serverData ? <QuizImg src={`http://localhost:8080/mp/problems/view/${serverData.answerImgName}`} /> : <></>
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