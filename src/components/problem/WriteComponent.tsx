import React, {ChangeEvent, useEffect, useState} from 'react';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import styled from "styled-components";
import {BlackBg, CustomBanner, CustomBannerAside, CustomBannerBox} from "../../Global.style";
import {useDispatch, useSelector} from "react-redux";
import {changeIsModalOpenTrue, storeType} from "../../store/store";
import {CiImageOn} from "react-icons/ci";
import {Button, ConfigProvider, message, Upload, UploadProps} from "antd";
import {TinyColor} from "@ctrl/tinycolor";
import {ProblemParamTypes} from "../../types/ProblemTypes";
import {RootState} from "../../index";
import {InboxOutlined} from "@ant-design/icons";
import axios from "axios";

const { Dragger } = Upload;
const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'http://localhost:8080/mp/problems/upload',
    onChange(info) {

        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
function WriteComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isModalOpen = useSelector((state:storeType) => state.isModalOpen);
    const loginCheck = useSelector((state:RootState)=>{return state.loginCheck})
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category");
    const [messageApi, contextHolder] = message.useMessage();
    const error = (content:string) => {
        messageApi.open({
            type: 'error',
            content: `${content}`,
            duration : 1,
        });
    };
    const initState = {
        title : "",
        price : 0,
        description : "",
        category : category,
        level : "",
        answer : 0,
        writerId : 0
    }
    const [problemParam, setProblemParam] = useState<ProblemParamTypes>(initState)
    const [fileList, setFileList] = useState([])
    const handleChange = (e:ChangeEvent<any>)=>{
        problemParam[e.target.name] = e.target.value;
        setProblemParam({...problemParam});
    }
    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append("files", file);
        })
        axios.post("http://localhost:8080/mp/problems/upload", formData, {
            headers : {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            console.log(response)
        })
    }
    useEffect(() => {
        if (!loginCheck){
            error("로그인이 필요한 서비스입니다!")
            navigate("/")
        }
    }, [loginCheck]);
    
    return (
        <>
            <CustomBannerBox>
                <CustomBanner>
                    <Link to={"/"}><small>HOME</small></Link><br/><br/><br/>
                    <p style={{fontSize:"25px"}}>문제 등록하기</p>
                </CustomBanner>
                <CustomBannerAside/>
            </CustomBannerBox>
            <FormBox>
                <FormContainer>
                    <p>문제 제목</p><br/>
                    <WriteBasicInput name={"title"} onChange={handleChange} required={true}/>
                    <br/><br/><br/>
                    <p>과목 선택</p><br/>
                    <WriteBasicSelect name={"category"} defaultValue={category == null ? "" : category}
                                      onChange={handleChange}>
                        <option value="korean">국어</option>
                        <option value="math">수학</option>
                        <option value="english">영어</option>
                        <option value="science">과학 탐구</option>
                        <option value="social">사회 탐구</option>
                    </WriteBasicSelect>
                    <br/><br/><br/>
                    <p>난이도</p><br/>
                    <WriteBasicSelect name={"level"} defaultValue={"normal"} onChange={handleChange}>
                        <option value="easy">쉬움</option>
                        <option value="normal">보통</option>
                        <option value="hard">어려움</option>
                    </WriteBasicSelect>
                    <br/><br/><br/>
                    <p>가격(C)</p><br/>
                    <WriteBasicInput type={"number"} name={"price"} onChange={handleChange} required={true}/>
                    <br/><br/><br/>
                    <p>문제 설명</p><br/>
                    <WriteBasicInput name={"description"} onChange={handleChange} required={true}/>
                    <br/><br/><br/>
                    <p>문제 이미지</p><br/>
                    {/*<WriteBasicImgDiv draggable="true">*/}
                    {/*    <CiImageOn style={{fontSize: "57px", marginTop: "10px"}}/>*/}
                    {/*    <h4>문제 이미지 업로드</h4>*/}
                    {/*    <WriteBasicImgLabel htmlFor={"problemImage"}>*/}
                    {/*        클릭*/}
                    {/*    </WriteBasicImgLabel>*/}
                    {/*</WriteBasicImgDiv>*/}
                    <Dragger {...{
                        name : "file",
                        mutilple:true,
                        action : "http://localhost:8080/mp/problems/upload",
                        headers : {
                            'Content-Type': 'multipart/form-data',
                            'Access-Control-Allow-Origin' : 'http://localhost:8080/'
                        },
                        withCredentials : true,
                        beforeUpload : file => {
                            console.log(file)
                            // @ts-ignore
                            setFileList(fileList.concat(file));
                        },
                        fileList
                    }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            뭐라뭐라
                        </p>
                    </Dragger>
                    <button onClick={handleUpload}>눌러줘</button>
                    <WriteBasicInput name={"problemImg"} id={"problemImage"} accept="image/*"

                                     style={{display: "none"}} type={"file"}/>
                    <br/><br/><br/>
                    <p>문제 정답</p><br/>
                    <WriteBasicInput name={"answer"} onChange={handleChange} required={true}/>
                    <br/><br/><br/>
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
                        <Button type="primary" size="large" onClick={() => {
                            dispatch(changeIsModalOpenTrue())
                        }}
                                style={{width: "300px", height: "60px", padding: "0px 30px", marginTop: "30px"}}>
                            등록
                        </Button>
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
                            <input style={{display:"none"}} id={"answerImg"} type="file"

                                   multiple={true} accept={"image/*"} required={true}/>
                            <AnswerImgInputBtn onClick={()=>{

                            }}>진짜 등록</AnswerImgInputBtn>
                        </UploadModalBox>
                    </BlackBg> : <></>
            }
        </>
    );
}
const AnswerImgInputLabel = styled.label`
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 120px;
    color: #838383;
    font-weight: 600;
    font-size: 25px;
    cursor: pointer;
`
const AnswerImgInputBtn = styled.button`
    width: 100%;
    height: 50px;
    border: none;
    color: #fff;
    background-color: rgb(236,88,81);
    cursor: pointer;
    &:hover {
        background-color: rgb(223, 79, 73);
    }
`
const UploadModalBox = styled.div`
    padding: 50px 0 0 0 ;
    width: 400px;
    height: 200px;
    background-color: #fff;
    margin: 150px auto;
    border-radius: 5px;
`
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

const WriteBasicSelect = styled.select`
    width: 53%;
    height: 50px;
    min-width: 340px;
    padding: 0 20px;
    font-size: 16px;
    border: solid 1px rgb(229,229,229);
`
const WriteBasicImgDiv = styled.div`
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
export default WriteComponent;
// export async function action({request,params}){
//     const data = await request.formData();
//
// }