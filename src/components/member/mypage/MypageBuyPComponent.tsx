import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {SettingTapBox, SettingTapContents, SettingTapContentsBox} from "./MypageSettingComponent";
import {HR} from "../../../Global.style";
import {GreyBg, ListBox, ListLink, ListP} from "../../problem/ListComponent";


function MypageBuyPComponent() {
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
            <h2>구매한 문제</h2><br/>
            <HR/>
            <GreyBg>
                {/*{*/}
                {/*    serverData && serverData.map((item:any,i:number)=>{*/}
                {/*        return (*/}
                {/*            <ListBox key={i}>*/}
                {/*                <ListLink onClick={()=>{*/}
                {/*                    navigate(`../../../sales/items/answer/${item.id}`)*/}
                {/*                }}>{item.title}</ListLink>*/}
                {/*                <ListP>{item.price}C</ListP>*/}
                {/*            </ListBox>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
            </GreyBg>
        </SettingTapContentsBox>
        </div>
    );
}

export default MypageBuyPComponent;