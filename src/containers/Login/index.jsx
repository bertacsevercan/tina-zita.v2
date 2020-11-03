import React from "react";
import { Button, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./index.css";

const { Text } = Typography;

const Login = ({
  email,
  setEmail,
  isEmailSend,
  password,
  setPassword,
  handleLogin,
  handleResetPassword,
  hasPassword,
  setHasPassword,
  emailError,
  passwordError,
  clearInputs,
}) => {
  const { t } = useTranslation();
  const handleClick = () => {
    if (hasPassword || !hasPassword) {
      clearInputs();
    }
    return setHasPassword(!hasPassword);
  };

  const handleKeyDownEnterLogin = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleKeyDownEnterReset = (e) => {
    if (e.key === "Enter") {
      handleResetPassword();
    }
  };

  return (
    <section className="login">
      <div className="loginContainer">
        {hasPassword ? (
          <>
            <label>{t("login.label0")}</label>
            <Input
              placeholder="e-mail"
              className="input"
              type="text"
              required
              autoFocus
              value={email}
              onKeyPress={(e) => handleKeyDownEnterLogin(e)}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="errorMsg">{emailError}</p>
            <label>{t("login.label1")}</label>
            <Input.Password
              placeholder={t("login.tex7")}
              maxLength="15"
              className="input"
              type="password"
              required
              value={password}
              onKeyPress={(e) => handleKeyDownEnterLogin(e)}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </>
        ) : (
          <>
            <label>{t("login.label0")}</label>
            <Input
              placeholder="e-mail"
              className="input"
              type="text"
              required
              autoFocus
              value={email}
              onKeyPress={(e) => handleKeyDownEnterReset(e)}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="errorMsg">{emailError}</p>
          </>
        )}

        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasPassword ? (
            <>
              <Button type="primary" onClick={handleLogin}>
                {t("login.text0")}
              </Button>
              <p>
                {t("login.text1")}
                <Button type="link" onClick={handleClick}>
                  {t("login.text2")}
                </Button>
              </p>
            </>
          ) : (
            <>
              <Button type="primary" onClick={handleResetPassword}>
                {t("login.text3")}
              </Button>
              <div>
                {isEmailSend ? <Text>{t("login.text4")}</Text> : null}
                <Text>
                  {t("login.text5")}
                  <Button type="link" onClick={handleClick}>
                    {t("login.text0")}
                  </Button>
                </Text>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
