import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../index";
import {changeLoginCheck} from "../store/silce/loginCheck";


function HomeComponents() {
    const dispatch = useDispatch<AppDispatch>();
    let loginCheck = useSelector((state:RootState) => {return state.loginCheck})
    useEffect(() => {
        dispatch(changeLoginCheck(false))
    }, []);
    return (
        <ExampleBox>홈 컴포넌트

        </ExampleBox>
    );
}
const ExampleBox = styled.div`
width: 100%;
    height: 800px;
    background-color: #fff;
`
export default HomeComponents;