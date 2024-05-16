export interface MemberLoginType {
    [key: string] : string;
}
export interface MemberDataType {
    memberId : string
    username : string
    displayName : string
    intro : string
    educationState : string
    // accessToken : string
    // refreshToken : string
    coin : number
}
export interface MemberRegisterType {
    [key : string] : string
}
export interface MemberLoginResponseType {
    memberId : string
    username : string
    displayName : string
    intro : string
    educationState : string
    coin : number
    accessToken : string
    refreshToken : string
}