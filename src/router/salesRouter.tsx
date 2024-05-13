import {lazy, Suspense} from "react";
import LoadingComponent from "../components/LoadingComponent";

const Answer = lazy(()=>import("../components/problem/AnswerResultComponent"))

const salesRouter = [
    {
        path : "",
        children : [
            {
                path : "items/answer/:id",
                element : <Suspense fallback={LoadingComponent()}><Answer/></Suspense>
            }
        ]
    }
]
export default salesRouter