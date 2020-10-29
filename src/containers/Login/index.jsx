import React, { useEffect, useState } from "react";
import {Auth} from "../../firebaseConfig";
import { Button, Space, Input,  Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import "./index.css";
const { Text} = Typography;
const Login = ({email,setEmail, isEmailSend, password, setPassword, handleLogin, handleResetPassword,hasPassword,setHasPassword,emailError, passwordError }) => {

    return(
        <section className="login">
          <div className="loginContainer">
            <label>E-mail</label>
            <Input
             placeholder="e-mail" 
             className="input"
             type="text"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <p className="errorMsg">{emailError}</p>
           
            
             {
               hasPassword? <>
                <label >Password</label>
                <Input.Password 
               placeholder="input password" 
               maxLength="15"
               className="input"
               type="password"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
               /></>: null
             }
   
            <p className="errorMsg">{passwordError}</p>
            <div className="btnContainer">
            {hasPassword ? (
             <>
             <Button type="primary" onClick={handleLogin}>Sign In</Button>
             <p>
               Forgot the password ?
               <Button type="link" onClick={() => setHasPassword(!hasPassword)}> Reset Password</Button>
             </p>
           </>
           
          ) : ( 
            <>
              <Button type="primary" onClick={ handleResetPassword}>Reset</Button>
              {isEmailSend? <p>An Email has been sent!</p> : null}
              <p>
                Log in with Tina Zita's password and e-mail
                <Button type="link" onClick={() => setHasPassword(!hasPassword)}> Sign In</Button >
              </p>
            </>
          )} 
            </div>
          </div>
        </section>
      );
}

export default Login;