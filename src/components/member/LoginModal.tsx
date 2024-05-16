import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";
import {IoClose} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {changeIsLoginModalOpenFalse} from "../../store/store";
import {BlackBg} from "../../Global.style";
import {MemberLoginType} from "../../types/MemberTypes";
import memberService from "../../service/MemberService";
import { message} from "antd";
import {AppDispatch, RootState} from "../../index";
import {useNavigate} from "react-router-dom";
import memberRepository from "../../repository/MemberRepository";
import {changeMember} from "../../store/silce/memberSlice";
let initState = {
    username : "",
    password : ""
}

function LoginModal() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
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

    const [loginData, setLoginData] = useState<MemberLoginType>(initState)
    let isLoginModalOpen = useSelector((state:RootState)=>state.isLoginModalOpen)
    const handleChange = (e:ChangeEvent<HTMLInputElement>):void => {
        loginData[e.target.name] = e.target.value;
        setLoginData({...loginData})
    }
    const login = () => {
        memberService.login(loginData).then((response)=>{
            if (response === "Username_Blank"){
                error("이메일이 비어있습니다!")
                setLoginData(initState)
            } else if(response === "Password_Blank"){
                error("비밀번호를 채워주세요!")
            } else if (response.Message){
                error("로그인에 실패했습니다!")
                setLoginData(initState)
            } else {
                success("로그인 성공!")
                memberRepository.saveUserData(response)
                dispatch(changeIsLoginModalOpenFalse())
                dispatch(changeMember(response))
                memberRepository.loginTrue()
                setLoginData({
                    username : "",
                    password : ""
                })
            }
        }).catch(()=>{
            setLoginData(initState)
            error("에러가 발생했습니다!")})
    }
    return (
        <>
        <BlackBg className={`${isLoginModalOpen}`}>
            {contextHolder}
            <LoginModalBox>
                <p style={{padding: "25px 0px 0px 30px"}}>로그인</p>
                <div onClick={()=>{
                    dispatch(changeIsLoginModalOpenFalse())
                }} >
                    <IoClose style={{
                        fontSize: "30px",
                        position: "absolute",
                        bottom: "0px",
                        width : "30px",
                        height: "30px",
                        left : "290px",
                        fontWeight: "bolder",
                        cursor: "pointer",
                        zIndex : "10"
                    }}/>
                </div>
                <LoginCenterBox>
                    <LoginEmailInputBox name={"username"} type={"email"} onChange={handleChange} value={loginData.username}
                                        placeholder={"이메일"} required={true}/>
                    <LoginPasswordInputBox name={"password"} placeholder={"비밀번호"} value={loginData.password}
                                           type={"password"} onChange={handleChange} required={true}/>
                </LoginCenterBox>
                <LoginButton onClick={login}>로그인</LoginButton>
                <GoToRegisterButton onClick={() => {
                    navigate("/members/register")
                    dispatch(changeIsLoginModalOpenFalse())
                }}>회원가입</GoToRegisterButton>
                <LoginCancelButton>게스트 로그인</LoginCancelButton>
            </LoginModalBox>
        </BlackBg>
        </>
    );
}
const LoginModalBox = styled.div`
    width: 350px;
    height: 350px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #fff;
    margin: 100px auto;
    font-size: 20px;
    right: 0;
    left: 0;
    font-weight: 500;
    color: #424242;
    z-index: 200;
    position: fixed;
`
const LoginEmailInputBox = styled.input`
    height: 30px;
    border: none;
    width: 80%;
    padding: 15px 0 0 10px;
    margin-left: 20px ;
    margin-top: 20px;
    border-bottom: 2px solid rgb(238,238,238);
    font-size: 16px;
    &:focus {
        outline: none;
        border-bottom: solid 2px rgb(138,198,205);
    }
`
const LoginPasswordInputBox = styled.input`
    height: 30px;
    border: none;
    width: 80%;
    padding: 0 0 0 10px;
    margin-left: 20px ;
    margin-top: 20px;
    border-bottom: 2px solid rgb(238,238,238);
    font-size: 16px;
    &:focus {
        outline: none;
        border-bottom: solid 2px rgb(138,198,205);
    }
`
const LoginButton = styled.button`
    width: 100%;
    height: 50px;
    margin-top: 40px;
    border: none;
    background-color: rgb(141,206,184);
    cursor: pointer;
    color: #fff;
    font-size: 15px;
    font-weight: 500;
`
const GoToRegisterButton  = styled.button`
    width: 100%;
    height: 50px;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    background-color: rgb(77,77,77);
`
export const LoginCenterBox = styled.div`
    margin: 0 auto;
    width: 330px;
`
export const LoginCancelButton = styled.button`
    width: 100%;
    height: 50px;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    background-color: rgb(108, 93, 93);
`
export default LoginModal;