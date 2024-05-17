import React, {useEffect, useState} from 'react';
import {SettingProfileBox, SettingTapBox, SettingTapContents, SettingTapContentsBox} from "./MypageSettingComponent";
import {HR} from "../../../Global.style";
import {useNavigate} from "react-router-dom";
import memberService from "../../../service/MemberService";
import memberRepository from "../../../repository/MemberRepository";
import {MemberDataType} from "../../../types/MemberTypes";


function MypageProfileComponent() {
    const navigate = useNavigate();
    const memberId = memberRepository.getUserId()
    const [serverData, setServerData] = useState<MemberDataType>();
    useEffect(() => {
        memberService.getUserData(memberId).then(response=>{
            let copy = {...response}
            setServerData(copy);
        })
    }, []);
    return (
        <div style={{width:"90%",margin:"0 auto"}}>
        <SettingTapContentsBox>
            <SettingTapBox>
            <SettingTapContents onClick={()=>{navigate("/members/mypage")}}>
                정보
            </SettingTapContents>
            {/*<SettingTapContents onClick={()=>{navigate("./edit")}}>*/}
            {/*    편집*/}
            {/*</SettingTapContents>*/}
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
                    {
                        serverData && serverData ?
                            <>
                            <p>{serverData.displayName}</p><br/>
                                <p>{serverData.username}</p><br/>
                                <p>{serverData.educationState}</p><br/>
                                <p>{serverData.coin}C</p><br/>
                            </> : <></>
                    }


                </SettingProfileBox>
            </div>
        </SettingTapContentsBox>
        </div>
    );
}

export default MypageProfileComponent;