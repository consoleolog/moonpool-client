import {lazy, Suspense} from "react";
import LoadingComponent from "../components/LoadingComponent";

const Detail = lazy(()=>import("../components/problem/DetailComponent"))
const List = lazy(()=>import("../components/problem/ListComponent"))
const Write = lazy(()=>import("../components/problem/WriteComponent"))
const Modify = lazy(()=>import("../components/problem/ModifyComponent"))
const Search = lazy(()=>import("../components/problem/SearchResultComponent"))
const problemRouter = [
    {
        path : "",
        children : [
            {
                path : "detail/:problemId",
                element :  <Suspense fallback={LoadingComponent()}><Detail/></Suspense>,
            },
            {
                path : ":pageNum/",
                element :  <Suspense fallback={LoadingComponent()}><Search/></Suspense>,
            },
            {
                path: ":category/:pageNum",
                element :  <Suspense fallback={LoadingComponent()}><List/></Suspense>,
            },
            {
                path : "write",
                element: <Suspense fallback={LoadingComponent()}><Write/></Suspense>,
            }
            ,{
                path : "modify/:problemId",
                element : <Suspense fallback={LoadingComponent()}><Modify/></Suspense>,
            },

        ]
    }
]
export default problemRouter;