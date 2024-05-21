import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {SettingTapBox, SettingTapContents, SettingTapContentsBox} from "./MypageSettingComponent";
import {HR} from "../../../Global.style";
import {GreyBg, ListBox, ListLink, ListP, PageBtn, PageNationBox} from "../../problem/ListComponent";
import salesService from "../../../service/SalesService";
import memberRepository from "../../../repository/MemberRepository";


function MypageBuyPComponent() {
    const navigate = useNavigate();
    const {pageNum} = useParams();
    const [serverData, setServerData] = useState<any>();
    const memberId = memberRepository.getUserId();
    const moveToAnswer = (problemId : string) => {
        navigate(`/sales/items/answer/${problemId}`);
    }
    useEffect(() => {
        salesService.purchasedList(pageNum,memberId).then((response)=>{
            let copy = {...response}
            setServerData(copy);
        })
    }, []);
    console.log(serverData)
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
            <h2>구매한 문제</h2><br/>
            <HR/>
            <GreyBg>
                {
                    serverData && serverData.problemList.map((item:any,i:number)=>{
                        return (
                            <ListBox key={i}>
                                <ListLink onClick={()=>moveToAnswer(item.problemId)}>{item.title}</ListLink>
                                <ListP>{item.price}C</ListP>
                            </ListBox>
                        )
                    })
                }
            </GreyBg>
            <PageNationBox>
                {
                    serverData && serverData.prev !== 0 ?
                        <PageBtn onClick={()=>navigate(`../buy/${serverData.prev}`)}>이전</PageBtn>
                        :<></>
                }
                {
                    serverData && serverData.numList.map((item:number,i:number)=>{
                        return (
                            <PageBtn key={i} onClick={()=>navigate(`../buy/${item}`)}>{item}</PageBtn>
                        )
                    })
                }
                {
                    serverData && serverData.next !== 0 ?
                        <PageBtn onClick={()=>navigate(`../buy/${serverData.next}`)}>다음</PageBtn>
                        :<></>
                }
            </PageNationBox>
        </SettingTapContentsBox>
        </div>
    );
}

export default MypageBuyPComponent;