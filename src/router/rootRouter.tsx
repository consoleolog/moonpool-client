import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import LoadingComponent from "../components/LoadingComponent";
import problemRouter from "./problemRouter";
import memberRouter from "./memberRouter";
import cartRouter from "./cartRouter";
import salesRouter from "./salesRouter";

const Home = lazy(()=>import("../views/Home"))
const Main = lazy(()=>import("../components/HomeComponent"))
const rootRouter = createBrowserRouter([
    {
        path : "/",
        element : <Suspense fallback={LoadingComponent()}><Home/></Suspense>,
        children : [
            {
                path: "problems",
                children : problemRouter
            },
            {
                path: "",
                element: <Suspense fallback={LoadingComponent()}><Main/></Suspense>,
            },
            {
                path : "members",
                children : memberRouter
            },
            {
                path : "cart",
                children : cartRouter
            },
            {
                path : "sales",
                children : salesRouter
            }
        ]
    }
])
export default rootRouter;