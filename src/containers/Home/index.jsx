import React from 'react'
import "./index.css"
import Login from "../Login"

import { Typography } from 'antd';

const { Text, Title } = Typography;

const Home = ()=>{
    return(
        <div className="home">
            <div className="hero-text">
            <Title><h1 >Tina zita's inventory</h1></Title>
                <p>Please insert Tina Zita's credentials</p>
                <Login />
                <Text type="secondary">Don't you have credentials? Ask <Text type="danger">Rawan</Text></Text>
            </div>
            <img src="./image/inventory.svg" alt="inventory" />
        </div>
    )
}
export default Home;