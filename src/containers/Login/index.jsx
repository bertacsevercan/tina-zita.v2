import React, { useEffect, useState } from "react";
import {Auth} from "../../firebaseConfig";


const Login = () => {
   
    
const [user, setUser] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");
const [hasAccount, setHasAccount] = useState(false);

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
    .then(console.log("Signed in successfully"))
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

function handleLogout (){
  Auth().signOut().then(function() {
    console.log("Sign-out successful.")
  }).catch(function(error) {
    // An error happened.
  });
}
 
    return(
        <section className="login">
          <div className="loginContainer">
            <label>Username</label>
            <input
              type="text"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="errorMsg">{emailError}</p>
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="errorMsg">{passwordError}</p>
            <div className="btnContainer">
          
                  <button 
                  onClick={handleLogin} 
                  disabled={user}
                  >Sign In</button>

                  <button 
                  onClick={handleLogout} 
                  >Sign Out</button>

                  
                  <button 
                  onClick={handleResetPassword} 
                  >Reset Password</button>
    
            </div>
          </div>
        </section>
      );
}

export default Login;