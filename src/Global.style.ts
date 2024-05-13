import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`
export const CustomBannerBox = styled.div`
    width: 100%;
    max-width: 3000px;
    height: 200px;
    background-color: rgb(250,250,250);
    display: flex;
    @media screen and (max-width : 975px) {
        width: 100%;
    }
`
export const CustomBanner = styled.div`
    width: 70%;
    height: 100%;
    padding: 40px 100px;
    box-sizing: border-box;
    @media screen and (max-width : 725px) {
        padding: 40px 50px;
    }
`
export const CustomBannerAside = styled.aside`
    width: 30%;
    height: 100%;
`
export const CustomBannerBtn = styled.button`
    width: 70%;
    height: 50px;
    border: solid 2px rgb(69,136,245);
    color: rgb(69,136,245);;
    margin: 30px auto;
    padding: 10px;
    background-color: transparent;
    font-weight: 500;
    font-size: 14px;
    border-radius: 5px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        background-color: rgb(69,136,245);
        color: #fff;
    }
    @media screen and (max-width : 975px) {
        width: 80%;
    }
    @media screen and (max-width : 725px) {
        width: 100%;
        margin-left: -30px;
    }
`
export const BlackBg = styled.div`
    width : 100%;
    height : 100%;
    position: fixed;
    top: 0;
    background : rgba(0,0,0,0.5);
    z-index : 120;
`
export const HR = styled.div`
    height: 2px;
    background-color: rgb(239,239,239);
    width: 1200px;
    margin-left: -18px;
    @media screen and (max-width : 1200px) {
        width: 1000px;
    }
    @media screen and (max-width : 975px) {
        width: 700px;
    }
    @media screen and (max-width : 725px) {
        width: 600px;
    }
`