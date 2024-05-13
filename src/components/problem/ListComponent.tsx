import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {CustomBanner, CustomBannerAside, CustomBannerBox, CustomBannerBtn} from "../../Global.style";
import {Link, useNavigate, useParams} from "react-router-dom";
import problemService from "../../service/ProblemService";
import {ProblemListType} from "../../types/ProblemTypes";
import {message} from "antd";
import {useQuery} from "react-query";


function ListComponent() {
    const navigate = useNavigate();
    const {category,pageNum} = useParams();
    const [serverData, setServerData] = useState<ProblemListType>();
    let subject = useQuery([category],()=>{
        return problemService.changeCategory(category)})
    const loginCheck = sessionStorage.getItem("loginCheck");
    const [messageApi, contextHolder] = message.useMessage();
    const error = (content:string) => {
        messageApi.open({
            type: 'error',
            content: `${content}`,
            duration : 1,
        });
    };
    useEffect(() => {
        problemService.getList(pageNum,category).then((response)=>{
            let copy = {...response}
            setServerData(copy)
        })
    }, [category,pageNum]);
    const moveToPost = () => {
        if (loginCheck === "false"){
            error("로그인이 필요한 서비스입니다")
        } else {
            navigate(`/problems/write?category=${category}`)
        }
    }
    return (
        <WhiteBg>
            {contextHolder}
            <CustomBannerBox>
                <CustomBanner>
                    <Link to={"/"}><small>HOME</small></Link><br/><br/><br/>
                    <p style={{fontSize:"25px"}}>{subject.data}</p>
                </CustomBanner>
                <CustomBannerAside>
                    <CustomBannerBtn onClick={moveToPost}>
                        문제 등록하기
                    </CustomBannerBtn>
                </CustomBannerAside>
            </CustomBannerBox>
            <SearchBox>
                <SearchInput placeholder={"게시물 제목 검색"}/>
                <SearchBtn>검색</SearchBtn>
            </SearchBox>
            <GreyBg>
                {
                    serverData && serverData.problemList.map((item:any,i:number)=>{
                        return (
                            <ListBox key={i}>
                                <ListLink onClick={()=>{
                                    navigate(`../detail/${item.problemId}/?commentPage=1`)
                                }}>{item.title}</ListLink>
                                <ListP>{item.price}C</ListP>
                            </ListBox>
                        )
                    })
                }
            </GreyBg>
            <PageNationBox>
                <PageBtn>{'<<'}</PageBtn>
                {
                    serverData && serverData.numList.map((item:number,i)=>{
                        return (
                            <PageBtn key={i} onClick={()=>{
                                navigate(`../${category}/${item}`)
                            }}>{item}</PageBtn>
                        )
                    })
                }
                <PageBtn onClick={()=>{

                }}>{'>>'}</PageBtn>
            </PageNationBox>
        </WhiteBg>
    );
}
export const ListBox = styled.div`
    padding: 10px;
    border-bottom: 1px solid rgb(255, 255, 255);
`
export const ListLink = styled.p`
    font-size: 16px;
    font-weight: 550;
    margin: 5px;
    text-decoration: none;
    color: #333;
    cursor: pointer;
`
export const ListP = styled.p`
    font-size: 13px;
    margin: 5px;
    color: grey;
`
export const WhiteBg = styled.div`
    background-color: #fff;
    width: 100%;
    height: 100%;
`
export const GreyBg = styled.div`
    //background-color: #fff;
    background-color: rgb(241, 241, 241);
    width: 90%;
    margin: 20px auto;
    border-radius: 5px;
`
const SearchBox = styled.div`
    width: 90%;
    display: flex;
    margin: 20px auto;
    height: 80px;
`
const SearchInput = styled.input`
    width: 150px;
    padding: 5px 10px;
    height: 30px;
    border: solid 1px rgb(225, 225, 225);
    color: rgb(161, 161, 161);
    margin-left: 10px;
    &:focus {
        outline: none;
    }
`
const SearchBtn = styled.button`
    width: 80px;
    height: 40px;
    margin-top: 1px;
    margin-left: 20px;
    border: solid 2px rgb(69,136,245);;
    background-color: transparent;
    color: rgb(69,136,245);;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
        background-color: rgb(69,136,245);
        color: #fff;
    }
`
const PageBtn = styled.button`
    width: 30px;
    height: 30px;
    font-weight: 550;
    border: solid 2px rgb(69,136,245);;
    background-color: transparent;
    color: rgb(69,136,245);
    margin: 0 5px;
    cursor: pointer;
    &:hover {
        background-color: rgb(69,136,245);
        color: #fff;
    }
`
const PageNationBox = styled.div`
    width: 80%;
    height: 40px;
    margin: 80px auto;
    display: flex;
    justify-content: end;
`
export default ListComponent;