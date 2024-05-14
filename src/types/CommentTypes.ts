export interface CommentDataType {
    [key:string] : string | undefined
    content : string,
    parentId: string | undefined
    writerId : string
}