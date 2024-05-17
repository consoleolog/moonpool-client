import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {SettingTapBox, SettingTapContents, SettingTapContentsBox} from "./MypageSettingComponent";
import {HR} from "../../../Global.style";
import {WriteBasicInput, WriteBasicSelect} from "../../problem/WriteComponent";
import memberRepository from "../../../repository/MemberRepository";
import {MemberDataType} from "../../../types/MemberTypes";
import memberService from "../../../service/MemberService";
import styled from "styled-components";
import {message} from "antd";

const initState = {
    memberId : "",
    username : "",
    displayName : "",
    intro : "",
    educationState : "",
    coin : 0
}
function MypageProfileEditComponent() {
    const navigate = useNavigate();
    const memberId = memberRepository.getUserId()
    const [serverData, setServerData] = useState<MemberDataType>(initState);
    const [messageApi, contextHolder] = message.useMessage();
    const error = (content:string) => {
        messageApi.open({
            type: 'error',
            content: `${content}`,
            duration : 1,
        });
    };
    useEffect(() => {
        memberService.getUserData(memberId).then(response=>{
            let copy = {...response}
            setServerData(copy);
        })
    }, []);
    const handleChange = (e:any)=>{
        serverData[e.target.name] = e.target.value;
        setServerData({...serverData});
    }
    const handleEdit = ()=>{
        memberService.editUserData(serverData).then(response=>{
            console.log(response)
            if(response === "DisplayName_Blank"){
                error("닉네임을 확인해주세요!")
            } else if (response==="SUCCESS"){
                alert("수정 완료")
                window.location.reload()
            }

        })
    }
    return (
        <div style={{width:"90%",margin:"0 auto"}}>
            {contextHolder}
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
                <HR/><br/>
                {
                    serverData && serverData ?
                        <>
                            <p>닉네임</p><br/>
                            <WriteBasicInput onChange={handleChange} name={"displayName"} value={serverData.displayName}/>
                            <br/><br/><br/>
                            <p>한줄소개</p><br/>
                            <WriteBasicInput onChange={handleChange} name={"intro"} value={serverData.intro}/>
                            <br/><br/><br/>
                            <p>현재 학력</p><br/>
                            <WriteBasicSelect onChange={handleChange} name={"educationState"} value={serverData.educationState}>
                                <option value="elementSchool">초등학생</option>
                                <option value="middleSchool">중학생</option>
                                <option value="highSchool">고등학생</option>
                                <option value="university">대학생</option>
                            </WriteBasicSelect>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            <button onClick={handleEdit}>수정</button>
                        </> : <></>
                }

            </SettingTapContentsBox>
        </div>
    );
}
const ModfiyBtn = styled.button`
    border: none;
    
`
export default MypageProfileEditComponent;