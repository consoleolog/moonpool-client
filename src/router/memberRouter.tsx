import React, {lazy, Suspense} from "react";
import MypageProfileComponent from "../components/member/mypage/MypageProfileComponent";
import MypageSettingComponent from "../components/member/mypage/MypageSettingComponent";
import MypageProfileEditComponent from "../components/member/mypage/MypageProfileEditComponent";
import MypageSettingDeleteAccountComponent from "../components/member/mypage/MypageSettingDeleteAccountComponent";
import MypageMadePComponent from "../components/member/mypage/MypageMadePComponent";
import MypageBuyPComponent from "../components/member/mypage/MypageBuyPComponent";
import LoadingComponent from "../components/LoadingComponent";
import RegisterComponent from "../components/member/RegisterComponent";

const Mypage = lazy(()=>import("../views/member/Mypage"))
const memberRouter = [
    {
        path : "",
        children : [
            {
                path :"register",
                element : <Suspense fallback={LoadingComponent()}><RegisterComponent/></Suspense>
            },
            {
                path : "mypage",
                element: <Suspense fallback={LoadingComponent()}><Mypage/></Suspense>,
                children :[
                    {
                        path : "",
                        element : <Suspense fallback={LoadingComponent()}><MypageProfileComponent/></Suspense>
                    },
                    {
                        path : "settings",
                        element : <Suspense fallback={LoadingComponent()}><MypageSettingComponent/></Suspense>
                    },
                    {
                        path : "made/:pageNum",
                        element : <Suspense fallback={LoadingComponent()}><MypageMadePComponent/></Suspense>
                    },
                    {
                        path : "buy/:pageNum",
                        element : <Suspense fallback={LoadingComponent()}><MypageBuyPComponent/></Suspense>
                    },
                    {
                        path : "edit",
                        element : <Suspense fallback={LoadingComponent()}><MypageProfileEditComponent/></Suspense>
                    },
                    {
                        path : "delete",
                        element : <Suspense fallback={LoadingComponent()}><MypageSettingDeleteAccountComponent/></Suspense>
                    }

                ]
            }
        ]
    }
]
export default memberRouter;