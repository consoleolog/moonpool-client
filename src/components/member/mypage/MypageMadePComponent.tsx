import React from 'react';
import {useNavigate} from "react-router-dom";
import {SettingTapBox, SettingTapContents, SettingTapContentsBox} from './MypageSettingComponent';

function MypageMadePComponent() {
    const navigate = useNavigate();
    return (
        <div style={{width:"90%",margin:"0 auto"}}>
        <SettingTapContentsBox>
            <SettingTapBox>
            <SettingTapContents onClick={() => {
                navigate("../made")
            }}>
                만든 문제
            </SettingTapContents>
            <SettingTapContents onClick={() => {
                navigate("../buy")
            }}>
                구매한 문제
            </SettingTapContents>
            </SettingTapBox><br/><br/>
            <h2>만든 문제</h2>
        </SettingTapContentsBox>
        </div>
    );
}

export default MypageMadePComponent;