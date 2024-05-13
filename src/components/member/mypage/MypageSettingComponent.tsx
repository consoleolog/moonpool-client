import React from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

function MypageSettingComponent() {
    const navigate = useNavigate();
    return (
        <div style={{width:"90%",margin:"0 auto"}}>
        <SettingTapContentsBox>
        <SettingTapBox>
            <SettingTapContents onClick={()=>{navigate("/members/mypage/settings")}}>
                비밀번호 변경
            </SettingTapContents>
            <SettingTapContents onClick={()=>{navigate("/members/mypage/delete")}}>
                계정 삭제
            </SettingTapContents>
        </SettingTapBox><br/><br/>
            <h2>설정</h2>
            <SettingProfileBox>
                <p>현재 비밀번호</p>

            </SettingProfileBox>
        </SettingTapContentsBox>
        </div>
    );
}
export const SettingTapBox = styled.div`
    margin: 5px auto;
    height: 80px;
    background-color: rgb(250,250,250);
    max-width: 2000px;
    width: 100%;
    border-radius: 5px;
    border: solid 1px rgb(235,235,235);
    @media screen and (max-width : 1200px) {
        width: 1000px;
    }
    @media screen and (max-width : 975px) {
        width: 700px;
    }
    @media screen and (max-width : 725px) {
        width: 600px;
    }
`
export const SettingProfileBox = styled.div`
    width: 800px;
    height: 100%;
`
export const SettingTapContentsBox = styled.div`
    width: 400px;
    height: 100%;
    margin-left: 2%;
    
`
export const SettingTapContents = styled.button`
    width: 90px;
    height: 85%;
    margin-top: 5px;
    border: none;
    background-color: transparent;
    cursor : pointer;
    color: #424242;
    font-weight: 550;
`
export default MypageSettingComponent;