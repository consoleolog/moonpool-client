import React, {useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Twirl as Hamburger} from 'hamburger-react'
import {AppDispatch, RootState} from "../index";
import {AiOutlineSearch, AiOutlineShoppingCart} from "react-icons/ai";
import {IoClose} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {changeIsLoginModalOpenTrue, changeIsNavOpenFalse, changeIsNavOpenTrue} from "../store/store";
import LoginModal from "./member/LoginModal";
import memberService from "../service/MemberService";
import {useQuery} from "react-query";
import memberRepository from "../repository/MemberRepository";

function Header() {
    // 변수 선언
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const navOpen : string = useSelector((state:RootState)=>{return state.isNavOpen})
    const [isOpen, setOpen] = useState(false)
    const loginResult = useQuery([memberRepository.getLoginCheck()],memberService.loginCheck)
    const check = loginResult.data
    const doLogout = () => {
        memberService.logout()
        memberRepository.loginFalse()
    }

    return (
        <>
            <CustomHeader className={`${navOpen}`}>
                <LogoBox>
                    <h2>Logo</h2>
                </LogoBox>
                <BlankBox/>
                <HeaderContentsBox>
                    <HeaderContents id={"korean"} onClick={()=>{
                        navigate("/problems/korean/1")
                    }}>
                        <p>국어</p>
                    </HeaderContents>
                    <HeaderContents id={"math"} onClick={()=>{
                        navigate("/problems/math/1")
                    }}>
                        <p>수학</p>
                    </HeaderContents>
                    <HeaderContents id={"english"} onClick={() => {
                        navigate("/problems/english/1")
                    }}>
                        <p>영어</p>
                    </HeaderContents>
                    <HeaderContents id={"social"} onClick={() => {
                        navigate("/problems/social/1")
                    }}>
                        <p>사탐</p>
                    </HeaderContents>
                    <HeaderContents id={"science"} onClick={() => {
                        navigate("/problems/science/1")
                    }}>
                        <p>과탐</p>
                    </HeaderContents>
                </HeaderContentsBox>
                <HeaderEndBox>
                    <HeaderEndContents/>
                    {
                        !check  ?
                            <>
                                <HeaderEndContents onClick={()=>{
                                    dispatch(changeIsLoginModalOpenTrue())
                                }}>
                                    login
                                </HeaderEndContents>
                            </> :
                            <>
                                <HeaderEndContents onClick={()=>{
                                    navigate("/members/mypage")
                                }}>
                                    mypage
                                </HeaderEndContents>
                                <HeaderEndContents onClick={doLogout}>
                                    logout
                                </HeaderEndContents>
                            </>
                    }
                    <HeaderEndContents>
                        <AiOutlineShoppingCart
                            onClick={()=>{
                                navigate("/cart")
                            }}
                            style={{fontSize: "23px", marginTop: "27px", fontWeight: "200"}}/>
                    </HeaderEndContents>
                    <HeaderEndIcon onClick={() => {
                        if (!isOpen) {
                            dispatch(changeIsNavOpenTrue())
                            setOpen(true)
                        } else {
                            dispatch(changeIsNavOpenFalse())
                            setOpen(false)
                        }
                    }} style={{fontSize: "25px", marginTop: "14px"}}>
                        <Hamburger size={23} toggled={isOpen} toggle={setOpen}/>
                    </HeaderEndIcon>
                </HeaderEndBox>
            </CustomHeader>
            <HeaderSideBox>
                <NavSideCloseIconBox>
                    <IoClose onClick={()=>{
                        setOpen(false)
                        dispatch(changeIsNavOpenFalse())
                    }} style={{fontSize: "80px", fontWeight: "bolder", cursor: "pointer"}}/>
                </NavSideCloseIconBox>
                <NavSideContentsSearchBox>
                    <CenterBox >
                        <AiOutlineSearch
                            onClick={()=>{
                                dispatch(changeIsNavOpenTrue())
                            }}
                            style={{fontSize: "27px", fontWeight: "bolder", marginTop: "10px", cursor: "pointer"}}/>
                    </CenterBox>
                </NavSideContentsSearchBox>
                <NavSideContents onClick={()=>{
                    navigate("/problems/korean/1")
                }} style={{marginTop: "5px"}}>국어</NavSideContents>
                <NavSideContents onClick={()=>{
                    navigate("/problems/math/1")
                }}>수학 </NavSideContents>
                <NavSideContents onClick={()=>{
                    navigate("/problems/english/1")
                }}>영어 </NavSideContents>
                <NavSideContents onClick={()=>{
                    navigate("/problems/social/1")
                }}>사회 탐구</NavSideContents>
                <NavSideContents onClick={()=>{
                    navigate("/problems/science/1")
                }}>과학 탐구</NavSideContents>
            </HeaderSideBox>
            {/*로그인 폼 모달*/}
            <LoginModal/>
        </>
    );
}
const CustomHeader = styled.header`
    width: 100%;
    height: 80px;
    display: flex;
    border-bottom: solid 2px rgb(235, 235, 235);
    border-right: 2px solid rgb(235,235,235) ;
    background-color: #fff;
    z-index: 5;
    transition: all 0.5s;
`
const LogoBox = styled.div`
    width: 20%;
    height: 100%;
    text-align: center;
    line-height: 80px;
`
const CenterBox = styled.div`
    width: 50px;
    margin: 0 auto;
`
const BlankBox = styled.div`
    width: 30%;
    height: 100%;
    @media screen and (max-width: 975px) {
        width: 45%;
    }
    @media screen and (max-width: 600px) {
        width: 20%;
    }
`
const HeaderContentsBox = styled.div`
    display: flex;
    width: 30%;
    height: 100%;
    @media screen and (max-width: 975px) {
        display: none;
    }
`
const HeaderContents = styled.div`
    width: 20%;
    height: 100%;
    text-align: center;
    cursor: pointer;
    line-height: 80px;
    color: rgb(121, 121, 121);
    font-weight: 400;
    font-size: 14px;
    &:hover {
        border-bottom: solid 2px rgb(69, 136, 245);
        color: rgb(69, 136, 245);
    }
`
const HeaderEndBox = styled.div`
    display: flex;
    width: 20%;
    height: 100%;
    line-height: 80px;
    @media screen and (max-width: 975px) {
        width: 30%;
    }
    @media screen and (max-width: 600px) {
        width: 50%;
    }
`
const HeaderEndContents = styled.div`
    width: 30%;
    height: 100%;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    color: rgb(88, 88, 88);
    font-weight: 550;
    word-wrap: break-word;
    &:hover {
        color: rgb(69, 136, 245);
        font-weight: bolder;
    }
`
const HeaderEndIcon = styled.div`
    width: 20%;
    height: 100%;
    text-align: center;
    display: none;
    @media screen and (max-width: 975px) {
        display: block;
    }
    @media screen and (max-width: 725px) {
        width: 10%;
    }
`
const HeaderSideBox = styled.aside`
    width: 200px;
    //height: 100%;
    top: 0;
    right: 0;
    position: fixed;
    background-color: #fff;
    transition: all 0.5s;
    z-index: 1;
    border-left: 5px solid rgb(235,235,235) ;
`
const NavSideCloseIconBox = styled.div`
    width: 100px;
    margin: 5px auto;
`
const NavSideContentsSearchBox = styled.div`
    width: 100%;
    background-color: rgb(235,235,235);
    border: solid 1px rgb(245,245,245);
    height: 50px;
`
const NavSideContents = styled.div`
    width: 100%;
    border: solid 1px rgb(245,245,245);
    height: 50px;
    cursor: pointer;
    line-height: 50px;
    font-size: 20px;
    color: #424242;
    box-sizing: border-box;
    padding: 0 40px;
    font-weight: 500;
`
export default Header;