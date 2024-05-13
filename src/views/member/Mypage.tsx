import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import styled from "styled-components";

function Mypage() {
    const navigate = useNavigate();
    return (
        <>
            <MypageProfileBox>
                <ProfileImgBox>
                    <ProfileImg src={`${process.env.PUBLIC_URL}/graduate_5360916.png`} alt=""/>
                </ProfileImgBox>
                {/*<ProfileName>{userInfo.displayName}</ProfileName>*/}
            </MypageProfileBox>

            <ProfileTapBox>
                <ProfileTapContentsBox>
                    <ProfileTapContents onClick={()=>{
                        navigate("./")
                    }}>
                        프로필
                    </ProfileTapContents>
                    <ProfileTapContents onClick={()=>{
                        navigate("./settings")
                    }}>
                        설정
                    </ProfileTapContents>
                    <ProfileTapContents onClick={()=>{navigate("./made")}}>
                        내 활동
                    </ProfileTapContents>
                </ProfileTapContentsBox>
            </ProfileTapBox>
            {/*<SettingTapBox>*/}
            <Outlet/>
            {/*</SettingTapBox>*/}
            {/*// </div>*/}
        </>
    );
}
const MypageProfileBox = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgb(250,250,250);
    margin: 0 auto;
    padding: 10px;
    @media screen and (max-width : 975px) {
        height: 550px;
        width: 98%;
    }
    @media screen and (max-width : 725px) {
        height: 350px;
        width: 97%;
    }
`
const ProfileImgBox = styled.div`
    margin: 30px auto;
    width: 15%;
    min-width: 200px;
    max-width: 200px;
    @media screen and (max-width : 975px) {
        max-width: 550px;
        width: 40%;
    }
    @media screen and (max-width : 725px) {
        width: 15%;
    }
`
const ProfileImg = styled.img`
    width: 100%;
`
const ProfileName = styled.p`
    font-size: 25px;
    text-align: center;
    padding: 20px 0;
    font-weight: bold;
`
const ProfileTapBox = styled.div`
    width: 100%;
    height: 50px;
    border: solid 1px rgb(235,235,235);
`
const ProfileTapContentsBox = styled.div`
    width: 600px;
    height: 100%;
    margin-left: 5%;
    display: flex;
`
const ProfileTapContents = styled.button`
    width: 90px;
    border: none;
    background-color: transparent;
    padding: 0 10px;
    height: 100%;
    text-align: center;
    line-height: 50px;
    color: #424242;
    font-weight: 550;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
        color: gray;
    }
`
export default Mypage;