import React from 'react';
import {SettingProfileBox, SettingTapBox, SettingTapContents, SettingTapContentsBox} from "./MypageSettingComponent";
import {HR} from "../../../Global.style";
import {useNavigate} from "react-router-dom";


function MypageProfileComponent() {
    const navigate = useNavigate();

    return (
        <div style={{width:"90%",margin:"0 auto"}}>
        <SettingTapContentsBox>
            <SettingTapBox>
            <SettingTapContents onClick={()=>{navigate("/members/mypage")}}>
                정보
            </SettingTapContents>
            <SettingTapContents onClick={()=>{navigate("./edit")}}>
                편집
            </SettingTapContents>
            </SettingTapBox><br/><br/>
            <h2>프로필</h2>
            <HR/><br/>
            <div style={{display: "flex"}}>
                <SettingProfileBox>
                    <p>이름 : </p><br/>
                    <p>이메일 : </p><br/>
                    <p>현재 학력 : </p><br/>
                    <p>보유 코인 : </p><br/>
                </SettingProfileBox>
                <SettingProfileBox>
                    {/*<p>{userInfo.displayName}</p><br/>*/}
                    {/*<p>{userInfo.username}</p><br/>*/}

                    {/*<p>{userInfo.educationState}</p><br/>*/}
                    {/*<p>{userInfo.coin}C</p><br/>*/}
                </SettingProfileBox>
            </div>
        </SettingTapContentsBox>
        </div>
    );
}

export default MypageProfileComponent;