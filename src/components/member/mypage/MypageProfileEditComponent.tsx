import React from 'react';
import {useNavigate} from "react-router-dom";
import {SettingTapBox, SettingTapContents, SettingTapContentsBox} from "./MypageSettingComponent";

function MypageProfileEditComponent() {
    const navigate = useNavigate();
    return (
        <div style={{width:"90%",margin:"0 auto"}}>
        <SettingTapContentsBox>
            <SettingTapBox>
                <SettingTapContents onClick={() => {
                    navigate("/members/mypage")
                }}>
                    정보
                </SettingTapContents>
                <SettingTapContents onClick={() => {
                    navigate("/members/mypage/edit")
                }}>
                    편집
                </SettingTapContents>
            </SettingTapBox><br/><br/>
            <h2>프로필 편집</h2>
        </SettingTapContentsBox>
        </div>
    );
}

export default MypageProfileEditComponent;