import React from "react";
import "./index.css";
import Login from "../Login";
import { Image } from "antd";
import { useTranslation } from 'react-i18next';

import { Typography } from "antd";

const { Text, Title } = Typography;

const Home = ({
  email,
  setEmail,
  password,
  isEmailSend,
  setIsEmailSend,
  setPassword,
  handleLogin,
  handleResetPassword,
  hasPassword,
  setHasPassword,
  emailError,
  passwordError,
}) => {
  const {t} = useTranslation();

  return (
    <div className="home">
      <div className="hero-text">
        <Title>{t("home.title0")}</Title>
        <Title level={4} type="secondary">
          {t("home.title1")}
        </Title>
          <Text> {t("home.text0")}</Text>
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
        <Text type="secondary">
         {t("home.text1")}
        </Text>
      </div>

      <Image
        width={600}
        src={require("./image/inventory.png")}
        alt="Packaging vector created by stories - www.freepik.com"
      />
    </div>
  );
};
export default Home;
