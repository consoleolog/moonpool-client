import React from 'react';
import styled from 'styled-components';
import axios from "axios";

const state = {
    id : 1,
    pid : 5
}
function HomeComponents() {
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