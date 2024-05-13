import React from 'react';
import styled from "styled-components";


function ErrorAlert({message}: {message: string}) {
    return (
        <Container>
            <p>{message}</p>
        </Container>
    );
}
const Container = styled.div`
    background-color: rgb(255,242,240);
    border: 1px solid rgb(255,205,200);
    width: 500px;
    height: 80px;
    margin: 50px auto;
    text-align: center;
    line-height: 80px;
    font-weight: 550;
    color: #252525;
    border-radius: 5px;
`
export default ErrorAlert;