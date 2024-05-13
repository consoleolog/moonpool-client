import {lazy, Suspense} from "react";
import LoadingComponent from "../components/LoadingComponent";

const Cart = lazy(()=>import("../components/cart/CartComponent"))
const cartRouter = [
    {
        path : "",
        element : <Suspense fallback={LoadingComponent()}><Cart/></Suspense>
    }
]
export default cartRouter;