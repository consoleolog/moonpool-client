import React, { useState } from 'react';
import styled from "styled-components";
import {CustomBanner, CustomBannerAside, CustomBannerBox} from "../../Global.style";
import {Link} from "react-router-dom";
import { MdCancel } from "react-icons/md";
import {useQuery} from "react-query";
import cartService from "../../service/CartService";
import {CloseCircleFilled} from "@ant-design/icons";
import memberRepository from "../../repository/MemberRepository";
import salesService from "../../service/SalesService";
import {message} from "antd";
import {SalesListDataTotalType, SalesListDataType} from "../../types/SalesTypes";

function CartComponent() {
    let totalPrice = 0;
    let problemIdList:number[] = []
    const memberId = memberRepository.getUserId();
    const [clickCheck, setClickCheck] = useState<Boolean>(false)
    const cartData = useQuery([clickCheck],async=>cartService.getList(memberId))
    const cartList = cartData.data ? cartData.data : [];
    for (let key in cartList){
        totalPrice += cartList[key][1].price
    }
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
    const salesListData = {
        problemIdList : problemIdList,
        memberId : memberId,
    }
    const salesListTotalData = {
        problemIdList : problemIdList,
        totalPrice : totalPrice,
        memberId : memberId,
    }
    const handleDeleteClick = (cartId : string) => {
        cartService.delete(cartId, memberId).then((response)=>{
            setClickCheck(!clickCheck)
        })
    }
    const handleCheckPurchase = () => {
        salesService.purchaseCheckAll(salesListData).then(response=>{
            if (response==="LIST_BLANK"){
                error("장바구니가 비어있습니다!")
            } else if(response === "ALREADY_PURCHASED"){
                error("이미 구매한 상품이 있습니다!")
            } else if (response === "SUCCESS"){
                handleClickPurchase(salesListTotalData)
            }
        })
    }
    const handleClickPurchase = (salesListData : SalesListDataTotalType) => {
        salesService.purchaseAll(salesListData).then(response=>{
            if(response==="COIN_LACK"){
                error("코인이 부족합니다")
            } else if (response==="SUCCESS"){
                success("답지 구매 완료")
                cartService.deleteAll(memberId).then(()=>window.location.reload())
            }
        })
    }
    return (
        <>
            {contextHolder}
            <CustomBannerBox>
                <CustomBanner>
                    <Link to={"/"}><small>HOME</small></Link><br/><br/><br/>
                    <p style={{fontSize:"25px"}}>장바구니</p>
                </CustomBanner>
                <CustomBannerAside>
                </CustomBannerAside>
            </CustomBannerBox>
            <CartBox>
                <CartTable>
                    <CartThead >
                        <tr>
                            <th style={{width:"200px",textAlign:"start"}}>문제 명</th>
                            <th style={{width:"100px"}}>가격</th>
                            <th style={{width:"100px"}}>취소하기</th>
                        </tr>
                    </CartThead>
                    <tbody style={{width:'100%',borderTop:"solid 2px rgb(235,235,235)",height:"50px"}}>
                    {
                        cartData.isLoading ? <></> :
                            cartList.map((item:any,i:number)=>{
                                problemIdList.push(item[1].problemId)
                                return (
                                    <tr key={i} style={{height: "50px"}}>
                                        <td style={{width: "200px", textAlign: "start"}}>{item[1].title}</td>
                                        <td style={{
                                            width: "80px",
                                            textAlign: "center",
                                            color: "rgb(236,88,81),",
                                            verticalAlign: "middle"
                                        }}><strong>{item[1].price}C</strong></td>
                                        <td style={{width: "80px", textAlign: "center", verticalAlign: "middle"}}>
                                            <CancelIcon onClick={()=>handleDeleteClick(item[0].cartId)}>X</CancelIcon>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </CartTable>
            </CartBox>
            <AsideBox>

                <Aside>
                    <div style={{width: "90%", margin: "0 auto"}}>
                        <BorderBottom>
                            <strong>구매 할 답지 합계</strong>
                        </BorderBottom><br/><br/>
                        <div style={{display: "flex"}}>
                            <CustomDiv>
                                합계
                            </CustomDiv>
                            <Cost>
                                {totalPrice}C
                            </Cost>
                        </div>
                        <br/><br/>
                        <PurchaseButton onClick={handleCheckPurchase}>
                            구매하기
                        </PurchaseButton>
                    </div>
                </Aside>

            </AsideBox>
        </>
    );
}
const CartThead = styled.thead`
    width: 100%;
    height: 50px;
    border-bottom: 2px solid rgb(235,235,235);
`
const CancelIcon = styled.p`
 > #icon{
    font-size: 40px;
     width: 28px;
     height: 28px;
     border-radius: 200px;
     color: #fff;
     background-color: rgb(236,88,81);
     cursor: pointer;
     &:hover{
         color: rgb(236,88,81);
         background-color: #fff;
     }
    }
`
const CartTable = styled.table`
    width: 80%;
    margin: 30px auto;
    height: 100%;
    //border: 1px solid rgb(235,235,235);
`
const CartBox = styled.div`
    width: 60%;
    height: 100%;
    float: left;
    @media screen and (max-width : 975px) {
        float: none;
        width: 100%;
    }
`
const AsideBox = styled.aside`
    width: 40%;
    float: right;
    height: 100%;
    @media screen and (max-width : 975px) {
        float: none;
        width: 100%;
    }
`
const Aside = styled.div`
    width: 80%;
    margin: 30px auto;
    border: solid 1px rgb(235,235,235);
    height: 300px;
`
const PurchaseButton = styled.button`
    width: 100%;
    height: 60px;
    padding: 5px;
    background-color: transparent;
    color: rgb(150, 204, 210);
    font-size: 16px;
    font-weight: 500;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ;
    border: solid 2px rgb(150, 204, 210);
    &:hover {
        background-color: rgb(150, 204, 210);
        color: #fff;
    }
`
const BorderBottom = styled.div`
    width: 100%;
    border-bottom: solid 2px rgb(235,235,235);
    line-height: 80px;
    text-align: center;
    font-size: 20px;
`
const CustomDiv = styled.div`
    width: 50%;
    height: 30px;
    text-align: center;
    font-size: 20px;
`
const Cost = styled.div`
    width: 50%;
    height: 30px;
    color: rgb(236,88,81);
    font-weight: 550;
    font-size: 20px;
    text-align: center;
`
export default CartComponent;