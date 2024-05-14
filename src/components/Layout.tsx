import React, {ReactNode} from 'react';
import Header from "./Header";
import {useSelector} from "react-redux";
import {RootState} from "../index";

function Layout({ children }: { children: ReactNode }) {
    let navOpen : string = useSelector((state :RootState)=>{return state.isNavOpen})

    return (
        <>
            <Header/>
            <main className={`${navOpen}`}>{children}</main>
        </>
    );
}

export default Layout;