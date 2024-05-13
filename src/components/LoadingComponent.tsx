import React from 'react';
import styled from "styled-components";
import {BlackBg} from "../Global.style";

function LoadingComponent() {
    return (
        <BlackBg>
            <ModalBox>
                <ResultLabel>
                    로딩중..... {">.<"}
                </ResultLabel>
            </ModalBox>
        </BlackBg>
    );
}
export const ModalBox = styled.div`
    padding: 50px 0 0 0 ;
    width: 400px;
    height: 200px;
    background-color: #fff;
    margin: 150px auto;
    text-align: center;
    border-radius: 5px;
`
export const ResultLabel = styled.label`
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 120px;
    color: #838383;
    font-weight: 600;
    font-size: 25px;
    cursor: pointer;
`
export default LoadingComponent;