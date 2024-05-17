import React, {ChangeEvent, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Button, ConfigProvider, message} from "antd";
import {TinyColor} from "@ctrl/tinycolor";
import {CustomBanner, CustomBannerAside, CustomBannerBox} from "../../Global.style";
import {useDispatch} from "react-redux";
import {MemberRegisterType} from "../../types/MemberTypes";
import memberService from "../../service/MemberService";
const initState = {
    username : "",
    password : "",
    passwordCheck : "",
    displayName : "",
    intro : "",
    educationState : "middleSchool",
}
function RegisterCompontent() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const error = (content:string) => {
        messageApi.open({
            type: 'error',
            content: `${content}`,
            duration : 1,
        });
    };
    const success = (content:string) => {
        messageApi.open({
            type: 'success',
            content: `${content}`,
            duration : 1,
        });
    };
    const [registerData, setRegisterData] = useState<MemberRegisterType>(initState);
    const handleChange = (e:ChangeEvent<any>):void => {
        registerData[e.target.name] = e.target.value;
        setRegisterData({...registerData});
    }
    const register = () => {
        memberService.register(registerData).then((response)=>{
            if (response === "Username_Blank"){
                error("이메일을 확인해주세요!")
            }  else if (response === "DisplayName_Blank"){
                error("닉네임을 확인해주세요!")
            } else if (response === "Intro_Blank"){
                error("소개란을 확인해주세요!")
            } else if (response === "Password_Blank"){
                error("비밀번호를 확인해주세요!")
            } else if (response === "Password_Error"){
                error("비밀번호와 비밀번호 확인은 같아야 합니다!")
            }
            else {
                success("회원가입이 되었습니다!")
                navigate(response)
            }
        })
    }
    console.log(registerData)
    return (
        <>
            <CustomBannerBox>
                {contextHolder}
                <CustomBanner>
                    <Link to={"/"}><small>HOME</small></Link><br/><br/><br/>
                    <p style={{fontSize:"25px"}}>회원가입</p>
                </CustomBanner>
                <CustomBannerAside>
                </CustomBannerAside>
            </CustomBannerBox>
            <RegisterBox>
                <br/>
                <p>이메일 * </p><br/>
                <RegisterBasicInput name={"username"} onChange={handleChange} type="email" required={true}/>
                <br/><br/>
                <p>닉네임 *</p><br/>
                <RegisterBasicInput name={"displayName"} onChange={handleChange} required={true}/>
                <br/><br/>
                <p>한줄소개</p><br/>
                <RegisterBasicInput name={"intro"}  onChange={handleChange} required={true}/>
                <br/><br/>
                <p>현재 학력 *</p><br/>
                <RegisterBasicSelect defaultValue={"middleSchool"} name={"educationState"} onChange={handleChange}>
                    <option  value="elementSchool">초등학생</option>
                    <option value="middleSchool">중학생</option>
                    <option value="highSchool">고등학생</option>
                    <option value="university">대학생</option>
                </RegisterBasicSelect>
                <br/><br/>
                <p>비밀번호 *</p><br/>
                <RegisterBasicInput name={"password"} type={"password"} onChange={handleChange} required={true}/>
                <br/><br/>
                <p>비밀번호 확인 *</p><br/>
                <RegisterBasicInput name={"passwordCheck"} type={"password"} onChange={handleChange} required={true}/>
                <br/><br/><br/>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
                                colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                                colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                                lineWidth: 0,
                            },
                        },
                    }}
                >
                    <BtnBox>
                        <Button id={"btn"} type="primary" size="large" onClick={register} style={{
                            height: "60px",
                            padding: "0px 30px",
                            fontSize: "20px",
                            fontWeight: "bold",
                        }}>
                            회원가입
                        </Button>
                    </BtnBox>
                </ConfigProvider>
            </RegisterBox>
        </>

    );
}
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
const BtnBox = styled.span`
    > #btn {
        width: 300px;
        @media screen and (max-width: 725px) {
            width: 200px;
        }
    }
`
const RegisterBox = styled.div`
    width: 100%;
    margin: 20px 100px;
    max-width: 1200px;
    background-color: #fff;
    z-index: 35;
    height: 100%;
    @media screen and (max-width : 725px) {
        margin: 20px 50px;
    }
`
const RegisterBasicInput = styled.input`
    width: 60%;
    height: 20px;
    padding: 15px 20px;
    font-size: 16px;
    border: solid 1px rgb(229,229,229);    
    &:focus {
        border:  solid 1px rgb(229,229,229);
        outline: none;
    }
`
const RegisterBasicSelect = styled.select`
    width: 64%;
    height: 50px;
    padding: 0 20px;
    font-size: 16px;
    border: solid 1px rgb(229,229,229);
`
const RegisterBasicTextarea = styled.textarea`
    width: 60%;
    height: 40px;
    padding: 15px 20px;
    font-size: 16px;
    border: solid 1px rgb(229,229,229);
    &:focus {
        border:  solid 1px rgb(229,229,229);
        outline: none;
    }
`
export default RegisterCompontent;