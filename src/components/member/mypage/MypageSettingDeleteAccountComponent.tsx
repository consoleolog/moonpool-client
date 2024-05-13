import React from 'react';
import {useNavigate} from "react-router-dom";
import {SettingTapBox, SettingTapContents, SettingTapContentsBox} from "./MypageSettingComponent";

function MypageSettingDeleteAccountComponent() {
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
            <h2>계정 삭제</h2>
        </SettingTapContentsBox>
        </div>
    );
}

export default MypageSettingDeleteAccountComponent;