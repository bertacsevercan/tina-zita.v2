import React, { useEffect, useState } from "react";
import {Auth} from "../../firebaseConfig";
import { Button, Space, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import "./index.css";

const Login = () => {
   
//we need the user state in other components too   
const [user, setUser] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");
const [hasAccount, setHasAccount] = useState(false);
//to change log status and routing, we need this state in many component
const [isLogged, setLog] = useState(false)
const clearInputs = () => {
  setEmail("");
  setPassword("");
};

const clearErrors = () => {
  setEmailError("");
  setPasswordError("");
};

const handleLogin = () => {
  clearErrors();
  Auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      // console.log("Signed in successfully")
      setLog(true)
      )
    .catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
        default:
      }
    });
    
};


const authListener = () => {
  Auth().onAuthStateChanged((user) => {
    clearInputs();
    if (user) {
      setUser(user);
    } else {
      setUser("");
    }
  });
};

useEffect(() => {
  authListener();
}, []);

const emailAddress = "fadime.ozdemir11@gmail.com";
function handleResetPassword() {
  Auth().sendPasswordResetEmail(emailAddress).then(function() {
    console.log("Email sent")
  }).catch(function(error) {
    console.log("An error happened",error);
  });
  }


  console.log("user", user)


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
            <label>Password</label>
            
             
    <Input.Password 
              placeholder="input password" 
              maxlength="15"
              className="input" 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
    
            <p className="errorMsg">{passwordError}</p>
            <div className="btnContainer">
            <Space size={"middle"}>
            <Button 
                  onClick={handleResetPassword}
                  >Reset Password</Button>

                <Button type="primary"
                  onClick={handleLogin} 
                  disabled={user}
                  >Sign In</Button>
            </Space>      
    
            </div>
          </div>
        </section>
      );
}

export default Login;