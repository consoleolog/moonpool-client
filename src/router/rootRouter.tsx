import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import LoadingComponent from "../components/LoadingComponent";
import HomeComponents from "../components/HomeComponent";
import problemRouter from "./problemRouter";
import memberRouter from "./memberRouter";
import cartRouter from "./cartRouter";
import salesRouter from "./salesRouter";

const Home = lazy(()=>import("../views/Home"))
const rootRouter = createBrowserRouter([
    {
        path : "/",
        element : <Home/>,
        children : [
            {
                path: "problems",
                children : problemRouter
            },
            {
                path: "",
                element: <Suspense fallback={LoadingComponent()}><HomeComponents/></Suspense>,
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