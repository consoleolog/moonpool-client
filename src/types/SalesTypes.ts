export interface SalesDataType {
    [key : string] : string | undefined
    problemId : string | undefined
    memberId : string | undefined
}
export interface SalesListDataType {
    problemIdList : number[],
    memberId : string,
}
export interface SalesListDataTotalType {
    problemIdList : number[],
    totalPrice : number
    memberId : string,
}
export interface AnswerDataType {
    answer : number
    problemId : string | undefined
    memberId : string
}