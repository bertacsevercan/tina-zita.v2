import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import SideBar from "./components/SideBar/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";
import Admin from "./containers/Admin";
import Order from "./containers/Order";
import Inventory from "./containers/Inventory";
import Recipe from "./containers/Recipe";
import Home from "./containers/Home";
import { Auth } from "./firebaseConfig";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

const { Footer, Content } = Layout;

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasPassword, setHasPassword] = useState(true);
  const [isEmailSend, setIsEmailSend] = useState(false);

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
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
   authListener();
  });

  function handleResetPassword() {
    Auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        clearErrors("");
        setIsEmailSend(true);
      })
      .catch(function (error) {
        console.log("An error happened", error);
        setPasswordError(error.message);
      });
  }

  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <Router>
          {user ? (
            <Layout>
              <SideBar />
              <Layout>
                <Content style={{ margin: "24px 16px 0" }}>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: "88vh" }}
                  >
                    <Route exact path="/" component={Admin} />
                    <Route exact path="/inventory" component={Inventory} />
                    <Route exact path="/order" component={Order} />
                    <Route exact path="/recipe" component={Recipe} />
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  M.Y-Inventory ©2020 Created by KardeşlerCoding
                </Footer>
              </Layout>
            </Layout>
          ) : (
            <Layout>
              <Route path="/">
                <Home
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
                  clearInputs={clearInputs}
                />
              </Route>
            </Layout>
          )}
        </Router>
      </div>
    </I18nextProvider>
  );
}

export default App;
