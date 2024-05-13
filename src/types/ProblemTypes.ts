export interface ProblemParamTypes {
    [key:string] : string | number | null;
    title : string
    price : number
    description : string
    category : string | null
    level : string
    answer :  number
    writerId : string | number
}
export interface ProblemFileParamTypes {
    quizFile : File | string
    answerFiles : File | string
}
export interface ProblemListType {
    start : number
    end : number
    numList : number[]
    problemList :  never[]
    prev : number
    next: number
}
export interface ProblemDataType {
    problemId : number | null
    title : string
    price : number
    description : string
    category : string
    level : string
    answer :  number
    quizList :  never[]
    answerList :  never[]
    delFlag : boolean
    writerId : string | number
}