import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {BlackBg, CustomBanner, CustomBannerAside, CustomBannerBox, CustomBannerBtn, Wrapper} from "../../Global.style";
import {useDispatch, useSelector} from "react-redux";
import {changeIsModalOpenFalse, changeIsModalOpenTrue} from "../../store/store";
import {Button, ConfigProvider, message} from "antd";
import {TinyColor} from "@ctrl/tinycolor";
import {RootState} from "../../index";
import memberRepository from "../../repository/MemberRepository";
import problemService from "../../service/ProblemService";
import {AnswerImgInputBtn, AnswerImgInputLabel, CancelBtn, UploadModalBox} from "./WriteComponent";

function ModifyComponent() {
    const writerId = memberRepository.getUserId()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {problemId} = useParams();
    const quizList: any[] = []
    const answerList: any[] = []
    const [quiz, setQuiz] = useState<any>([])
    const [answer, setAnswer] = useState<any>([])
    const isModalOpen = useSelector((state:RootState) => state.isModalOpen);
    const [problemData, setProblemData] = useState<any>({
        problemId : "",
        title : "",
        price : 0,
        description : "",
        category : "",
        level : "",
        answer : "",
        writerId : writerId
    })
    const [messageApi, contextHolder] = message.useMessage();
    const error = (content:string) => {
        messageApi.open({
            type: 'error',
            content: `${content}`,
            duration : 1,
        });
    };
    useEffect(() => {
        if (typeof problemId === "string") {
            problemService.getOne(problemId).then(response=>{
                let copy = {...response}
                setProblemData(copy)
            })
        }
    }, []);
    const onChangeProblemData = (e:any)=>{
        problemData[e.target.name] = e.target.value
        setProblemData({...problemData})
    }
    const handleClick = () => {
        problemService.modify(problemData, quiz, answer).then((response)=>{
            console.log(response)
            if(response === "제목을 확인해주세요!"){
                error(response)
            } else if (response === "가격은 음수일수 없습니다!"){
                error(response)
            }
            else {
                navigate(`../../problems/detail/${problemData.problemId}/?commentPage=1`)
            }
        })
    }

    return (
        <>
            <CustomBannerBox>
                <CustomBanner>
                    <Link to={"/"}><small>HOME</small></Link><br/><br/><br/>
                    <p style={{fontSize:"25px"}}>문제 수정하기</p>
                </CustomBanner>
                <CustomBannerAside/>
            </CustomBannerBox>
            <FormBox>
                <FormContainer>
                    <p>문제 제목</p><br/>
                    <WriteBasicInput type={"text"} value={problemData.title} name={"title"}
                                     onChange={onChangeProblemData} required={true}/>
                    <br/><br/><br/>
                    <p>과목 선택</p><br/>
                    <WriteBasicSelect value={problemData.category} name={"category"}
                                      onChange={onChangeProblemData}>
                        <option value="korean">국어</option>
                        <option value="math">수학</option>
                        <option value="english">영어</option>
                        <option value="science">과학 탐구</option>
                        <option value="social">사회 탐구</option>
                    </WriteBasicSelect>
                    <br/><br/><br/>
                    <p>난이도</p><br/>
                    <WriteBasicSelect value={problemData.category || ''} name={"level"}
                                      onChange={onChangeProblemData}>
                        <option value="easy">쉬움</option>
                        <option value="normal">보통</option>
                        <option value="hard">어려움</option>
                    </WriteBasicSelect>
                    <br/><br/><br/>
                    <p>가격(C)</p><br/>
                    <WriteBasicInput value={problemData.price} name={"price"}
                                     onChange={onChangeProblemData} required={true}/>
                    <br/><br/><br/>
                    <p>문제 설명</p><br/>
                    <WriteBasicInput value={problemData.description} name={"description"}
                                     onChange={onChangeProblemData} required={true}/>
                    <br/><br/><br/>
                    <p>문제 이미지</p><br/>
                    <WriteBasicInput accept={"image/*"} multiple={true} onChange={async (e:any)=>{
                        quizList.push(e.currentTarget.files[0])
                        setQuiz(quizList)
                    }} type={"file"}/>
                    <br/><br/><br/>
                    <p>문제 정답</p><br/>
                    <WriteBasicInput name={"answer"} value={problemData.answer}
                                     onChange={onChangeProblemData} required={true}/>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                                    lineWidth: 0,
                                },
                            },
                        }}
                    >
                        <div>
                            <Button type="primary" size="large" onClick={() => {
                                dispatch(changeIsModalOpenTrue())
                            }}
                                    style={{width: "300px", height: "60px", padding: "0px 30px", marginTop: "30px"}}>
                                수정하기
                            </Button>
                        </div>
                    </ConfigProvider>
                </FormContainer>
            </FormBox>
            <AsideBox/>
            {
                isModalOpen ?
                    <BlackBg>
                        <UploadModalBox>
                            <AnswerImgInputLabel htmlFor={"answerImg"}>
                                <p>이미지 업로드 (클릭)</p>
                            </AnswerImgInputLabel>
                            <AnswerImgInputBtn onClick={handleClick}>진짜 수정</AnswerImgInputBtn>
                            <CancelBtn onClick={() => {
                                dispatch(changeIsModalOpenFalse())
                            }}>취소</CancelBtn>
                            <input style={{visibility:"hidden"}} id={"answerImg"} multiple={true} accept={"image/*"} onChange={ async (e: any) => {
                                answerList.push(e.currentTarget.files[0])
                                setAnswer(answerList)
                            }} type="file" />
                        </UploadModalBox>
                    </BlackBg> : <></>
            }
        </>
    );
}

const FormBox = styled.div`
    width: 70%;
    height: 100%;
    background-color: #fff;
    float: left;
`
const AsideBox = styled.aside`
    width: 30%;
    height: 100%;
    background-color: #fff;
    float: right;
`
const FormContainer = styled.div`
    width: 90%;
    height: 100%;
    border: solid 1px rgb(250, 250, 250);
    margin: 10px auto;
    padding: 15px 20px;
    font-size: 16px;
    &:focus {
        border:  solid 1px rgb(229,229,229);
        outline: none;
    }
`
export const WriteBasicInput = styled.input`
    width: 50%;
    height: 20px;
    min-width: 300px;
    padding: 15px 20px;
    font-size: 16px;
    border: solid 1px rgb(229,229,229);
    &:focus {
        border:  solid 1px rgb(229,229,229);
        outline: none;
    }
`
export const WriteBasicSelect = styled.select`
    width: 53%;
    height: 50px;
    min-width: 340px;
    padding: 0 20px;
    font-size: 16px;
    border: solid 1px rgb(229,229,229);
`
export const WriteBasicImgDiv = styled.div`
    width: 50%;
    height: 180px;
    min-width: 300px;
    border: solid 1px rgb(229,229,229);
    text-align: center;
`
export const WriteBasicImgLabel = styled.label`
    width: 500px;
    height: 20px;
    padding: 10px 50px;
    border-radius: 10px;
    background-color: #252525;
    top: 30px;
    color: #fff;
    cursor: pointer;
    &:hover {
        background-color: #424242;
    }
`
const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
export default ModifyComponent;
// export async function action({request,params}){
//     const data = await request.formData();
//
// }