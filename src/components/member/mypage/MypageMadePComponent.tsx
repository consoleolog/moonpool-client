import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {SettingTapBox, SettingTapContents, SettingTapContentsBox} from './MypageSettingComponent';
import memberRepository from "../../../repository/MemberRepository";
import {HR} from "../../../Global.style";
import {GreyBg, ListBox, ListLink, ListP, PageBtn, PageNationBox} from "../../problem/ListComponent";
import salesService from "../../../service/SalesService";

function MypageMadePComponent() {
    const navigate = useNavigate();
    const {pageNum} = useParams();
    const memberId = memberRepository.getUserId();
    const [serverData,setServerData] = useState<any>();
    const moveToNext = () => {
        navigate(`../made/${serverData.next}`)
    }
    const moveToDetail = (problemId : string)=>{
        navigate(`/problems/detail/${problemId}/?commentPage=1`)
    }
    useEffect(() => {
        if (pageNum != null) {
            salesService.getMadeList(pageNum, memberId).then(response=>{
                let copy = {...response}
                setServerData(copy);
            })
        }
    }, []);
    return (
        <div style={{width:"90%",margin:"0 auto"}}>
        <SettingTapContentsBox>
            <SettingTapBox>
            <SettingTapContents onClick={() => {
                navigate("../made/1")
            }}>
                만든 문제
            </SettingTapContents>
            <SettingTapContents onClick={() => {
                navigate("../buy/1")
            }}>
                구매한 문제
            </SettingTapContents>
            </SettingTapBox><br/><br/>
            <h2>만든 문제</h2>
            <HR/>
            <GreyBg>
                {
                    serverData && serverData.problemList.map((item:any,i:number)=>{
                        return (
                            <ListBox key={i}>
                                <ListLink onClick={()=>moveToDetail(item.problemId)}>{item.title}</ListLink>
                                <ListP>{item.price}C</ListP>
                            </ListBox>
                        )
                    })
                }
            </GreyBg>
            <PageNationBox>
                <PageBtn>{'<<'}</PageBtn>
                {
                    serverData && serverData.numList.map((item:number,i:number)=>{
                        return (
                            <PageBtn key={i} onClick={()=>{
                                navigate("../made/"+item)
                            }}>{item}</PageBtn>
                        )
                    })
                }
                <PageBtn onClick={moveToNext}>{'>>'}</PageBtn>
            </PageNationBox>
        </SettingTapContentsBox>
        </div>
    );
}

export default MypageMadePComponent;