import React from 'react'
import "./index.css"
import Login from "../Login"
import { Image } from 'antd';

import { Typography } from 'antd';

const { Text, Title } = Typography;

const Home = ({email,setEmail, password,isEmailSend, setIsEmailSend, setPassword,handleLogin,handleResetPassword,hasPassword,setHasPassword,emailError,passwordError})=>{
    return(
        <div className="home">
            <div className="hero-text">
            <Title>TINA ZITA'S INVENTORY</Title>
            <Title level={4} type="secondary">powered by M.Y-Inventory</Title>
                <p>Please insert Tina Zita's credentials</p>
                <Login
               email={email}
               setEmail={setEmail}
               password={password}
               setPassword={setPassword}
               handleLogin={handleLogin}
               handleResetPassword={handleResetPassword}
               hasPassword={hasPassword}
               setHasPassword={setHasPassword}
               emailError={emailError}
               passwordError={passwordError}
               isEmailSend={isEmailSend}
               />
                <Text type="secondary">Don't you have credentials? Ask <Text type="danger">Rawan</Text></Text>
            </div>
            
            <Image
      width={600}
      src={require("./image/inventory.png")} alt="Packaging vector created by stories - www.freepik.com" 
    />
            
            
        </div>
    )
}
export default Home;