import React from 'react';
import {Outlet} from "react-router-dom";
import Layout from "../components/Layout";

function Home() {
    return (
        <Layout>
            <Outlet/>
        </Layout>
    );
}

export default Home;