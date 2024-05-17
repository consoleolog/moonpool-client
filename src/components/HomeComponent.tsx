import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../index";



function HomeComponents() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // dispatch(changeLoginCheck(false))
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